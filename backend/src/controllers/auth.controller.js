import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { models, sequelize } from '../models/index.js';
import { slugify } from '../utils/helpers.js';
import emailService from '../services/email.service.js';
import logger from '../utils/logger.js';
import cloudinary from '../services/cloudinary.js';


// Helper function to generate unique slug
async function generateUniqueSlug(name) {
  let slug = slugify(name);
  let counter = 1;
  let uniqueSlug = slug;

  while (true) {
    const existing = await models.Organization.findOne({ where: { slug: uniqueSlug } });
    if (!existing) break;
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

export const register = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      // Personal Info
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      address,

      // Organization Info
      companyName,
      industry,
      size,
      website,
      gstNumber,
      panNumber,

      // Address Info
      street,
      city,
      state,
      postalCode,
      country,

      // Verification
      terms,
      updates
    } = req.body;

    if (!email || !password || !companyName || !terms) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Checking for existing organization...');
    const existingOrg = await models.Organization.findOne({ where: { name: companyName } });
    if (existingOrg) {
      return res.status(409).json({ message: 'Organization already registered' });
    }

    const plan = await models.SubscriptionPlan.findOne({ 
      where: { code: 'free' }
    });


    let logoUrl = null;
    if (req.files && req.files.logo) {
      const uploadedLogo = await cloudinary.uploader.upload(req.files.logo.tempFilePath, {
        folder: 'organization_logos'
      });
      logoUrl = uploadedLogo.secure_url;
    }

    console.log('Creating organization...');
    let slug = await generateUniqueSlug(companyName);
    slug = slug.replace(/-/g, '_');
    let organization; // Declare variable here
    const subdomain = `${slug}.${process.env.FRONTEND_URL}`;

    try {
      organization = await models.Organization.create(
        {
          name: companyName,
          slug,
          subdomain: subdomain,
          logoUrl,
          settings: {
            industry,
            size,
            website,
            gstNumber,
            panNumber,
            address: {
              street,
              city,
              state,
              postalCode,
              country
            }
          }
        },
        { transaction: t }
      );

      console.log('Organization created:', organization.dataValues);
    } catch (error) {
      console.error('Error creating organization:', error);
      throw new Error('Failed to create organization.');
    }

    // Create tenant-specific schema
    const schemaName = `${slug}`;
    await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`, { transaction: t });

    console.log('Schema created. Syncing tenant-specific tables...');
    const tenantModels = ['Role', 'User',  'Access', 'Position',  'Department', 'Employee' ];
    for (const modelName of tenantModels) {
      const model = sequelize.models[modelName].schema(schemaName);
      console.log(`Syncing table for model: ${modelName}`);
      console.log(`Table name:`, model.getTableName());
      await model.sync({ alter: true, transaction: t });
    }

    // console.log('Creating admin user...');
    const hashedPassword = await bcrypt.hash(password, 10);
    const UserModel = sequelize.models.User.schema(schemaName);
    console.log('User Model =======> ', UserModel);
    const user = await UserModel.create(
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'tenant_admin',
        organizationId: organization.dataValues.id,
        personalDetails: {
          dateOfBirth,
          address
        }
      },
      { transaction: t }
    );

    // console.log('User created:', user.dataValues);

    console.log('Creating subscription...');
    await models.OrganizationSubscription.create(
      {
        organizationId: organization.dataValues.id,
        planId: plan.id,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        billingEmail: email,
      },
      { transaction: t }
    );

    await t.commit();

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

     // Send welcome email
    try {
      await emailService.sendWelcome(email, `${firstName} ${lastName}`, password, `${subdomain}/login`);
    } catch (error) {
      logger.error('Failed to send welcome email:', error);
      // Don't fail registration if email fails
    }

    console.log('Registration successful!');
    res.status(201).json({
      message: 'api success',
      url: `${subdomain}/login`,
    });
  } catch (error) {
    await t.rollback();
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const orgToken = req.headers['x-org-token']; // Read orgToken from headers

    if (!email || !password || !orgToken) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Verify and extract organization ID from orgToken
    let decoded;
    try {
      decoded = jwt.verify(orgToken, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired organization token' });
    }

    const { organizationId } = decoded;

    // Fetch the organization
    const organization = await models.Organization.findByPk(organizationId);
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    // Set organization schema
    const schemaName = `org_${organization.slug}`;

    // Access the User model within the organization schema
    const UserModel = sequelize.models.User.schema(schemaName);

    // Find the user in the organization's schema
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate user token for authentication
    const userToken = jwt.sign(
      { userId: user.id, role: user.role, organizationId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Login successful',
      token: userToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        organizationId
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};


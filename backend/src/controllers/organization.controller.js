import { models, sequelize } from '../models/index.js';
import { slugify } from '../utils/helpers.js';
import logger from '../utils/logger.js';

export const createOrganization = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { name, industry, size, website, gstNumber, panNumber, street, city, state, postalCode, country } = req.body;

    if (!name || !industry || !size || !street || !city || !state || !postalCode || !country) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingOrg = await models.Organization.findOne({ where: { name } });
    if (existingOrg) {
      return res.status(409).json({ message: 'Organization already exists' });
    }

    const slug = slugify(name).replace(/-/g, '_');
    const subdomain = `${slug}.${req.get('host')}`;
    const schemaName = `org_${slug}`;

    const organization = await models.Organization.create(
      {
        name,
        slug,
        subdomain,
        settings: {
          industry,
          size,
          website,
          gstNumber,
          panNumber,
          address: { street, city, state, postalCode, country },
        },
      },
      { transaction: t }
    );

    await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`, { transaction: t });

    const tenantModels = ['Role', 'User',  'Access', 'Position',  'Department', 'Employee' ];
    for (const modelName of tenantModels) {
      const model = sequelize.models[modelName].schema(schemaName);
      console.log(`Syncing table for model: ${modelName}`);
      console.log(`Table name:`, model.getTableName());
      await model.sync({ alter: true, transaction: t });
    }

    await t.commit();

    res.status(201).json({ message: 'Organization created successfully', organization });
  } catch (error) {
    if (!t.finished) await t.rollback();
    logger.error('Error creating organization:', error);
    res.status(500).json({ message: 'Failed to create organization' });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await models.Organization.findAll();
    res.status(200).json(organizations);
  } catch (error) {
    logger.error('Error fetching organizations:', error);
    res.status(500).json({ message: 'Failed to fetch organizations' });
  }
};

export const getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await models.Organization.findByPk(id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json(organization);
  } catch (error) {
    logger.error('Error fetching organization:', error);
    res.status(500).json({ message: 'Failed to fetch organization' });
  }
};

export const getOrganizationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const organization = await models.Organization.findOne({ where: { slug } });

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json(organization);
  } catch (error) {
    logger.error('Error fetching organization by slug:', error);
    res.status(500).json({ message: 'Failed to fetch organization' });
  }
};

export const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const organization = await models.Organization.findByPk(id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    await organization.update(updates);

    res.status(200).json({ message: 'Organization updated successfully', organization });
  } catch (error) {
    logger.error('Error updating organization:', error);
    res.status(500).json({ message: 'Failed to update organization' });
  }
};

export const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const organization = await models.Organization.findByPk(id);

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    await organization.destroy();

    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    logger.error('Error deleting organization:', error);
    res.status(500).json({ message: 'Failed to delete organization' });
  }
};

export const getOrganizationBySubdomain = async (req, res) => {
  try {
    // const subdomain = req.hostname.split('.')[0]; // Extract subdomain from the hostname

    const { subdomain } = req.params;

    if (!subdomain) {
      return res.status(400).json({ message: 'Subdomain is required' });
    }

    const organization = await models.Organization.findOne({ where: { subdomain } });

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json(organization);
  } catch (error) {
    logger.error('Error fetching organization by subdomain:', error);
    res.status(500).json({ message: 'Failed to fetch organization' });
  }
};

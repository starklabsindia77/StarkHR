import { Sequelize } from 'sequelize';
import config from '../config/database.js';
import logger from '../utils/logger.js';

// Import models
// Public schema models
import { Organization } from './organization.js';
import { SubscriptionPlan } from './subscription-plan.js';
import { SubscriptionFeature } from './subscription-feature.js';
import { OrganizationSubscription } from './organization-subscription.js';
import { BillingHistory } from './billing-history.js';
import { SubscriptionUsage } from './subscription-usage.js';
// Organization schema models
import { User } from './user.js';
import { Employee } from './employee.js';
import { Department } from './department.js';
import { Position } from './position.js';
import { Role } from './role.js';
import { Access } from './access.js';

class Database {
  constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.config = config[this.env];
    this.models = {};
    this.publicModels = {};
    this.orgModels = {};
    this.sequelize = null;
    this.Sequelize = Sequelize;

    this.initialize();
  }

  initialize() {
    try {
      this.sequelize = new Sequelize({
        database: this.config.database,
        username: this.config.username,
        password: this.config.password,
        ...this.config, // Spread the remaining config options (e.g., host, dialect)
        // logging: this.config.logging
        //   ? (msg) => {
        //       console.log(`[Sequelize Log] ${msg}`); // Log queries
        //       logger.debug(msg);
        //     }
        //   : false,
      });

      // Initialize public schema models
      this.publicModels = {
        Organization: Organization.init(this.sequelize),
        SubscriptionPlan: SubscriptionPlan.init(this.sequelize),
        SubscriptionFeature: SubscriptionFeature.init(this.sequelize),
        OrganizationSubscription: OrganizationSubscription.init(this.sequelize),
        BillingHistory: BillingHistory.init(this.sequelize),
        SubscriptionUsage: SubscriptionUsage.init(this.sequelize)
      };

      // Initialize organization schema models
      this.orgModels = {
        User: User.init(this.sequelize),
        Employee: Employee.init(this.sequelize),
        Department: Department.init(this.sequelize),
        Position: Position.init(this.sequelize),
        Role: Role.init(this.sequelize),
        Access: Access.init(this.sequelize)
      };

      // Merge all models
      this.models = { ...this.publicModels, ...this.orgModels };

      // Run model associations
      this.initializeAssociations();

    } catch (error) {
      logger.error('Database initialization error:', error);
      throw error;
    }
  }

  initializeAssociations() {
    Object.values(this.models)
      .filter(model => typeof model.associate === 'function')
      .forEach(model => model.associate(this.models));
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      logger.info('Database connection established successfully.');
    } catch (error) {
      logger.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  async setOrganizationSchema(orgSlug) {
    if (!orgSlug) {
      return 'public';
    }

    const schema = `org_${orgSlug}`;
    await this.sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
    return schema;
  }

  getModels() {
    return this.models;
  }

  getSequelize() {
    return this.sequelize;
  }

  getPublicModels() {
    return this.publicModels;
  }

  getOrgModels() {
    return this.orgModels;
  }
}

// Create and export database instance
const db = new Database();

export const models = db.getModels();
export const publicModels = db.getPublicModels();
export const orgModels = db.getOrgModels();
export const sequelize = db.getSequelize();
export default db;

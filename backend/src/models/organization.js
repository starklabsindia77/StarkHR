import { Model, DataTypes } from 'sequelize';

export class Organization extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true
      },
      subdomain: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
      },
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: true, // New field for storing the logo URL
      },
      settings: {
        type: DataTypes.JSONB,
        defaultValue: {}
      }
    }, {
      sequelize,
      modelName: 'Organization',
      tableName: 'organizations',
      schema: 'public',
      timestamps: true,
      underscored: true,
      hooks: {
        afterCreate: async (organization) => {
          const sanitizedSlug = organization.slug.replace(/-/g, '_'); // Replace hyphens with underscores
          const schemaName = `${sanitizedSlug}`;
          await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
        },
      },
    });
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'organization_id' });
    this.hasOne(models.OrganizationSubscription, { foreignKey: 'organization_id' });
    this.hasMany(models.BillingHistory, { foreignKey: 'organization_id' });
    this.hasMany(models.SubscriptionUsage, { foreignKey: 'organization_id' });
  }

  getSchema() {
    return `org_${this.slug}`;
  }
}
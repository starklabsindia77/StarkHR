import { Model, DataTypes } from 'sequelize';

export class SubscriptionUsage extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      organizationId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'organization_id'
      },
      featureCode: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'feature_code'
      },
      usageValue: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: 'usage_value'
      },
      periodStart: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'period_start'
      },
      periodEnd: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'period_end'
      }
    }, {
      sequelize,
      modelName: 'SubscriptionUsage',
      tableName: 'subscription_usage',
      schema: 'public',
      timestamps: true,
      underscored: true
    });
  }

  static associate(models) {
    this.belongsTo(models.Organization, { foreignKey: 'organization_id' });
  }
}
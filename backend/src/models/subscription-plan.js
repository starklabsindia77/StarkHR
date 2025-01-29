import { Model, DataTypes } from 'sequelize';

export class SubscriptionPlan extends Model {
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
      code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      perEmployeePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'per_employee_price'
      },
      minimumEmployees: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'minimum_employees'
      },
      maxEmployees: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'max_employees'
      },
      maxStorageGb: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'max_storage_gb'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
      }
    }, {
      sequelize,
      modelName: 'SubscriptionPlan',
      tableName: 'subscription_plans',
      schema: 'public',
      timestamps: true,
      underscored: true
    });
  }

  static associate(models) {
    this.hasMany(models.OrganizationSubscription, { foreignKey: 'plan_id' });
    this.belongsToMany(models.SubscriptionFeature, {
      through: 'plan_features',
      foreignKey: 'plan_id',
      schema: 'public'
    });
  }
}
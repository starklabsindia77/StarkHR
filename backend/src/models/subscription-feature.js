import { Model, DataTypes } from 'sequelize';

export class SubscriptionFeature extends Model {
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
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
      }
    }, {
      sequelize,
      modelName: 'SubscriptionFeature',
      tableName: 'subscription_features',
      schema: 'public',
      timestamps: true,
      underscored: true
    });
  }

  static associate(models) {
    this.belongsToMany(models.SubscriptionPlan, {
      through: 'plan_features',
      foreignKey: 'feature_id',
      schema: 'public'
    });
  }
}
import { Model, DataTypes } from 'sequelize';

export class OrganizationSubscription extends Model {
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
      planId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'plan_id'
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'active'
      },
      currentPeriodStart: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'current_period_start'
      },
      currentPeriodEnd: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'current_period_end'
      },
      cancelAtPeriodEnd: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'cancel_at_period_end'
      },
      paymentMethod: {
        type: DataTypes.JSONB,
        field: 'payment_method'
      },
      billingEmail: {
        type: DataTypes.STRING,
        field: 'billing_email'
      },
      billingAddress: {
        type: DataTypes.JSONB,
        field: 'billing_address'
      },
      taxId: {
        type: DataTypes.STRING,
        field: 'tax_id'
      }
    }, {
      sequelize,
      modelName: 'OrganizationSubscription',
      tableName: 'organization_subscriptions',
      schema: 'public',
      timestamps: true,
      underscored: true
    });
  }

  static associate(models) {
    this.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    this.belongsTo(models.SubscriptionPlan, { foreignKey: 'plan_id' });
    this.hasMany(models.BillingHistory, { foreignKey: 'subscription_id' });
  }
}
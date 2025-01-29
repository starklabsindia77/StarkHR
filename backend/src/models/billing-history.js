import { Model, DataTypes } from 'sequelize';

export class BillingHistory extends Model {
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
      subscriptionId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'subscription_id'
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      billingDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'billing_date'
      },
      paymentMethod: {
        type: DataTypes.JSONB,
        field: 'payment_method'
      },
      invoiceUrl: {
        type: DataTypes.STRING,
        field: 'invoice_url'
      }
    }, {
      sequelize,
      modelName: 'BillingHistory',
      tableName: 'billing_history',
      schema: 'public',
      timestamps: true,
      underscored: true
    });
  }

  static associate(models) {
    this.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    this.belongsTo(models.OrganizationSubscription, { foreignKey: 'subscription_id' });
  }
}
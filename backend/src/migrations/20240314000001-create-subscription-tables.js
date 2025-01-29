'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Subscription Plans
    await queryInterface.createTable('subscription_plans', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      per_employee_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      minimum_employees: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      max_employees: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      max_storage_gb: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Features
    await queryInterface.createTable('subscription_features', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Plan Features Junction
    await queryInterface.createTable('plan_features', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      plan_id: {
        type: Sequelize.UUID,
        references: {
          model: 'subscription_plans',
          key: 'id'
        },
        allowNull: false
      },
      feature_id: {
        type: Sequelize.UUID,
        references: {
          model: 'subscription_features',
          key: 'id'
        },
        allowNull: false
      },
      limit_value: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Organization Subscriptions
    await queryInterface.createTable('organization_subscriptions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      organization_id: {
        type: Sequelize.UUID,
        references: {
          model: 'organizations',
          key: 'id'
        },
        allowNull: false
      },
      plan_id: {
        type: Sequelize.UUID,
        references: {
          model: 'subscription_plans',
          key: 'id'
        },
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'active'
      },
      current_period_start: {
        type: Sequelize.DATE,
        allowNull: false
      },
      current_period_end: {
        type: Sequelize.DATE,
        allowNull: false
      },
      cancel_at_period_end: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      payment_method: {
        type: Sequelize.JSONB
      },
      billing_email: {
        type: Sequelize.STRING
      },
      billing_address: {
        type: Sequelize.JSONB
      },
      tax_id: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Billing History
    await queryInterface.createTable('billing_history', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      organization_id: {
        type: Sequelize.UUID,
        references: {
          model: 'organizations',
          key: 'id'
        },
        allowNull: false
      },
      subscription_id: {
        type: Sequelize.UUID,
        references: {
          model: 'organization_subscriptions',
          key: 'id'
        },
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      billing_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      payment_method: {
        type: Sequelize.JSONB
      },
      invoice_url: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('billing_history');
    await queryInterface.dropTable('organization_subscriptions');
    await queryInterface.dropTable('plan_features');
    await queryInterface.dropTable('subscription_features');
    await queryInterface.dropTable('subscription_plans');
  }
};
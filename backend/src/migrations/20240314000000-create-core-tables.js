'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Organizations table
    await queryInterface.createTable('organizations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      settings: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      subscription_tier: {
        type: Sequelize.STRING,
        defaultValue: 'free'
      },
      subscription_status: {
        type: Sequelize.STRING,
        defaultValue: 'active'
      },
      subscription_ends_at: {
        type: Sequelize.DATE,
        allowNull: true
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

    // Users table
    await queryInterface.createTable('users', {
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
        allowNull: true
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('super_admin', 'tenant_admin', 'tenant_user', 'tenant_employee'),
        defaultValue: 'tenant_employee'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      last_sign_in_at: {
        type: Sequelize.DATE,
        allowNull: true
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

    // Create schema creation function
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION create_organization_schema(org_slug TEXT)
      RETURNS void AS $$
      BEGIN
        -- Create new schema
        EXECUTE format('CREATE SCHEMA IF NOT EXISTS org_%I', org_slug);
        
        -- Grant usage to database user
        EXECUTE format('GRANT USAGE ON SCHEMA org_%I TO %I', org_slug, current_user);
        EXECUTE format('GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA org_%I TO %I', org_slug, current_user);
        EXECUTE format('GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA org_%I TO %I', org_slug, current_user);
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Create trigger function for auto-creating schemas
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION create_org_schema_trigger()
      RETURNS trigger AS $$
      BEGIN
        -- Create schema for new organization
        PERFORM create_organization_schema(NEW.slug);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Create trigger on organizations table
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS create_org_schema_on_insert ON organizations;
      CREATE TRIGGER create_org_schema_on_insert
        AFTER INSERT ON organizations
        FOR EACH ROW
        EXECUTE FUNCTION create_org_schema_trigger();
    `);
  },

  async down(queryInterface, Sequelize) {
    // Drop trigger
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS create_org_schema_on_insert ON organizations;
    `);

    // Drop functions
    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS create_org_schema_trigger();
      DROP FUNCTION IF EXISTS create_organization_schema(TEXT);
    `);

    // Drop tables
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('organizations');
  }
};
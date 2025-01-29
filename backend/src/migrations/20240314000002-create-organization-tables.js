'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Function to create tables in organization schema
    const createOrgTables = async (schema) => {
      // Departments
      await queryInterface.createTable('departments', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        organization_id: {
          type: Sequelize.UUID,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        code: {
          type: Sequelize.STRING,
          allowNull: true
        },
        parent_department_id: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: {
              tableName: 'departments',
              schema: schema
            },
            key: 'id'
          }
        },
        manager_id: {
          type: Sequelize.UUID,
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
      }, {
        schema
      });

      // Positions
      await queryInterface.createTable('positions', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        organization_id: {
          type: Sequelize.UUID,
          allowNull: false
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        department_id: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: {
              tableName: 'departments',
              schema: schema
            },
            key: 'id'
          }
        },
        grade_level: {
          type: Sequelize.INTEGER,
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
      }, {
        schema
      });

      // Employees
      await queryInterface.createTable('employees', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: true,
          unique: true
        },
        organization_id: {
          type: Sequelize.UUID,
          allowNull: false
        },
        employee_id: {
          type: Sequelize.STRING,
          allowNull: false
        },
        position_id: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: {
              tableName: 'positions',
              schema: schema
            },
            key: 'id'
          }
        },
        department_id: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: {
              tableName: 'departments',
              schema: schema
            },
            key: 'id'
          }
        },
        manager_id: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: {
              tableName: 'employees',
              schema: schema
            },
            key: 'id'
          }
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: true
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: true
        },
        employment_status: {
          type: Sequelize.STRING,
          defaultValue: 'active'
        },
        employment_type: {
          type: Sequelize.STRING,
          defaultValue: 'full-time'
        },
        personal_details: {
          type: Sequelize.JSONB,
          defaultValue: {}
        },
        contact_details: {
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
      }, {
        schema
      });

      // Add unique constraint for employee_id within organization
      await queryInterface.addConstraint(`${schema}.employees`, {
        fields: ['organization_id', 'employee_id'],
        type: 'unique',
        name: `${schema}_employees_org_emp_id_unique`
      });
    };

    // Create function to automatically create tables in new org schemas
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION create_org_tables_trigger()
      RETURNS event_trigger AS $$
      BEGIN
        -- Create tables in the new schema
        IF TG_EVENT = 'ddl_command_end' THEN
          IF LEFT(TG_TAG, 13) = 'CREATE SCHEMA' THEN
            -- Extract schema name from command tag
            DECLARE
              schema_name text := substring(TG_TAG from 14);
            BEGIN
              -- Create tables in new schema
              PERFORM create_org_tables(schema_name);
            END;
          END IF;
        END IF;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // Create event trigger
    await queryInterface.sequelize.query(`
      CREATE EVENT TRIGGER create_org_tables_on_schema_create
      ON ddl_command_end
      WHEN TAG IN ('CREATE SCHEMA')
      EXECUTE FUNCTION create_org_tables_trigger();
    `);

    // Create tables in existing organization schemas
    const [results] = await queryInterface.sequelize.query(
      "SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'org_%'"
    );
    
    for (const { schema_name } of results) {
      await createOrgTables(schema_name);
    }
  },

  async down(queryInterface, Sequelize) {
    // Drop event trigger
    await queryInterface.sequelize.query(`
      DROP EVENT TRIGGER IF EXISTS create_org_tables_on_schema_create;
    `);

    // Drop function
    await queryInterface.sequelize.query(`
      DROP FUNCTION IF EXISTS create_org_tables_trigger();
    `);

    // Drop tables in all org schemas
    const [results] = await queryInterface.sequelize.query(
      "SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'org_%'"
    );
    
    for (const { schema_name } of results) {
      await queryInterface.dropTable('employees', {
        schema: schema_name
      });
      await queryInterface.dropTable('positions', {
        schema: schema_name
      });
      await queryInterface.dropTable('departments', {
        schema: schema_name
      });
    }
  }
};
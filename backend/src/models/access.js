import { Model, DataTypes } from 'sequelize';

export class Access extends Model {
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
      roleId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'role_id',
        references: {
          model: 'roles',
          key: 'id'
        }
      },
      resourceType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'resource_type'
      },
      resourceId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'resource_id'
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false
      },
      conditions: {
        type: DataTypes.JSONB,
        defaultValue: {},
        field: 'conditions'
      }
    }, {
      sequelize,
      modelName: 'Access',
      tableName: 'access',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['role_id', 'resource_type', 'resource_id', 'action']
        }
      ]
    });
  }

  static associate(models) {
    this.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    this.belongsTo(models.Role, { foreignKey: 'role_id' });
  }

  // Helper method to check if access is granted based on conditions
  async checkConditions(context = {}) {
    if (!this.conditions || Object.keys(this.conditions).length === 0) {
      return true;
    }

    try {
      // Evaluate each condition
      for (const [key, value] of Object.entries(this.conditions)) {
        if (context[key] !== value) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.error('Error evaluating access conditions:', error);
      return false;
    }
  }
}
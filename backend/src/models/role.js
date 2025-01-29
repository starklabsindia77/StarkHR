import { Model, DataTypes } from 'sequelize';

export class Role extends Model {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      isSystem: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_system'
      }
    }, {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['organization_id', 'name']
        }
      ]
    });
  }

  static associate(models) {
    this.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    this.hasMany(models.Access, { foreignKey: 'role_id' });
  }
}
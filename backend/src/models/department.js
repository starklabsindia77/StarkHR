import { Model, DataTypes } from 'sequelize';

export class Department extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        organizationId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'organization_id',
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        parentDepartmentId: {
          type: DataTypes.UUID,
          allowNull: true,
          field: 'parent_department_id',
        },
      },
      {
        sequelize,
        modelName: 'Department',
        tableName: 'departments',
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Organization, { foreignKey: 'organization_id', onDelete: 'CASCADE' });
    this.belongsTo(models.Department, { as: 'parentDepartment', foreignKey: 'parent_department_id' });
    this.hasMany(models.Department, { as: 'childDepartments', foreignKey: 'parent_department_id' });
    this.hasMany(models.Employee, { foreignKey: 'department_id' });
  }
}

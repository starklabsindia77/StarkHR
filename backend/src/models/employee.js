import { Model, DataTypes } from 'sequelize';

export class Employee extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          unique: true,
          field: 'user_id',
        },
        organizationId: {
          type: DataTypes.UUID,
          allowNull: false,
          field: 'organization_id',
        },
        employeeId: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'employee_id',
        },
        positionId: {
          type: DataTypes.UUID,
          allowNull: true,
          field: 'position_id',
        },
        departmentId: {
          type: DataTypes.UUID,
          allowNull: true,
          field: 'department_id',
        },
        managerId: {
          type: DataTypes.UUID,
          allowNull: true,
          field: 'manager_id',
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'start_date',
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'end_date',
        },
        employmentStatus: {
          type: DataTypes.STRING,
          defaultValue: 'active',
          field: 'employment_status',
        },
        employmentType: {
          type: DataTypes.STRING,
          defaultValue: 'full-time',
          field: 'employment_type',
        },
        personalDetails: {
          type: DataTypes.JSONB,
          defaultValue: {},
          field: 'personal_details',
        },
        contactDetails: {
          type: DataTypes.JSONB,
          defaultValue: {},
          field: 'contact_details',
        },
        jobDetails: {
          type: DataTypes.JSONB,
          defaultValue: {},
          field: 'job_details',
        },
        bankDetails: {
          type: DataTypes.JSONB,
          defaultValue: {},
          field: 'bank_details',
        },
      },
      {
        sequelize,
        modelName: 'Employee',
        tableName: 'employees',
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    this.belongsTo(models.Organization, { foreignKey: 'organization_id', onDelete: 'CASCADE' });
    this.belongsTo(models.Department, { foreignKey: 'department_id', onDelete: 'SET NULL' });
    this.belongsTo(models.Position, { foreignKey: 'position_id', onDelete: 'SET NULL' });
    this.belongsTo(models.Employee, { as: 'manager', foreignKey: 'manager_id', onDelete: 'SET NULL' });
    this.hasMany(models.Employee, { as: 'subordinates', foreignKey: 'manager_id' });
  }
}

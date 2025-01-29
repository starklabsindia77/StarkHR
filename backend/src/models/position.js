import { Model, DataTypes } from 'sequelize';

export class Position extends Model {
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
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gradeLevel: {
          type: DataTypes.INTEGER,
          allowNull: true,
          field: 'grade_level',
        },
      },
      {
        sequelize,
        modelName: 'Position',
        tableName: 'positions',
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Organization, { foreignKey: 'organization_id', onDelete: 'CASCADE' });
    this.hasMany(models.Employee, { foreignKey: 'position_id' });
  }
}

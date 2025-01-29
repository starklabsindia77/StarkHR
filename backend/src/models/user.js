import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export class User extends Model {
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
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('tenant_admin', 'tenant_user', 'tenant_employee'),
        defaultValue: 'tenant_employee'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
      },
      lastSignInAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_sign_in_at'
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      underscored: true,
    });
  }

  static associate(models) {
    this.belongsTo(models.Organization, { foreignKey: 'organization_id' });
    this.hasOne(models.Employee, { foreignKey: 'user_id' });
  }

  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }

  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}
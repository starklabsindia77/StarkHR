'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create demo organization
    const orgId = uuidv4();
    await queryInterface.bulkInsert('organizations', [{
      id: orgId,
      name: 'Demo Company',
      slug: 'demo-company',
      subscription_tier: 'professional',
      subscription_status: 'active',
      created_at: new Date(),
      updated_at: new Date()
    }]);

    // Create demo users
    const users = [
      {
        id: uuidv4(),
        email: 'super.admin@system.com',
        password: await bcrypt.hash('superadmin123', 10),
        role: 'super_admin',
        organization_id: null,
        first_name: 'Super',
        last_name: 'Admin'
      },
      {
        id: uuidv4(),
        email: 'tenant.admin@company.com',
        password: await bcrypt.hash('tenantadmin123', 10),
        role: 'tenant_admin',
        organization_id: orgId,
        first_name: 'Tenant',
        last_name: 'Admin'
      },
      {
        id: uuidv4(),
        email: 'user@company.com',
        password: await bcrypt.hash('tenantuser123', 10),
        role: 'tenant_user',
        organization_id: orgId,
        first_name: 'Regular',
        last_name: 'User'
      },
      {
        id: uuidv4(),
        email: 'employee@company.com',
        password: await bcrypt.hash('employee123', 10),
        role: 'tenant_employee',
        organization_id: orgId,
        first_name: 'John',
        last_name: 'Employee'
      }
    ];

    await queryInterface.bulkInsert('users', users.map(user => ({
      ...user,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    })));

    // Create subscription plans
    const plans = [
      {
        id: uuidv4(),
        name: 'Starter',
        code: 'starter',
        description: 'Perfect for small teams getting started',
        per_employee_price: 8,
        minimum_employees: 5,
        max_employees: 25,
        max_storage_gb: 10,
        is_active: true
      },
      {
        id: uuidv4(),
        name: 'Professional',
        code: 'professional',
        description: 'Ideal for growing organizations',
        per_employee_price: 15,
        minimum_employees: 10,
        max_employees: 100,
        max_storage_gb: 50,
        is_active: true
      },
      {
        id: uuidv4(),
        name: 'Enterprise',
        code: 'enterprise',
        description: 'For large enterprises with custom needs',
        per_employee_price: 25,
        minimum_employees: 50,
        max_storage_gb: 500,
        is_active: true
      }
    ];

    await queryInterface.bulkInsert('subscription_plans', plans.map(plan => ({
      ...plan,
      created_at: new Date(),
      updated_at: new Date()
    })));

    // Create subscription features
    const features = [
      {
        id: uuidv4(),
        name: 'Employee Management',
        code: 'employee_management',
        description: 'Basic employee management features',
        is_active: true
      },
      {
        id: uuidv4(),
        name: 'Advanced HR',
        code: 'advanced_hr',
        description: 'Advanced HR features including performance management',
        is_active: true
      },
      {
        id: uuidv4(),
        name: 'Payroll Processing',
        code: 'payroll',
        description: 'Payroll processing and management',
        is_active: true
      }
    ];

    await queryInterface.bulkInsert('subscription_features', features.map(feature => ({
      ...feature,
      created_at: new Date(),
      updated_at: new Date()
    })));
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subscription_features', null, {});
    await queryInterface.bulkDelete('subscription_plans', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('organizations', null, {});
  }
};
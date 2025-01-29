export const UserRole = {
  SUPER_ADMIN: 'super_admin',
  TENANT_ADMIN: 'tenant_admin',
  TENANT_MANAGER: 'tenant_manager',
  TENANT_USER: 'tenant_user',
  TENANT_EMPLOYEE: 'tenant_employee',
} as const

export type UserRoleType = typeof UserRole[keyof typeof UserRole]

export const DEFAULT_USERS = [
  {
    email: 'super.admin@system.com',
    password: 'superadmin123',
    role: UserRole.SUPER_ADMIN,
  },
  {
    email: 'tenant.admin@company.com',
    password: 'tenantadmin123',
    role: UserRole.TENANT_ADMIN,
  },
  {
    email: 'user@company.com',
    password: 'tenantuser123',
    role: UserRole.TENANT_USER,
  },
  {
    email: 'employee@company.com',
    password: 'employee123',
    role: UserRole.TENANT_EMPLOYEE,
  },
] as const

export const ROLE_PERMISSIONS = {
  [UserRole.TENANT_ADMIN]: {
    name: 'Admin',
    description: 'Full access to all features',
    permissions: [
      'manage_employees',
      'manage_departments',
      'manage_roles',
      'manage_benefits',
      'manage_payroll',
      'manage_training',
      'view_analytics',
      'manage_settings'
    ]
  },
  [UserRole.TENANT_MANAGER]: {
    name: 'Manager',
    description: 'Department-level management access',
    permissions: [
      'manage_employees',
      'view_departments',
      'manage_training',
      'view_analytics',
      'view_benefits'
    ]
  },
  [UserRole.TENANT_USER]: {
    name: 'HR User',
    description: 'Standard HR operations access',
    permissions: [
      'view_employees',
      'view_departments',
      'manage_training',
      'view_benefits'
    ]
  },
  [UserRole.TENANT_EMPLOYEE]: {
    name: 'Employee',
    description: 'Basic employee access',
    permissions: [
      'view_profile',
      'view_benefits',
      'view_training'
    ]
  }
} as const

export type Permission = keyof typeof ROLE_PERMISSIONS[UserRole.TENANT_ADMIN]['permissions']
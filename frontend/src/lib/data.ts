export interface User {
  id: string
  email: string
  role: string
  organization_id?: string
  first_name?: string
  last_name?: string
}

export const users: User[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'super.admin@system.com',
    role: 'super_admin',
    first_name: 'Super',
    last_name: 'Admin'
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    email: 'tenant.admin@company.com',
    role: 'tenant_admin',
    organization_id: 'c0d1c0d1-c0d1-c0d1-c0d1-c0d1c0d1c0d1',
    first_name: 'Tenant',
    last_name: 'Admin'
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    email: 'user@company.com',
    role: 'tenant_user',
    organization_id: 'c0d1c0d1-c0d1-c0d1-c0d1-c0d1c0d1c0d1',
    first_name: 'Regular',
    last_name: 'User'
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    email: 'employee@company.com',
    role: 'tenant_employee',
    organization_id: 'c0d1c0d1-c0d1-c0d1-c0d1-c0d1c0d1c0d1',
    first_name: 'John',
    last_name: 'Employee'
  }
]

export interface Organization {
  id: string
  name: string
  slug: string
  subscription_tier?: string
  subscription_status?: string
}

export const organizations: Organization[] = [
  {
    id: 'c0d1c0d1-c0d1-c0d1-c0d1-c0d1c0d1c0d1',
    name: 'Demo Company',
    slug: 'demo-company',
    subscription_tier: 'Professional',
    subscription_status: 'active'
  }
]

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}
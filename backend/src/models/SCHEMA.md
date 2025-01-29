# Database Schema Documentation

## Overview
This document outlines the database schema structure for the HR Platform, including both public and organization-specific schemas.

## Schema Organization
The database uses a multi-tenant architecture with two types of schemas:
1. Public Schema - Contains global tables
2. Organization Schemas - Contains organization-specific tables (org_${slug})

## Public Schema Tables

### organizations
Core organization data
```sql
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  settings jsonb DEFAULT '{}',
  subscription_tier text DEFAULT 'free',
  subscription_status text DEFAULT 'active',
  subscription_ends_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### subscription_plans
Available subscription plans
```sql
CREATE TABLE subscription_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  per_employee_price decimal NOT NULL,
  minimum_employees integer NOT NULL,
  max_employees integer,
  max_storage_gb integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### subscription_features
Features available in subscription plans
```sql
CREATE TABLE subscription_features (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

## Organization Schema Tables (org_${slug})

### users
User accounts linked to auth.users
```sql
CREATE TABLE users (
  id uuid PRIMARY KEY,
  organization_id uuid REFERENCES organizations(id),
  first_name text,
  last_name text,
  role text DEFAULT 'user',
  email text UNIQUE NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_sign_in_at timestamptz,
  is_active boolean DEFAULT true
);
```

### departments
Department structure
```sql
CREATE TABLE departments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL,
  name text NOT NULL,
  code text,
  parent_department_id uuid REFERENCES departments(id),
  manager_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, code)
);
```

### positions
Job positions/titles
```sql
CREATE TABLE positions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL,
  title text NOT NULL,
  department_id uuid REFERENCES departments(id),
  grade_level integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### employees
Employee records
```sql
CREATE TABLE employees (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid UNIQUE REFERENCES users(id),
  organization_id uuid NOT NULL,
  employee_id text NOT NULL,
  position_id uuid REFERENCES positions(id),
  department_id uuid REFERENCES departments(id),
  manager_id uuid REFERENCES employees(id),
  start_date date,
  end_date date,
  employment_status text DEFAULT 'active',
  employment_type text DEFAULT 'full-time',
  personal_details jsonb DEFAULT '{}',
  contact_details jsonb DEFAULT '{}',
  job_details jsonb DEFAULT '{}',
  bank_details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, employee_id)
);
```

### documents
Employee documents
```sql
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id uuid REFERENCES employees(id),
  organization_id uuid NOT NULL,
  document_type text NOT NULL,
  document_name text NOT NULL,
  file_url text NOT NULL,
  uploaded_by uuid REFERENCES users(id),
  is_verified boolean DEFAULT false,
  verified_by uuid REFERENCES users(id),
  verified_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### education
Employee education records
```sql
CREATE TABLE education (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id uuid REFERENCES employees(id),
  organization_id uuid NOT NULL,
  institution text NOT NULL,
  degree text NOT NULL,
  field_of_study text NOT NULL,
  start_date date,
  end_date date,
  grade text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### work_history
Employee work experience
```sql
CREATE TABLE work_history (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id uuid REFERENCES employees(id),
  organization_id uuid NOT NULL,
  company_name text NOT NULL,
  position text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  responsibilities text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### skills
Employee skills and certifications
```sql
CREATE TABLE skills (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id uuid REFERENCES employees(id),
  organization_id uuid NOT NULL,
  skill_name text NOT NULL,
  proficiency_level text,
  is_certified boolean DEFAULT false,
  certification_name text,
  certification_date date,
  expiry_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### assets
Company assets
```sql
CREATE TABLE assets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL,
  asset_type text NOT NULL,
  asset_name text NOT NULL,
  asset_tag text,
  serial_number text,
  status text DEFAULT 'available',
  assigned_to uuid REFERENCES employees(id),
  assigned_at timestamptz,
  returned_at timestamptz,
  condition text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### trainings
Training programs
```sql
CREATE TABLE trainings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  type text NOT NULL,
  status text DEFAULT 'draft',
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### attendance
Employee attendance records
```sql
CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id uuid REFERENCES employees(id),
  organization_id uuid NOT NULL,
  date date NOT NULL,
  check_in timestamptz,
  check_out timestamptz,
  status text DEFAULT 'present',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(employee_id, date)
);
```

### leaves
Leave requests
```sql
CREATE TABLE leaves (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id uuid REFERENCES employees(id),
  organization_id uuid NOT NULL,
  leave_type text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'pending',
  reason text,
  approved_by uuid REFERENCES users(id),
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### payroll
Payroll records
```sql
CREATE TABLE payroll (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id uuid REFERENCES employees(id),
  organization_id uuid NOT NULL,
  period text NOT NULL,
  basic_salary decimal NOT NULL,
  deductions jsonb DEFAULT '{}',
  additions jsonb DEFAULT '{}',
  net_salary decimal NOT NULL,
  status text DEFAULT 'draft',
  paid_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### benefits
Employee benefits
```sql
CREATE TABLE benefits (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id uuid REFERENCES employees(id),
  organization_id uuid NOT NULL,
  benefit_type text NOT NULL,
  details jsonb DEFAULT '{}',
  start_date date NOT NULL,
  end_date date,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### reviews
Performance reviews
```sql
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id uuid REFERENCES employees(id),
  organization_id uuid NOT NULL,
  reviewer_id uuid REFERENCES users(id),
  review_type text NOT NULL,
  period text NOT NULL,
  ratings jsonb NOT NULL,
  comments text,
  status text DEFAULT 'draft',
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### roles
Role definitions
```sql
CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  is_system boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, name)
);
```

### access
Role permissions
```sql
CREATE TABLE access (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id uuid NOT NULL,
  role_id uuid REFERENCES roles(id),
  resource_type text NOT NULL,
  resource_id uuid,
  action text NOT NULL,
  conditions jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(role_id, resource_type, resource_id, action)
);
```

## Schema Relationships

### Organization Relationships
- organizations -> users (one-to-many)
- organizations -> departments (one-to-many)
- organizations -> positions (one-to-many)
- organizations -> employees (one-to-many)
- organizations -> roles (one-to-many)

### Department Relationships
- departments -> departments (self-referential for hierarchy)
- departments -> positions (one-to-many)
- departments -> employees (one-to-many)

### Employee Relationships
- employees -> user (one-to-one)
- employees -> position (many-to-one)
- employees -> department (many-to-one)
- employees -> manager (self-referential)
- employees -> documents (one-to-many)
- employees -> education (one-to-many)
- employees -> work_history (one-to-many)
- employees -> skills (one-to-many)
- employees -> assets (one-to-many)
- employees -> trainings (many-to-many)
- employees -> attendance (one-to-many)
- employees -> leaves (one-to-many)
- employees -> payroll (one-to-many)
- employees -> benefits (one-to-many)
- employees -> reviews (one-to-many)

### Role Relationships
- roles -> access (one-to-many)

## Row Level Security (RLS)
All tables have row level security enabled with appropriate policies:

1. Organization-level access:
   - Users can only access data within their organization
   - Super admins can access all organizations

2. Department-level access:
   - Managers can access their department and sub-departments
   - HR can access all departments

3. Employee-level access:
   - Employees can view their own data
   - Managers can view their direct reports
   - HR can view all employees

## Indexes
Important indexes are created for performance:

1. Primary keys on all id columns
2. Foreign key indexes
3. Unique constraints where applicable
4. Composite indexes for frequently queried combinations

## Audit Trail
All tables include:
- created_at: Creation timestamp
- updated_at: Last update timestamp
- Tracking of who performed key actions (e.g., approved_by, verified_by)
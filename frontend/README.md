# HR SaaS Platform

A comprehensive HR management platform built with React, TypeScript, and Supabase.

## Overview

The HR SaaS Platform is a modern, full-featured human resources management system designed to help organizations streamline their HR operations. It provides a comprehensive suite of tools for managing employees, attendance, payroll, benefits, training, and more.

## Features

### Role-Based Access Control
- Super Admin: Platform-wide management
- Tenant Admin: Organization-level management
- Tenant Manager: Department-level management
- Tenant User: HR operations
- Tenant Employee: Self-service features

### Core Modules

#### Employee Management
- Employee profiles and records
- Department management
- Position management
- Document management
- Employee onboarding workflow

#### Time & Attendance
- Attendance tracking
- Leave management
- Shift scheduling
- Overtime tracking
- Time-off requests

#### Payroll & Benefits
- Salary processing
- Tax management
- Benefits administration
- Payroll reporting
- Tax document management

#### Training & Development
- Training programs
- Course management
- Progress tracking
- Certification management
- Skill assessments

#### Performance Management
- Performance reviews
- Goal setting
- KPI tracking
- Feedback management
- Development plans

#### Asset Management
- Company asset tracking
- Asset assignment
- Maintenance scheduling
- Asset reporting
- Inventory management

## Technology Stack

### Frontend
- React 18.x
- TypeScript
- Vite
- TailwindCSS
- Shadcn/ui Components
- React Router DOM
- React Hook Form
- Zod Validation
- Recharts
- Lucide Icons

### Backend
- Supabase
- PostgreSQL
- Row Level Security (RLS)
- Real-time subscriptions
- Authentication & Authorization

## Architecture

### Directory Structure
```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication components
│   ├── layouts/       # Layout components
│   ├── ui/            # Base UI components
│   └── [module]/      # Module-specific components
├── lib/               # Utilities and helpers
│   ├── api/          # API functions
│   ├── auth/         # Authentication logic
│   ├── constants/    # Constants and enums
│   └── utils/        # Utility functions
├── pages/            # Page components
│   ├── admin/        # Admin pages
│   ├── auth/         # Authentication pages
│   └── [module]/     # Module-specific pages
└── types/            # TypeScript type definitions
```

### Database Schema

#### Core Tables
- organizations
- users
- departments
- positions
- employees
- employee_documents
- employee_education
- employee_work_history
- employee_skills

### Authentication Flow
1. User signs in with email/password
2. Supabase handles authentication
3. JWT token is stored securely
4. Role-based access control is enforced
5. Row Level Security ensures data isolation

## Setup & Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd hr-saas-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start development server:
```bash
npm run dev
```

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Follow component composition patterns
- Implement proper error handling

### Component Structure
- Use functional components
- Implement proper prop typing
- Use custom hooks for logic separation
- Follow single responsibility principle
- Implement error boundaries

### State Management
- Use React Context for global state
- Implement proper data fetching
- Handle loading and error states
- Use optimistic updates
- Implement proper caching

### Security
- Implement proper authentication
- Use role-based access control
- Sanitize user inputs
- Implement proper validation
- Follow security best practices

## Testing

### Unit Testing
- Test components in isolation
- Test utility functions
- Test custom hooks
- Test form validation
- Test error handling

### Integration Testing
- Test component integration
- Test API integration
- Test authentication flow
- Test navigation flow
- Test data flow

## Deployment

### Build Process
1. Run tests
2. Build application
3. Generate static assets
4. Deploy to hosting

### Production Considerations
- Enable production mode
- Implement proper logging
- Set up monitoring
- Configure error tracking
- Implement analytics

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@hrplatform.com or create an issue in the repository.
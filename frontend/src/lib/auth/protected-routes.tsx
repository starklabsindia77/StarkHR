import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth/auth-context';
import { UserRole } from '@/lib/constants/roles';

export function getDefaultRoute(role?: string) {
  console.log('role === > ', role);
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return '/admin/organizations';
    case UserRole.TENANT_ADMIN:
      return '/dashboard/overview';
    case UserRole.TENANT_USER:
      return '/employees';
    case UserRole.TENANT_EMPLOYEE:
      return '/profile';
    default:
      return '/login';
  }
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/lib/auth/auth-context'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
// import { PublicLayout } from '@/components/layouts/public-layout'
import { useAuth } from '@/lib/auth/auth-context'
import { getDefaultRoute } from '@/lib/auth/protected-routes'

// Public Pages
import HomePage from '@/pages/home'
import LoginPage from '@/pages/auth/login'
import RegisterPage from '@/pages/auth/register'

// Super Admin Pages
import OrganizationsPage from '@/pages/admin/organizations'
import SubscriptionPage from '@/pages/admin/subscription'
import FeaturesPage from '@/pages/admin/features'
import AdminAnalyticsPage from '@/pages/admin/analytics'
import SystemSettingsPage from '@/pages/admin/settings'
import AccessControlPage from '@/pages/admin/access'
import AuditLogsPage from '@/pages/admin/audit'
import AdminSupportPage from '@/pages/admin/support'
import AdminDocsPage from '@/pages/admin/docs'

// Tenant Admin Pages
import TenantSubscriptionPage from '@/pages/tenant/subscription'
import DashboardOverview from '@/pages/dashboard/overview'
import AnalyticsPage from '@/pages/analytics'
import AccessManagementPage from '@/pages/settings/access-management'

// Employee Management
import EmployeesPage from '@/pages/employees'
import DepartmentsPage from '@/pages/departments'
import PositionsPage from '@/pages/positions'

// Time Management
import AttendancePage from '@/pages/attendance'
import LeavePage from '@/pages/leave'
import SchedulePage from '@/pages/schedule'

// Payroll & Benefits
import PayrollPage from '@/pages/payroll'
import TaxDocumentsPage from '@/pages/tax-documents'
import BenefitsPage from '@/pages/benefits'

// Resources
import AssetsPage from '@/pages/assets'
import DocumentsPage from '@/pages/documents'
import TrainingPage from '@/pages/training'

// Performance
import GoalsPage from '@/pages/goals'
import ReviewsPage from '@/pages/reviews'

// Support
import HelpPage from '@/pages/help'
import KnowledgeBasePage from '@/pages/knowledge-base'
import FAQsPage from '@/pages/faqs'

// Common
import ProfilePage from '@/pages/profile'
import SettingsPage from '@/pages/settings'

function AppRoutes() {
  const { user } = useAuth();

  const hostname = window.location.hostname;
  const isSubdomain = hostname.split(".").length >= 2;


  const SubdomainRouter = () => {
    const hostname = window.location.hostname;
    // const subdomain = hostname.split(".")[0]; // Extract the subdomain
  
    // You can map subdomains to specific organizations here
    const subdomain = hostname;
  
    return <LoginPage subdomain={subdomain} />;
  };
  return (
    <Routes>
      {/* Public routes */}
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route
        path="/"
        element={
          isSubdomain ? (
            <Navigate to="/login" replace />
          ) : (
            <HomePage />
          )
        }
      />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to={getDefaultRoute(user.role)} replace />
          ) : (
            // <LoginPage />
            <SubdomainRouter />
          )
        }
      />
      <Route
        path="/register"
        element={
          user ? (
            <Navigate to={getDefaultRoute(user.role)} replace />
          ) : (
            <RegisterPage />
          )
        }
      />

      {/* Super Admin Routes */}
      <Route
        path="/admin/organizations"
        element={
          <DashboardLayout>
            <OrganizationsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/admin/subscription"
        element={
          <DashboardLayout>
            <SubscriptionPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/admin/features"
        element={
          <DashboardLayout>
            <FeaturesPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <DashboardLayout>
            <AdminAnalyticsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <DashboardLayout>
            <SystemSettingsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/admin/access"
        element={
          <DashboardLayout>
            <AccessControlPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/admin/audit"
        element={
          <DashboardLayout>
            <AuditLogsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/admin/support"
        element={
          <DashboardLayout>
            <AdminSupportPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/admin/docs"
        element={
          <DashboardLayout>
            <AdminDocsPage />
          </DashboardLayout>
        }
      />

      {/* Tenant Admin Routes */}
      <Route
        path="/tenant/subscription"
        element={
          <DashboardLayout>
            <TenantSubscriptionPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/overview"
        element={
          <DashboardLayout>
            <DashboardOverview />
          </DashboardLayout>
        }
      />
      <Route
        path="/analytics"
        element={
          <DashboardLayout>
            <AnalyticsPage />
          </DashboardLayout>
        }
      />

      {/* Employee Management */}
      <Route
        path="/employees"
        element={
          <DashboardLayout>
            <EmployeesPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/departments"
        element={
          <DashboardLayout>
            <DepartmentsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/positions"
        element={
          <DashboardLayout>
            <PositionsPage />
          </DashboardLayout>
        }
      />

      {/* Time Management */}
      <Route
        path="/attendance"
        element={
          <DashboardLayout>
            <AttendancePage />
          </DashboardLayout>
        }
      />
      <Route
        path="/leave"
        element={
          <DashboardLayout>
            <LeavePage />
          </DashboardLayout>
        }
      />
      <Route
        path="/schedule"
        element={
          <DashboardLayout>
            <SchedulePage />
          </DashboardLayout>
        }
      />

      {/* Payroll & Benefits */}
      <Route
        path="/payroll"
        element={
          <DashboardLayout>
            <PayrollPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/tax-documents"
        element={
          <DashboardLayout>
            <TaxDocumentsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/benefits"
        element={
          <DashboardLayout>
            <BenefitsPage />
          </DashboardLayout>
        }
      />

      {/* Resources */}
      <Route
        path="/assets"
        element={
          <DashboardLayout>
            <AssetsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/documents"
        element={
          <DashboardLayout>
            <DocumentsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/training"
        element={
          <DashboardLayout>
            <TrainingPage />
          </DashboardLayout>
        }
      />

      {/* Performance */}
      <Route
        path="/goals"
        element={
          <DashboardLayout>
            <GoalsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/reviews"
        element={
          <DashboardLayout>
            <ReviewsPage />
          </DashboardLayout>
        }
      />

      {/* Support */}
      <Route
        path="/help"
        element={
          <DashboardLayout>
            <HelpPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/knowledge-base"
        element={
          <DashboardLayout>
            <KnowledgeBasePage />
          </DashboardLayout>
        }
      />
      <Route
        path="/faqs"
        element={
          <DashboardLayout>
            <FAQsPage />
          </DashboardLayout>
        }
      />

      {/* Common */}
      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <ProfilePage />
          </DashboardLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <DashboardLayout>
            <SettingsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/settings/access-management"
        element={
          <DashboardLayout>
            <AccessManagementPage />
          </DashboardLayout>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}
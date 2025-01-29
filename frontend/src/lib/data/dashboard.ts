// Dummy data for different dashboards
export const dashboardData = {
  superAdmin: {
    totalOrganizations: 15,
    activeUsers: 450,
    totalRevenue: 125000,
    recentOrganizations: [
      { id: '1', name: 'Tech Corp', users: 45, plan: 'Enterprise' },
      { id: '2', name: 'Marketing Pro', users: 32, plan: 'Business' },
      { id: '3', name: 'Design Studio', users: 28, plan: 'Professional' }
    ]
  },
  tenantAdmin: {
    totalEmployees: 128,
    departments: 12,
    openPositions: 8,
    upcomingReviews: 24,
    recentHires: [
      { name: 'Alice Johnson', position: 'Senior Developer', department: 'Engineering' },
      { name: 'Bob Smith', position: 'Marketing Specialist', department: 'Marketing' },
      { name: 'Carol White', position: 'UI Designer', department: 'Design' }
    ]
  },
  tenantUser: {
    assignedEmployees: 45,
    pendingRequests: 12,
    activeProjects: 8,
    recentActivities: [
      { type: 'employee_update', name: 'John Doe', action: 'Profile updated' },
      { type: 'document_upload', name: 'Sarah Brown', action: 'Added certification' },
      { type: 'leave_request', name: 'Mike Wilson', action: 'Requested vacation' }
    ]
  },
  tenantEmployee: {
    upcomingReviews: 1,
    pendingTasks: 5,
    leaveBalance: 15,
    recentPayslips: [
      { period: 'March 2024', status: 'Paid', amount: 5000 },
      { period: 'February 2024', status: 'Paid', amount: 5000 },
      { period: 'January 2024', status: 'Paid', amount: 5000 }
    ]
  }
}
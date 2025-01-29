import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Clock, 
  Users,
  Plus,
  Filter,
  Download,
  Building2,
  AlertTriangle
} from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

export default function LeavePage() {
  const { user } = useAuth()

  const renderTenantAdminView = () => {
    const departmentLeave = [
      {
        department: "Engineering",
        totalEmployees: 45,
        onLeave: 3,
        pendingRequests: 5,
        upcomingLeave: 4,
        leaveBalance: {
          annual: 450,
          sick: 225,
          casual: 135
        },
        recentRequests: [
          { employee: "John Doe", type: "Annual", days: 5, status: "Pending" },
          { employee: "Jane Smith", type: "Sick", days: 2, status: "Approved" }
        ]
      },
      {
        department: "Marketing",
        totalEmployees: 28,
        onLeave: 2,
        pendingRequests: 3,
        upcomingLeave: 2,
        leaveBalance: {
          annual: 280,
          sick: 140,
          casual: 84
        },
        recentRequests: [
          { employee: "Mike Wilson", type: "Annual", days: 3, status: "Pending" },
          { employee: "Sarah Brown", type: "Casual", days: 1, status: "Approved" }
        ]
      },
      {
        department: "HR",
        totalEmployees: 12,
        onLeave: 1,
        pendingRequests: 2,
        upcomingLeave: 1,
        leaveBalance: {
          annual: 120,
          sick: 60,
          casual: 36
        },
        recentRequests: [
          { employee: "Tom Harris", type: "Sick", days: 2, status: "Pending" }
        ]
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Leave Management</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage organization-wide leave requests
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Leave Policy
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Leave</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Active departments</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Department Leave Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentLeave.map((dept, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{dept.department}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {dept.totalEmployees} employees
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Today</p>
                        <p className="text-sm text-muted-foreground">{dept.onLeave} on leave</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Leave Balance</p>
                      <p className="font-semibold">{dept.leaveBalance.annual} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sick Leave Balance</p>
                      <p className="font-semibold">{dept.leaveBalance.sick} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Casual Leave Balance</p>
                      <p className="font-semibold">{dept.leaveBalance.casual} days</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recent Requests</p>
                    <div className="space-y-2">
                      {dept.recentRequests.map((request, j) => (
                        <div key={j} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="font-medium">{request.employee}</span>
                            <span className="text-muted-foreground"> • {request.type} • {request.days} days</span>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full ${
                            request.status === 'Approved' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Manage Requests</Button>
                    <Button variant="outline" size="sm">View Calendar</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </>
    )
  }

  const renderEmployeeView = () => {
    const leaveStats = {
      annual: { total: 21, used: 12, remaining: 9 },
      sick: { total: 10, used: 3, remaining: 7 },
      casual: { total: 7, used: 2, remaining: 5 }
    }

    const upcomingLeaves = [
      { type: 'Annual Leave', from: '2024-03-15', to: '2024-03-20', status: 'Approved' },
      { type: 'Sick Leave', from: '2024-04-05', to: '2024-04-05', status: 'Pending' }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Leave Management</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your leave requests
            </p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Request Leave
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Leave</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveStats.annual.remaining} days</div>
              <p className="text-xs text-muted-foreground">
                Used: {leaveStats.annual.used} / {leaveStats.annual.total} days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveStats.sick.remaining} days</div>
              <p className="text-xs text-muted-foreground">
                Used: {leaveStats.sick.used} / {leaveStats.sick.total} days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Casual Leave</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveStats.casual.remaining} days</div>
              <p className="text-xs text-muted-foreground">
                Used: {leaveStats.casual.used} / {leaveStats.casual.total} days
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Leaves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLeaves.map((leave, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{leave.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(leave.from).toLocaleDateString()} - {new Date(leave.to).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                    leave.status === 'Approved' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                  }`}>
                    {leave.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </>
    )
  }

  return (
    <div className="space-y-8">
      {user?.role === 'tenant_admin' ? renderTenantAdminView() : renderEmployeeView()}
    </div>
  )
}
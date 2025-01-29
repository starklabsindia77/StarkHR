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
  AlertTriangle,
  ArrowUpDown,
  Settings,
  RotateCcw
} from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"
import { useState } from "react"

export default function SchedulePage() {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const renderTenantAdminView = () => {
    const departmentSchedules = [
      {
        department: "Engineering",
        totalEmployees: 45,
        onShift: 42,
        offDuty: 3,
        shifts: {
          morning: 15,
          afternoon: 15,
          night: 12
        },
        coverage: 93,
        scheduleConflicts: 2,
        recentChanges: [
          { employee: "John Doe", change: "Shift swap request", time: "2 hours ago" },
          { employee: "Jane Smith", change: "Schedule updated", time: "4 hours ago" }
        ]
      },
      {
        department: "Marketing",
        totalEmployees: 28,
        onShift: 25,
        offDuty: 3,
        shifts: {
          morning: 12,
          afternoon: 13,
          night: 0
        },
        coverage: 89,
        scheduleConflicts: 1,
        recentChanges: [
          { employee: "Mike Wilson", change: "Leave request approved", time: "1 day ago" }
        ]
      },
      {
        department: "HR",
        totalEmployees: 12,
        onShift: 11,
        offDuty: 1,
        shifts: {
          morning: 6,
          afternoon: 5,
          night: 0
        },
        coverage: 92,
        scheduleConflicts: 0,
        recentChanges: [
          { employee: "Sarah Brown", change: "Schedule confirmed", time: "2 days ago" }
        ]
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Shift Schedule Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage and monitor organization-wide schedules
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
              Create Schedule
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Shift</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-muted-foreground">91% of workforce</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Schedule Coverage</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">All departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shift Patterns</CardTitle>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Active patterns</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">With active schedules</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Department Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentSchedules.map((dept, i) => (
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
                        <p className="text-sm font-medium">Coverage</p>
                        <p className="text-sm text-muted-foreground">{dept.coverage}%</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <p className="text-sm text-muted-foreground">Morning Shift</p>
                      </div>
                      <p className="font-semibold">{dept.shifts.morning} assigned</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <p className="text-sm text-muted-foreground">Afternoon Shift</p>
                      </div>
                      <p className="font-semibold">{dept.shifts.afternoon} assigned</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <p className="text-sm text-muted-foreground">Night Shift</p>
                      </div>
                      <p className="font-semibold">{dept.shifts.night} assigned</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Off Duty</p>
                      </div>
                      <p className="font-semibold">{dept.offDuty}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recent Changes</p>
                    {dept.recentChanges.map((change, j) => (
                      <div key={j} className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">{change.employee}</span>
                          <span className="text-muted-foreground"> • {change.change}</span>
                        </div>
                        <span className="text-muted-foreground">{change.time}</span>
                      </div>
                    ))}
                  </div>
                  {dept.scheduleConflicts > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <p className="text-sm">
                        {dept.scheduleConflicts} schedule {dept.scheduleConflicts === 1 ? 'conflict' : 'conflicts'} detected
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Manage Shifts</Button>
                    <Button variant="outline" size="sm">View Calendar</Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Shift Patterns</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure default shift patterns and rotations
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Break Schedules</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage break times and durations
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Overtime Rules</h3>
                  <p className="text-sm text-muted-foreground">
                    Set overtime policies and thresholds
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    )
  }

  const renderEmployeeView = () => {
    const scheduleStats = {
      totalHours: 40,
      regularShift: '9:00 AM - 5:00 PM',
      workDays: 'Monday - Friday'
    }

    const upcomingShifts = [
      { date: '2024-03-15', shift: 'Morning', time: '9:00 AM - 5:00 PM', type: 'Regular' },
      { date: '2024-03-16', shift: 'Morning', time: '9:00 AM - 5:00 PM', type: 'Regular' },
      { date: '2024-03-17', shift: 'Off', time: '-', type: 'Weekend' }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Shift Schedule</h1>
            <p className="text-muted-foreground mt-2">
              View and manage your work schedule
            </p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            View Full Calendar
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduleStats.totalHours} hours</div>
              <p className="text-xs text-muted-foreground">Regular work week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Regular Shift</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduleStats.regularShift}</div>
              <p className="text-xs text-muted-foreground">Standard timing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Work Days</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduleStats.workDays}</div>
              <p className="text-xs text-muted-foreground">Regular working days</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Shifts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingShifts.map((shift, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{new Date(shift.date).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">{shift.time}</p>
                  </div>
                  <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                    shift.type === 'Regular' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
                  }`}>
                    {shift.type}
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
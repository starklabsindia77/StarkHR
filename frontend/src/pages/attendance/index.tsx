import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Clock, 
  UserCheck, 
  UserX, 
  Users,
  Calendar,
  Filter,
  Download,
  Plus,
  Building2,
  AlertTriangle,
  ArrowUpDown,
  CheckCircle
} from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"
import { useState } from "react"

export default function AttendancePage() {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const renderTenantAdminView = () => {
    const departmentAttendance = [
      {
        department: "Engineering",
        totalEmployees: 45,
        present: 42,
        late: 2,
        absent: 1,
        onLeave: 3,
        averageArrival: "9:05 AM",
        recentActivity: [
          { employee: "John Doe", status: "Checked In", time: "9:00 AM" },
          { employee: "Jane Smith", status: "Late", time: "9:45 AM" }
        ]
      },
      {
        department: "Marketing",
        totalEmployees: 28,
        present: 25,
        late: 1,
        absent: 2,
        onLeave: 2,
        averageArrival: "8:58 AM",
        recentActivity: [
          { employee: "Mike Wilson", status: "Checked In", time: "8:55 AM" }
        ]
      },
      {
        department: "HR",
        totalEmployees: 12,
        present: 11,
        late: 0,
        absent: 1,
        onLeave: 1,
        averageArrival: "8:52 AM",
        recentActivity: [
          { employee: "Sarah Brown", status: "Checked In", time: "8:45 AM" }
        ]
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Attendance Management</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage organization-wide attendance
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
              Bulk Update
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-muted-foreground">92% of workforce</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Average delay: 22min</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Approved leaves</p>
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
            <CardTitle>Department Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentAttendance.map((dept, i) => (
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
                        <p className="text-sm font-medium">Avg. Arrival</p>
                        <p className="text-sm text-muted-foreground">{dept.averageArrival}</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-green-500" />
                        <p className="text-sm text-muted-foreground">Present</p>
                      </div>
                      <p className="font-semibold">{dept.present}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <p className="text-sm text-muted-foreground">Late</p>
                      </div>
                      <p className="font-semibold">{dept.late}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <UserX className="h-4 w-4 text-red-500" />
                        <p className="text-sm text-muted-foreground">Absent</p>
                      </div>
                      <p className="font-semibold">{dept.absent}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <p className="text-sm text-muted-foreground">On Leave</p>
                      </div>
                      <p className="font-semibold">{dept.onLeave}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recent Activity</p>
                    {dept.recentActivity.map((activity, j) => (
                      <div key={j} className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">{activity.employee}</span>
                          <span className="text-muted-foreground"> • {activity.status}</span>
                        </div>
                        <span className="text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                  {dept.late > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <p className="text-sm">
                        {dept.late} {dept.late === 1 ? 'employee is' : 'employees are'} late today
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Mark Attendance</Button>
                    <Button variant="outline" size="sm">View Schedule</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Today's Overview</p>
                  <div className="text-sm text-muted-foreground">
                    Average arrival time: 9:05 AM
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">92% On Time</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-sm text-muted-foreground">5% Late</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-sm text-muted-foreground">3% Absent</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-10 right-0 flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Calendar
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    )
  }

  const renderEmployeeView = () => {
    const getStats = () => ({
      present: { count: 1, change: "Checked in" },
      absent: { count: 0, change: "On time today" },
      leave: { count: 15, change: "Days remaining" },
      late: { count: 0, change: "Good attendance" }
    })

    const stats = getStats()

    // Calendar data
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const daysInMonth = getDaysInMonth(selectedDate)
    const firstDayOfMonth = getFirstDayOfMonth(selectedDate)
    const monthName = selectedDate.toLocaleString('default', { month: 'long' })
    const year = selectedDate.getFullYear()

    // Mock attendance data
    const attendanceData = {
      1: { status: 'present', time: '9:00 AM' },
      2: { status: 'present', time: '8:55 AM' },
      3: { status: 'present', time: '9:02 AM' },
      4: { status: 'late', time: '9:30 AM' },
      5: { status: 'present', time: '8:58 AM' },
      8: { status: 'present', time: '9:01 AM' },
      9: { status: 'present', time: '8:59 AM' },
      10: { status: 'leave', time: 'On Leave' },
      11: { status: 'leave', time: 'On Leave' },
      12: { status: 'present', time: '9:00 AM' },
    }

    const getStatusColor = (status?: string) => {
      switch (status) {
        case 'present':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
        case 'late':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
        case 'absent':
          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
        case 'leave':
          return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
        default:
          return 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
      }
    }

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Time & Attendance</h1>
            <p className="text-muted-foreground mt-2">
              Track your attendance and time records
            </p>
          </div>
          <Button>
            <Clock className="mr-2 h-4 w-4" />
            Clock In/Out
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.present.count}</div>
              <p className="text-xs text-muted-foreground">{stats.present.change}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.absent.count}</div>
              <p className="text-xs text-muted-foreground">{stats.absent.change}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.leave.count}</div>
              <p className="text-xs text-muted-foreground">{stats.leave.change}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.late.count}</div>
              <p className="text-xs text-muted-foreground">{stats.late.change}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Attendance Calendar</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                >
                  Next
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">{monthName} {year}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium p-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="p-2" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const attendance = attendanceData[day as keyof typeof attendanceData]
                return (
                  <div
                    key={day}
                    className={`p-2 text-center rounded-md ${getStatusColor(attendance?.status)}`}
                  >
                    <div className="font-medium">{day}</div>
                    {attendance && (
                      <div className="text-xs">{attendance.time}</div>
                    )}
                  </div>
                )
              })}
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
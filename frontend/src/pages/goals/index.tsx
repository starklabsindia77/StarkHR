import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, TrendingUp, CheckCircle, Clock, Plus, Filter, Download, Users } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

export default function GoalsPage() {
  const { user } = useAuth()

  const renderTenantAdminView = () => {
    const teamGoals = [
      {
        title: "Improve Team Performance",
        category: "Team Development",
        progress: 65,
        deadline: "2024-06-30",
        status: "In Progress",
        assignedTo: "Engineering Team",
        metrics: "15% performance improvement"
      },
      {
        title: "Reduce Employee Turnover",
        category: "Retention",
        progress: 80,
        deadline: "2024-12-31",
        status: "In Progress",
        assignedTo: "HR Team",
        metrics: "Maintain turnover below 10%"
      },
      {
        title: "Implement Training Program",
        category: "Development",
        progress: 45,
        deadline: "2024-09-30",
        status: "In Progress",
        assignedTo: "All Departments",
        metrics: "100% completion rate"
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Team Goals & KPIs</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage organization-wide goals
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
              Add Goal
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Across all teams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teams Involved</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Active teams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">Last quarter</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {teamGoals.map((goal, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{goal.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {goal.assignedTo}
                      </div>
                    </div>
                    <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                      goal.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {goal.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Due {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm">
                      <span className="font-medium">Success Metrics:</span>{' '}
                      {goal.metrics}
                    </p>
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
    const goals = [
      {
        title: "Complete Advanced React Certification",
        category: "Professional Development",
        progress: 75,
        deadline: "2024-06-30",
        status: "In Progress",
        metrics: "Certification obtained"
      },
      {
        title: "Improve Code Review Response Time",
        category: "Performance",
        progress: 60,
        deadline: "2024-03-31",
        status: "In Progress",
        metrics: "Average response time < 24 hours"
      },
      {
        title: "Mentor Junior Developers",
        category: "Leadership",
        progress: 40,
        deadline: "2024-12-31",
        status: "In Progress",
        metrics: "2 successful mentorship programs"
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Goals & KPIs</h1>
            <p className="text-muted-foreground mt-2">
              Track your performance goals and objectives
            </p>
          </div>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            Add New Goal
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">For current period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58%</div>
              <p className="text-xs text-muted-foreground">Across all goals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">This quarter</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {goals.map((goal, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">{goal.category}</p>
                    </div>
                    <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                      goal.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {goal.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Due {new Date(goal.deadline).toLocaleDateString()}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm">
                      <span className="font-medium">Success Metrics:</span>{' '}
                      {goal.metrics}
                    </p>
                  </div>
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Play, 
  Clock,
  Users,
  Plus,
  Filter,
  Download,
  TrendingUp,
  CheckCircle
} from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

export default function TrainingPage() {
  const { user } = useAuth()

  const renderTenantAdminView = () => {
    const departmentTraining = [
      {
        department: "Engineering",
        totalEmployees: 45,
        completedTrainings: 156,
        inProgress: 28,
        compliance: 92,
        mandatoryDue: 4,
        topCourses: [
          "Advanced React Development",
          "Cloud Architecture",
          "Security Best Practices"
        ]
      },
      {
        department: "Marketing",
        totalEmployees: 28,
        completedTrainings: 98,
        inProgress: 15,
        compliance: 88,
        mandatoryDue: 3,
        topCourses: [
          "Digital Marketing Strategy",
          "Social Media Analytics",
          "Content Creation"
        ]
      },
      {
        department: "HR",
        totalEmployees: 12,
        completedTrainings: 45,
        inProgress: 8,
        compliance: 95,
        mandatoryDue: 1,
        topCourses: [
          "HR Compliance",
          "Employee Relations",
          "Performance Management"
        ]
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Training Management</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage organization-wide training programs
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
              Create Training
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Available courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">Currently enrolled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">Average completion</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certifications</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">Issued this year</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Department Training Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentTraining.map((dept, i) => (
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
                        <p className="text-sm font-medium">Compliance</p>
                        <p className="text-sm text-muted-foreground">{dept.compliance}%</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="font-semibold">{dept.completedTrainings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="font-semibold">{dept.inProgress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mandatory Due</p>
                      <p className="font-semibold">{dept.mandatoryDue}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Top Courses</p>
                    <div className="space-y-1">
                      {dept.topCourses.map((course, j) => (
                        <p key={j} className="text-sm text-muted-foreground">
                          • {course}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Assign Training</Button>
                    <Button variant="outline" size="sm">View Progress</Button>
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
    const inProgress = [
      {
        title: "Cybersecurity Fundamentals",
        progress: 60,
        deadline: "2024-03-30",
        type: "Mandatory",
        duration: "2 hours"
      },
      {
        title: "Leadership Skills 101",
        progress: 30,
        deadline: "2024-04-15",
        type: "Optional",
        duration: "3 hours"
      }
    ]

    const available = [
      {
        title: "Project Management Basics",
        category: "Professional Development",
        duration: "4 hours",
        type: "Optional"
      },
      {
        title: "Data Privacy Training",
        category: "Compliance",
        duration: "1 hour",
        type: "Mandatory"
      },
      {
        title: "Effective Communication",
        category: "Soft Skills",
        duration: "2 hours",
        type: "Optional"
      }
    ]

    const completed = [
      {
        title: "Company Policies",
        completedDate: "2024-01-15",
        score: "95%",
        certificate: true
      },
      {
        title: "Health and Safety",
        completedDate: "2024-02-01",
        score: "100%",
        certificate: true
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Training & Development</h1>
            <p className="text-muted-foreground mt-2">
              Access your training modules and track progress
            </p>
          </div>
          <Button>
            <GraduationCap className="mr-2 h-4 w-4" />
            Browse Courses
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inProgress.map((course, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Due by {new Date(course.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                        course.type === 'Mandatory'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {course.type}
                      </span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-muted-foreground">{course.progress}% Complete</span>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Available Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {available.map((course, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                          course.type === 'Mandatory'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {course.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{course.duration}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Completed Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completed.map((course, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Completed on {new Date(course.completedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Score</p>
                        <p className="text-sm text-muted-foreground">{course.score}</p>
                      </div>
                      {course.certificate && (
                        <Button variant="outline" size="sm">
                          View Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  return (
    <div className="space-y-8">
      {user?.role === 'tenant_admin' ? renderTenantAdminView() : renderEmployeeView()}
    </div>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardList, Star, Calendar, TrendingUp, Users, Filter, Download, Plus } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

export default function ReviewsPage() {
  const { user } = useAuth()

  const renderTenantAdminView = () => {
    const departmentReviews = [
      {
        department: "Engineering",
        reviewsConducted: 28,
        reviewsPending: 4,
        averageRating: 4.2,
        nextReview: "2024-03-20",
        reviewers: ["John Manager", "Sarah Lead"]
      },
      {
        department: "Marketing",
        reviewsConducted: 15,
        reviewsPending: 2,
        averageRating: 4.5,
        nextReview: "2024-03-25",
        reviewers: ["Mike Director"]
      },
      {
        department: "HR",
        reviewsConducted: 8,
        reviewsPending: 1,
        averageRating: 4.3,
        nextReview: "2024-03-15",
        reviewers: ["Lisa HR"]
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Performance Reviews</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track organization-wide performance reviews
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
              Schedule Review
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">51</div>
              <p className="text-xs text-muted-foreground">Conducted this quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">To be completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.3</div>
              <p className="text-xs text-muted-foreground">Organization-wide</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviewers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Active reviewers</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Department Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentReviews.map((dept, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{dept.department}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        Reviewers: {dept.reviewers.join(", ")}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{dept.averageRating}</span>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Reviews Conducted</p>
                      <p className="font-semibold">{dept.reviewsConducted}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reviews Pending</p>
                      <p className="font-semibold">{dept.reviewsPending}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Review</p>
                      <p className="font-semibold">{new Date(dept.nextReview).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Schedule Review</Button>
                    <Button variant="outline" size="sm">View Feedback</Button>
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
    const upcomingReview = {
      type: "Quarterly Performance Review",
      date: "2024-03-31",
      reviewer: "John Manager",
      status: "Scheduled"
    }

    const pastReviews = [
      {
        type: "Annual Review",
        date: "2023-12-15",
        rating: 4.5,
        feedback: "Excellent performance in project deliveries and team collaboration",
        reviewer: "Jane Director"
      },
      {
        type: "Quarterly Review",
        date: "2023-09-30",
        rating: 4.2,
        feedback: "Strong technical skills and good progress on personal development goals",
        reviewer: "John Manager"
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Performance Reviews</h1>
            <p className="text-muted-foreground mt-2">
              Track your performance evaluations and feedback
            </p>
          </div>
          <Button>
            <ClipboardList className="mr-2 h-4 w-4" />
            Self Assessment
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.35</div>
              <p className="text-xs text-muted-foreground">Out of 5.0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Review</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(upcomingReview.date).toLocaleDateString()}
              </div>
              <p className="text-xs text-muted-foreground">{upcomingReview.type}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+7%</div>
              <p className="text-xs text-muted-foreground">Year over year</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{upcomingReview.type}</h3>
                  <p className="text-sm text-muted-foreground">
                    With {upcomingReview.reviewer}
                  </p>
                </div>
                <span className="text-sm px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {upcomingReview.status}
                </span>
              </div>
              <div className="mt-4 flex gap-4">
                <Button variant="outline">Prepare Notes</Button>
                <Button variant="outline">View Agenda</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Past Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {pastReviews.map((review, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{review.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()} • {review.reviewer}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-semibold">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.feedback}</p>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">View Full Review</Button>
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
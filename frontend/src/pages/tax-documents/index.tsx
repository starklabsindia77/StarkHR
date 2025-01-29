import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Download, 
  Upload, 
  Plus,
  Filter,
  Users,
  Building2,
  AlertTriangle,
  Clock
} from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

export default function TaxDocumentsPage() {
  const { user } = useAuth()

  const renderTenantAdminView = () => {
    const departmentDocuments = [
      {
        department: "Engineering",
        totalEmployees: 45,
        documentsSubmitted: 42,
        pendingDocuments: 3,
        documentTypes: {
          form16: 42,
          investment: 40,
          form12B: 38
        },
        recentActivity: [
          { employee: "John Doe", action: "Submitted Form 16", date: "2024-03-10" },
          { employee: "Jane Smith", action: "Updated Investment Declaration", date: "2024-03-09" }
        ]
      },
      {
        department: "Marketing",
        totalEmployees: 28,
        documentsSubmitted: 25,
        pendingDocuments: 3,
        documentTypes: {
          form16: 25,
          investment: 23,
          form12B: 22
        },
        recentActivity: [
          { employee: "Mike Wilson", action: "Submitted Form 12B", date: "2024-03-08" }
        ]
      },
      {
        department: "HR",
        totalEmployees: 12,
        documentsSubmitted: 12,
        pendingDocuments: 0,
        documentTypes: {
          form16: 12,
          investment: 12,
          form12B: 12
        },
        recentActivity: [
          { employee: "Sarah Brown", action: "Submitted Form 16", date: "2024-03-07" }
        ]
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tax Document Management</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage organization-wide tax documents
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
              Upload Bulk
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">79</div>
              <p className="text-xs text-muted-foreground">Submitted this year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Documents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">93%</div>
              <p className="text-xs text-muted-foreground">On-time submission</p>
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
            <CardTitle>Department Document Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentDocuments.map((dept, i) => (
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
                        <p className="text-sm font-medium">Submission Rate</p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round((dept.documentsSubmitted / dept.totalEmployees) * 100)}%
                        </p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Form 16</p>
                      <p className="font-semibold">{dept.documentTypes.form16} submitted</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Investment Declaration</p>
                      <p className="font-semibold">{dept.documentTypes.investment} submitted</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Form 12B</p>
                      <p className="font-semibold">{dept.documentTypes.form12B} submitted</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recent Activity</p>
                    {dept.recentActivity.map((activity, j) => (
                      <div key={j} className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">{activity.employee}</span>
                          <span className="text-muted-foreground"> • {activity.action}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  {dept.pendingDocuments > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <p className="text-sm">
                        {dept.pendingDocuments} employees have pending documents
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Send Reminder</Button>
                    <Button variant="outline" size="sm">Download Report</Button>
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
    const taxDocuments = [
      {
        type: 'Form 16',
        year: '2023-24',
        status: 'Available',
        uploadedAt: '2024-02-01',
        description: 'Annual Tax Statement'
      },
      {
        type: 'Investment Declaration',
        year: '2023-24',
        status: 'Pending',
        uploadedAt: null,
        description: 'Tax saving investments declaration'
      },
      {
        type: 'Form 12B',
        year: '2023-24',
        status: 'Available',
        uploadedAt: '2024-01-15',
        description: 'Tax deduction from previous employer'
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tax Documents</h1>
            <p className="text-muted-foreground mt-2">
              Manage your tax-related documents and declarations
            </p>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tax Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taxDocuments.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{doc.year}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : 'Not uploaded'}
                      </p>
                    </div>
                    {doc.status === 'Available' ? (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    ) : (
                      <span className="text-sm px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                        {doc.status}
                      </span>
                    )}
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
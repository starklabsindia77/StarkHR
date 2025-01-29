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
  Clock,
  Search,
  FolderOpen,
  Lock,
  Settings,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"
import { Input } from "@/components/ui/input"

export default function DocumentsPage() {
  const { user } = useAuth()

  const renderTenantAdminView = () => {
    const departmentDocuments = [
      {
        department: "Engineering",
        totalEmployees: 45,
        documentsUploaded: 156,
        pendingUploads: 12,
        storageUsed: "2.8 GB",
        categories: {
          contracts: 45,
          policies: 28,
          training: 35,
          other: 48
        },
        recentActivity: [
          { employee: "John Doe", action: "Uploaded Contract", date: "2024-03-10" },
          { employee: "Jane Smith", action: "Updated Policy", date: "2024-03-09" }
        ]
      },
      {
        department: "Marketing",
        totalEmployees: 28,
        documentsUploaded: 98,
        pendingUploads: 8,
        storageUsed: "1.5 GB",
        categories: {
          contracts: 28,
          policies: 22,
          training: 25,
          other: 23
        },
        recentActivity: [
          { employee: "Mike Wilson", action: "Uploaded Training Doc", date: "2024-03-08" }
        ]
      },
      {
        department: "HR",
        totalEmployees: 12,
        documentsUploaded: 64,
        pendingUploads: 3,
        storageUsed: "0.8 GB",
        categories: {
          contracts: 12,
          policies: 18,
          training: 15,
          other: 19
        },
        recentActivity: [
          { employee: "Sarah Brown", action: "Updated Contract", date: "2024-03-07" }
        ]
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Document Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track organization-wide documents
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
              Upload Documents
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
              <div className="text-2xl font-bold">318</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.1 GB</div>
              <p className="text-xs text-muted-foreground">Of 10 GB allocated</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Uploads</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Required documents</p>
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

        <div className="flex items-center space-x-2 my-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents, employees, or departments..."
              className="pl-8"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Department Documents</CardTitle>
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
                        <p className="text-sm font-medium">Storage Used</p>
                        <p className="text-sm text-muted-foreground">{dept.storageUsed}</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Contracts</p>
                      </div>
                      <p className="font-semibold">{dept.categories.contracts}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Policies</p>
                      </div>
                      <p className="font-semibold">{dept.categories.policies}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Training</p>
                      </div>
                      <p className="font-semibold">{dept.categories.training}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Other</p>
                      </div>
                      <p className="font-semibold">{dept.categories.other}</p>
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
                  {dept.pendingUploads > 0 && (
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <p className="text-sm">
                        {dept.pendingUploads} documents pending upload
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View All
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Document Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Storage Quotas</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage department storage limits
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Document Categories</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize document types and categories
                  </p>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">Access Permissions</h3>
                  <p className="text-sm text-muted-foreground">
                    Set document access levels
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
    const documents = [
      {
        type: 'Contract',
        name: 'Employment Agreement',
        uploadedAt: '2024-02-01',
        status: 'Active',
        description: 'Current employment contract'
      },
      {
        type: 'Policy',
        name: 'Employee Handbook',
        uploadedAt: '2024-01-15',
        status: 'Available',
        description: 'Company policies and guidelines'
      },
      {
        type: 'Training',
        name: 'Safety Guidelines',
        uploadedAt: '2024-03-01',
        status: 'Required',
        description: 'Workplace safety procedures'
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground mt-2">
              Access and manage your documents
            </p>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{doc.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
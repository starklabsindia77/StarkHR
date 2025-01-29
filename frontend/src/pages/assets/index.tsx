import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Laptop, 
  Monitor, 
  Phone, 
  Keyboard, 
  Download, 
  Upload, 
  Plus,
  Filter,
  Building2,
  DollarSign,
  AlertTriangle
} from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

export default function AssetsPage() {
  const { user } = useAuth()

  const renderTenantAdminView = () => {
    const departmentAssets = [
      {
        department: "Engineering",
        totalAssets: 120,
        value: 185000,
        maintenance: 8,
        categories: {
          laptops: 45,
          monitors: 85,
          phones: 40,
          other: 30
        }
      },
      {
        department: "Marketing",
        totalAssets: 65,
        value: 95000,
        maintenance: 3,
        categories: {
          laptops: 25,
          monitors: 35,
          phones: 20,
          other: 15
        }
      },
      {
        department: "HR",
        totalAssets: 35,
        value: 45000,
        maintenance: 2,
        categories: {
          laptops: 15,
          monitors: 20,
          phones: 12,
          other: 8
        }
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Asset Management</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage organization assets
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
              Add Asset
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Laptop className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">220</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$325,000</div>
              <p className="text-xs text-muted-foreground">Current inventory value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">13</div>
              <p className="text-xs text-muted-foreground">Assets need attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">With assigned assets</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Department Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentAssets.map((dept, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{dept.department}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        {dept.totalAssets} total assets
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Value</p>
                        <p className="text-sm text-muted-foreground">${dept.value.toLocaleString()}</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Laptop className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Laptops</p>
                      </div>
                      <p className="font-semibold">{dept.categories.laptops}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Monitors</p>
                      </div>
                      <p className="font-semibold">{dept.categories.monitors}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Phones</p>
                      </div>
                      <p className="font-semibold">{dept.categories.phones}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Keyboard className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Other</p>
                      </div>
                      <p className="font-semibold">{dept.categories.other}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Manage Assets</Button>
                    <Button variant="outline" size="sm">Maintenance ({dept.maintenance})</Button>
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
    const assets = [
      {
        type: 'Laptop',
        model: 'MacBook Pro M1',
        assignedDate: '2023-12-01',
        status: 'Assigned',
        serialNumber: 'MBP2023001',
        icon: Laptop
      },
      {
        type: 'Monitor',
        model: 'Dell U2419H',
        assignedDate: '2023-12-01',
        status: 'Assigned',
        serialNumber: 'DM2023002',
        icon: Monitor
      },
      {
        type: 'Phone',
        model: 'iPhone 13',
        assignedDate: '2023-12-01',
        status: 'Assigned',
        serialNumber: 'IP2023003',
        icon: Phone
      },
      {
        type: 'Keyboard',
        model: 'Logitech MX Keys',
        assignedDate: '2023-12-01',
        status: 'Assigned',
        serialNumber: 'LK2023004',
        icon: Keyboard
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Company Assets</h1>
            <p className="text-muted-foreground mt-2">
              View and manage your assigned company assets
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export List
            </Button>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Request Asset
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {assets.map((asset, i) => {
            const Icon = asset.icon
            return (
              <Card key={i}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{asset.type}</h3>
                      <p className="text-sm text-muted-foreground">{asset.model}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium">Serial Number</p>
                      <p className="text-sm text-muted-foreground">{asset.serialNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Assigned Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(asset.assignedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                      {asset.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
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
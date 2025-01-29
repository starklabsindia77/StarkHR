import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Settings,
  Plus,
  Search,
  Download,
  Edit,
  Power,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function FeatureManagementPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data - replace with API calls
  const features = [
    {
      id: 1,
      name: 'Employee Management',
      code: 'employee_management',
      description: 'Core employee management functionality including profiles, documents, and history',
      is_active: true,
      usage: 85,
      affected_orgs: 45,
      last_modified: '2024-03-10',
      modified_by: 'John Admin',
      plans: ['starter', 'professional', 'enterprise'],
      dependencies: ['user_management']
    },
    {
      id: 2,
      name: 'Advanced HR Analytics',
      code: 'advanced_analytics',
      description: 'Advanced reporting and analytics features for HR metrics',
      is_active: true,
      usage: 62,
      affected_orgs: 28,
      last_modified: '2024-03-09',
      modified_by: 'Sarah Admin',
      plans: ['professional', 'enterprise'],
      dependencies: ['employee_management', 'reporting']
    },
    {
      id: 3,
      name: 'Payroll Processing',
      code: 'payroll',
      description: 'Automated payroll processing and management',
      is_active: false,
      usage: 0,
      affected_orgs: 35,
      last_modified: '2024-03-08',
      modified_by: 'Mike Admin',
      plans: ['professional', 'enterprise'],
      dependencies: ['employee_management', 'billing']
    }
  ]

  const handleToggleFeature = (featureId: number, currentState: boolean) => {
    const feature = features.find(f => f.id === featureId)
    if (!feature) return

    // Show confirmation dialog for deactivation
    if (currentState) {
      toast({
        title: 'Confirm Feature Deactivation',
        description: `This will affect ${feature.affected_orgs} organizations. Are you sure?`,
        action: (
          <div className="flex gap-2 mt-2">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                // API call to deactivate feature
                toast({
                  title: 'Feature Deactivated',
                  description: `${feature.name} has been deactivated successfully.`
                })
              }}
            >
              Deactivate
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                toast({
                  title: 'Action Cancelled',
                  description: 'Feature deactivation was cancelled.'
                })
              }}
            >
              Cancel
            </Button>
          </div>
        )
      })
    } else {
      // Directly activate feature
      toast({
        title: 'Feature Activated',
        description: `${feature.name} has been activated successfully.`
      })
    }
  }

  const filteredFeatures = features.filter(feature =>
    feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Feature Management</h1>
        <p className="text-muted-foreground mt-2">
          Control and monitor platform features across all organizations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Features</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {features.filter(f => f.is_active).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of {features.length} total features
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Usage</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">
              Across active features
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Changes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              In the last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search features..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Feature
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredFeatures.map((feature) => (
          <Card key={feature.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{feature.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      feature.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {feature.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Code: {feature.code}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={feature.is_active ? "destructive" : "default"}
                    size="sm"
                    onClick={() => handleToggleFeature(feature.id, feature.is_active)}
                  >
                    <Power className="mr-2 h-4 w-4" />
                    {feature.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {feature.description}
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Usage Rate</span>
                    <span className="font-medium">{feature.usage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Affected Organizations</span>
                    <span className="font-medium">{feature.affected_orgs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Modified</span>
                    <span className="font-medium">
                      {new Date(feature.last_modified).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Modified By</span>
                    <span className="font-medium">{feature.modified_by}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Available In</span>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {feature.plans.map((plan) => (
                        <span
                          key={plan}
                          className="text-xs px-2 py-1 rounded-full bg-secondary"
                        >
                          {plan}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {feature.dependencies.length > 0 && (
                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Dependencies</p>
                  </div>
                  <div className="flex gap-2">
                    {feature.dependencies.map((dep) => (
                      <span
                        key={dep}
                        className="text-xs px-2 py-1 rounded-full bg-secondary"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
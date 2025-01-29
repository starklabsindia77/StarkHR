import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CreditCard, 
  DollarSign, 
  Users, 
  Building2, 
  Plus,
  Download,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Settings
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SubscriptionManagementPage() {
  const { toast } = useToast()
  const [selectedTab, setSelectedTab] = useState('plans')

  // Mock data - replace with API calls
  const plans = [
    {
      id: 1,
      name: 'Starter',
      code: 'starter',
      price_monthly: 29,
      price_yearly: 290,
      max_employees: 25,
      max_storage_gb: 10,
      active_organizations: 15,
      revenue: 435
    },
    {
      id: 2,
      name: 'Professional',
      code: 'professional',
      price_monthly: 99,
      price_yearly: 990,
      max_employees: 100,
      max_storage_gb: 50,
      active_organizations: 28,
      revenue: 2772
    },
    {
      id: 3,
      name: 'Enterprise',
      code: 'enterprise',
      price_monthly: 299,
      price_yearly: 2990,
      max_employees: null,
      max_storage_gb: 500,
      active_organizations: 8,
      revenue: 2392
    }
  ]

  const features = [
    {
      id: 1,
      name: 'Employee Management',
      code: 'employee_management',
      description: 'Basic employee management features',
      is_active: true,
      plans: ['starter', 'professional', 'enterprise']
    },
    {
      id: 2,
      name: 'Advanced HR',
      code: 'advanced_hr',
      description: 'Advanced HR features including performance management',
      is_active: true,
      plans: ['professional', 'enterprise']
    },
    {
      id: 3,
      name: 'Payroll Processing',
      code: 'payroll',
      description: 'Payroll processing and management',
      is_active: true,
      plans: ['professional', 'enterprise']
    }
  ]

  const organizations = [
    {
      id: 1,
      name: 'Tech Corp',
      plan: 'Professional',
      status: 'active',
      billing_cycle: 'monthly',
      next_billing: '2024-04-01',
      mrr: 99
    },
    {
      id: 2,
      name: 'Design Studio',
      plan: 'Starter',
      status: 'active',
      billing_cycle: 'yearly',
      next_billing: '2024-12-31',
      mrr: 24.17
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage subscription plans, features, and organization subscriptions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total MRR</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,599</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">51</div>
            <p className="text-xs text-muted-foreground">Across all plans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">Active platform users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex border-b space-x-8">
        <button
          className={`pb-4 text-sm font-medium ${
            selectedTab === 'plans'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground'
          }`}
          onClick={() => setSelectedTab('plans')}
        >
          Subscription Plans
        </button>
        <button
          className={`pb-4 text-sm font-medium ${
            selectedTab === 'features'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground'
          }`}
          onClick={() => setSelectedTab('features')}
        >
          Features
        </button>
        <button
          className={`pb-4 text-sm font-medium ${
            selectedTab === 'organizations'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground'
          }`}
          onClick={() => setSelectedTab('organizations')}
        >
          Organizations
        </button>
      </div>

      {selectedTab === 'plans' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Subscription Plans</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Plan
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {plans.map((plan) => (
              <Card key={plan.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">Code: {plan.code}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Monthly Price</span>
                        <span className="font-medium">${plan.price_monthly}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Yearly Price</span>
                        <span className="font-medium">${plan.price_yearly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Max Employees</span>
                        <span className="font-medium">
                          {plan.max_employees ?? 'Unlimited'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Active Organizations</span>
                        <span className="font-medium">{plan.active_organizations}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                        <span className="font-medium">${plan.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Storage Limit</span>
                        <span className="font-medium">{plan.max_storage_gb} GB</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'features' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Features</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Feature
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {features.map((feature) => (
              <Card key={feature.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{feature.name}</h3>
                        {feature.is_active ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Code: {feature.code}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {feature.description}
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Available in Plans:</p>
                    <div className="flex gap-2">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'organizations' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Organization Subscriptions</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {organizations.map((org) => (
              <Card key={org.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">{org.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          Plan: {org.plan}
                        </span>
                        •
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          org.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {org.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Billing Cycle</span>
                        <span className="font-medium capitalize">{org.billing_cycle}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Next Billing</span>
                        <span className="font-medium">
                          {new Date(org.next_billing).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">MRR</span>
                        <span className="font-medium">${org.mrr}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <span className="font-medium capitalize">{org.status}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
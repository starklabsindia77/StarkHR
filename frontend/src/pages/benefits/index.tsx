import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  HeartHandshake, 
  Shield, 
  Stethoscope, 
  Umbrella,
  Users,
  Plus,
  Filter,
  Download,
  DollarSign,
  Building2
} from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

export default function BenefitsPage() {
  const { user } = useAuth()

  const renderTenantAdminView = () => {
    const departmentBenefits = [
      {
        department: "Engineering",
        employees: 45,
        enrolledHealth: 42,
        enrolledLife: 40,
        enrolledDental: 38,
        totalCost: 225000,
        pendingClaims: 5
      },
      {
        department: "Marketing",
        employees: 28,
        enrolledHealth: 26,
        enrolledLife: 25,
        enrolledDental: 24,
        totalCost: 140000,
        pendingClaims: 3
      },
      {
        department: "HR",
        employees: 12,
        enrolledHealth: 12,
        enrolledLife: 11,
        enrolledDental: 10,
        totalCost: 60000,
        pendingClaims: 1
      }
    ]

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Benefits Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track organization-wide benefits
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
              Add Plan
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrolled</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">80</div>
              <p className="text-xs text-muted-foreground">94% of employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$425,000</div>
              <p className="text-xs text-muted-foreground">+5% from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Claims</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9</div>
              <p className="text-xs text-muted-foreground">Pending resolution</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">With active benefits</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Department Benefits Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentBenefits.map((dept, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{dept.department}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {dept.employees} employees
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Annual Cost</p>
                        <p className="text-sm text-muted-foreground">${dept.totalCost.toLocaleString()}</p>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Health</p>
                      </div>
                      <p className="font-semibold">{dept.enrolledHealth} enrolled</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Life</p>
                      </div>
                      <p className="font-semibold">{dept.enrolledLife} enrolled</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <HeartHandshake className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Dental</p>
                      </div>
                      <p className="font-semibold">{dept.enrolledDental} enrolled</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Umbrella className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Claims</p>
                      </div>
                      <p className="font-semibold">{dept.pendingClaims} pending</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Manage Plans</Button>
                    <Button variant="outline" size="sm">View Claims</Button>
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
    const benefits = {
      health: {
        title: 'Health Insurance',
        coverage: '$500,000',
        status: 'Active',
        renewalDate: '2025-01-01',
        details: [
          'Individual coverage: $300,000',
          'Family coverage: $200,000',
          'Dental & Vision included',
          'Annual health checkup'
        ]
      },
      life: {
        title: 'Life Insurance',
        coverage: '$1,000,000',
        status: 'Active',
        renewalDate: '2025-01-01',
        details: [
          'Term life coverage',
          'Accidental death benefit',
          'Disability coverage',
          'Critical illness benefit'
        ]
      },
      additional: [
        {
          title: 'Wellness Program',
          description: 'Gym membership, health coaching',
          status: 'Available'
        },
        {
          title: 'Employee Assistance',
          description: 'Counseling and support services',
          status: 'Available'
        },
        {
          title: 'Retirement Plan',
          description: '401(k) with company matching',
          status: 'Enrolled'
        }
      ]
    }

    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Benefits</h1>
            <p className="text-muted-foreground mt-2">
              View and manage your employee benefits
            </p>
          </div>
          <Button>
            <HeartHandshake className="mr-2 h-4 w-4" />
            Enroll in Benefits
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Health Insurance
              </CardTitle>
              <span className="text-sm px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Coverage Amount</p>
                  <p className="text-2xl font-bold">{benefits.health.coverage}</p>
                </div>
                <div className="space-y-2">
                  {benefits.health.details.map((detail, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      • {detail}
                    </p>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Renewal Date: {new Date(benefits.health.renewalDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Life Insurance
              </CardTitle>
              <span className="text-sm px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Coverage Amount</p>
                  <p className="text-2xl font-bold">{benefits.life.coverage}</p>
                </div>
                <div className="space-y-2">
                  {benefits.life.details.map((detail, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      • {detail}
                    </p>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Renewal Date: {new Date(benefits.life.renewalDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Umbrella className="h-5 w-5" />
              Additional Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {benefits.additional.map((benefit, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{benefit.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                  <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                    benefit.status === 'Enrolled'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {benefit.status}
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Download, FileText, CreditCard, Users, ArrowUpDown } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"
import { PayoutPieChart } from "@/components/payroll/PayoutPieChart"

export default function PayrollPage() {
  const { user } = useAuth()

  const getStats = () => {
    switch (user?.role) {
      case 'tenant_admin':
        return {
          total: { amount: 45250, period: "For current period" },
          employees: { count: 48, status: "Active employees" },
          pending: { count: 3, status: "To be processed" }
        }
      case 'tenant_user':
        return {
          total: { amount: 15800, period: "Team payroll" },
          employees: { count: 12, status: "Team members" },
          pending: { count: 2, status: "Pending approval" }
        }
      default:
        return {
          total: { amount: 3500, period: "Monthly salary" },
          deductions: { amount: 650, details: "Tax and benefits" },
          net: { amount: 2850, status: "To be paid" }
        }
    }
  }

  const stats = getStats()

  if (!['tenant_admin', 'tenant_user', 'tenant_employee'].includes(user?.role || '')) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p className="text-muted-foreground">You don't have access to this page.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payroll</h1>
          <p className="text-muted-foreground mt-2">
            {user?.role === 'tenant_admin'
              ? 'Manage organization payroll'
              : user?.role === 'tenant_user'
              ? 'Manage team payroll'
              : 'View your payroll information'}
          </p>
        </div>
        {user?.role === 'tenant_admin' ? (
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Payslips
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Payroll
            </Button>
            <Button>
              <DollarSign className="mr-2 h-4 w-4" />
              Process Payroll
            </Button>
          </div>
        ) : (
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Payslip
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {user?.role === 'tenant_employee' ? 'Gross Salary' : 'Total Payroll'}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.total.amount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{stats.total.period}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {user?.role === 'tenant_employee' ? 'Deductions' : 'Employees'}
            </CardTitle>
            {user?.role === 'tenant_employee' ? (
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Users className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            {user?.role === 'tenant_employee' ? (
              <>
                <div className="text-2xl font-bold">${stats.deductions?.amount}</div>
                <p className="text-xs text-muted-foreground">{stats.deductions?.details}</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.employees.count}</div>
                <p className="text-xs text-muted-foreground">{stats.employees.status}</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {user?.role === 'tenant_employee' ? 'Net Salary' : 'Pending'}
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {user?.role === 'tenant_employee' ? (
              <>
                <div className="text-2xl font-bold">${stats.net?.amount}</div>
                <p className="text-xs text-muted-foreground">{stats.net?.status}</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.pending.count}</div>
                <p className="text-xs text-muted-foreground">{stats.pending.status}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {user?.role === 'tenant_admin' && (
        <Card>
          <CardHeader>
            <CardTitle>Payroll Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PayoutPieChart grossPay={45250} deductions={6500} />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                <span className="text-sm">Gross Pay (87%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                <span className="text-sm">Deductions (13%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Payroll History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b">
                  <th className="h-12 px-4 text-left align-middle font-medium">Period</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                  {['tenant_admin', 'tenant_user'].includes(user?.role || '') && (
                    <th className="h-12 px-4 text-left align-middle font-medium">Employees</th>
                  )}
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                  {['tenant_admin', 'tenant_user'].includes(user?.role || '') && (
                    <th className="h-12 px-4 text-left align-middle font-medium">Processed By</th>
                  )}
                  <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 align-middle">December 2023</td>
                    <td className="p-4 align-middle">$45,250</td>
                    {['tenant_admin', 'tenant_user'].includes(user?.role || '') && (
                      <td className="p-4 align-middle">48</td>
                    )}
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Processed
                      </span>
                    </td>
                    <td className="p-4 align-middle">Dec 25, 2023</td>
                    {['tenant_admin', 'tenant_user'].includes(user?.role || '') && (
                      <td className="p-4 align-middle">John Smith</td>
                    )}
                    <td className="p-4 align-middle text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
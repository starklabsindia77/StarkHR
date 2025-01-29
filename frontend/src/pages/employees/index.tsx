import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmployeeList } from "@/components/employees/employee-list"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { getEmployees } from "@/lib/api/employees"
import { useToast } from "@/components/ui/use-toast"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await getEmployees()
        setEmployees(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch employees. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [toast])

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-muted-foreground mt-1">
            Manage your organization's employees
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="rounded-md border">
          <EmployeeList employees={employees} />
        </div>
      )}
    </div>
  )
}
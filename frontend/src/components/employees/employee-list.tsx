import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Employee } from "@/types/schema"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface EmployeeListProps {
  employees: (Employee & {
    departments: { name: string } | null
    positions: { title: string } | null
  })[]
}

export function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium">{employee.employee_id}</TableCell>
            <TableCell>
              {employee.personal_details.first_name} {employee.personal_details.last_name}
            </TableCell>
            <TableCell>{employee.departments?.name || '-'}</TableCell>
            <TableCell>{employee.positions?.title || '-'}</TableCell>
            <TableCell>
              <Badge variant={employee.employment_status === 'active' ? 'default' : 'secondary'}>
                {employee.employment_status}
              </Badge>
            </TableCell>
            <TableCell>
              {employee.start_date ? format(new Date(employee.start_date), 'PP') : '-'}
            </TableCell>
          </TableRow>
        ))}
        {employees.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-muted-foreground">
              No employees found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
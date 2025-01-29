import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Plus, Users, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DepartmentsPage() {
  const [open, setOpen] = useState(false)

  const departments = [
    {
      id: 1,
      name: "Engineering",
      code: "ENG",
      manager: "John Smith",
      employeeCount: 45,
      subDepartments: 3
    },
    {
      id: 2,
      name: "Marketing",
      code: "MKT",
      manager: "Sarah Johnson",
      employeeCount: 28,
      subDepartments: 2
    },
    {
      id: 3,
      name: "Human Resources",
      code: "HR",
      manager: "Michael Brown",
      employeeCount: 12,
      subDepartments: 0
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="text-muted-foreground mt-2">
            Manage organization departments and structure
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>
                Create a new department in your organization
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Department Name</Label>
                  <Input id="name" placeholder="Enter department name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Department Code</Label>
                  <Input id="code" placeholder="Enter department code" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="parent">Parent Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (Top Level)</SelectItem>
                      <SelectItem value="eng">Engineering</SelectItem>
                      <SelectItem value="mkt">Marketing</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="manager">Department Manager</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="michael">Michael Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Department</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {departments.map((dept) => (
          <Card key={dept.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{dept.name}</h3>
                    <span className="text-sm text-muted-foreground">({dept.code})</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Manager: {dept.manager}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{dept.employeeCount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Employees</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{dept.subDepartments}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Sub-departments</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  Users,
  Search,
  Plus,
  Check,
  X,
  AlertTriangle,
  Lock,
  Eye,
  Edit,
  Save
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ROLE_PERMISSIONS, UserRole, Permission } from '@/lib/constants/roles'
import { useToast } from "@/components/ui/use-toast"

interface Employee {
  id: string
  name: string
  email: string
  role: string
  department: string
}

interface EditPermissionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: Employee
  onSave: (employeeId: string, permissions: Permission[]) => void
}

function EditPermissionsDialog({ open, onOpenChange, employee, onSave }: EditPermissionsDialogProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    ROLE_PERMISSIONS[employee.role as keyof typeof ROLE_PERMISSIONS]?.permissions || []
  )
  const [isEditing, setIsEditing] = useState(false)
  const allPermissions = Object.values(ROLE_PERMISSIONS)
    .flatMap(role => role.permissions)
    .filter((value, index, self) => self.indexOf(value) === index)

  const handleTogglePermission = (permission: Permission) => {
    setSelectedPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    )
  }

  const handleSave = () => {
    onSave(employee.id, selectedPermissions)
    setIsEditing(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Access Permissions</DialogTitle>
          <DialogDescription>
            Customize access permissions for {employee.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">
                {employee.email} • {employee.department}
              </p>
            </div>
            <div className="ml-auto">
              <Button 
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Permissions
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold">Permissions</h4>
              </div>
              {isEditing && (
                <p className="text-sm text-muted-foreground">
                  Click permissions to toggle them
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {allPermissions.map((permission, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 p-2 rounded-lg border ${
                    isEditing ? 'cursor-pointer hover:border-primary' : ''
                  } ${
                    selectedPermissions.includes(permission) 
                      ? 'bg-primary/5 border-primary'
                      : 'bg-card'
                  }`}
                  onClick={() => isEditing && handleTogglePermission(permission)}
                >
                  {selectedPermissions.includes(permission) ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm">{permission}</span>
                </div>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="flex items-center gap-2 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-sm">
                Changes to permissions will take effect immediately. Please review carefully.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {isEditing && (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function AccessManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const { toast } = useToast()

  // Mock employee data
  const employees: Employee[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'tenant_manager',
      department: 'Engineering'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'tenant_user',
      department: 'Marketing'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'tenant_employee',
      department: 'HR'
    }
  ]

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleRoleChange = (employeeId: string, currentRole: string, newRole: string) => {
    console.log(`Changing role for employee ${employeeId} from ${currentRole} to ${newRole}`)
    toast({
      title: "Role updated",
      description: "The employee's role has been successfully updated.",
    })
  }

  const handleViewPermissions = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowViewDialog(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Access Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage employee roles and permissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {employee.email} • {employee.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Select 
                    defaultValue={employee.role}
                    onValueChange={(value) => handleRoleChange(employee.id, employee.role, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ROLE_PERMISSIONS).map(([role, details]) => (
                        <SelectItem key={role} value={role}>
                          {details.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewPermissions(employee)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedEmployee(employee)
                        setShowEditDialog(true)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedEmployee && (
        <EditPermissionsDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          employee={selectedEmployee}
          onSave={(employeeId, permissions) => {
            console.log(`Updating permissions for employee ${employeeId}:`, permissions)
            toast({
              title: "Permissions updated",
              description: "The employee's permissions have been successfully updated.",
            })
            setShowEditDialog(false)
          }}
        />
      )}
    </div>
  )
}
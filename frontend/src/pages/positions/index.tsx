import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Plus, Building2, DollarSign } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PositionsPage() {
  const [open, setOpen] = useState(false)

  const positions = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      gradeLevel: "L5",
      openings: 3,
      filled: 12
    },
    {
      id: 2,
      title: "Marketing Manager",
      department: "Marketing",
      gradeLevel: "L4",
      openings: 1,
      filled: 4
    },
    {
      id: 3,
      title: "HR Specialist",
      department: "Human Resources",
      gradeLevel: "L3",
      openings: 2,
      filled: 3
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Positions</h1>
          <p className="text-muted-foreground mt-2">
            Manage job positions and roles
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Position
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Position</DialogTitle>
              <DialogDescription>
                Create a new job position in your organization
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Position Title</Label>
                  <Input id="title" placeholder="Enter position title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eng">Engineering</SelectItem>
                      <SelectItem value="mkt">Marketing</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="l1">L1</SelectItem>
                      <SelectItem value="l2">L2</SelectItem>
                      <SelectItem value="l3">L3</SelectItem>
                      <SelectItem value="l4">L4</SelectItem>
                      <SelectItem value="l5">L5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="openings">Number of Openings</Label>
                  <Input 
                    id="openings" 
                    type="number" 
                    placeholder="Enter number of openings" 
                    min="0"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Position</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {positions.map((position) => (
          <Card key={position.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{position.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    {position.department}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="font-medium">{position.gradeLevel}</span>
                    <p className="text-sm text-muted-foreground">Grade Level</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{position.openings}</span>
                      <span className="text-sm text-muted-foreground">open</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {position.filled} filled
                    </p>
                  </div>
                </div>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
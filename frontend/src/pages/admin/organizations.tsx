import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Building2, Plus, Users, CreditCard } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function OrganizationsPage() {
  const [open, setOpen] = useState(false)

  const organizations = [
    {
      id: 'c0d1c0d1-c0d1-c0d1-c0d1-c0d1c0d1c0d1',
      name: 'Demo Company',
      slug: 'demo-company',
      users: 3,
      subscription: {
        tier: 'Professional',
        status: 'Active',
        endsAt: '2025-01-01'
      }
    },
    {
      id: 'c0d2c0d2-c0d2-c0d2-c0d2-c0d2c0d2c0d2',
      name: 'Tech Corp',
      slug: 'tech-corp',
      users: 25,
      subscription: {
        tier: 'Enterprise',
        status: 'Active',
        endsAt: '2025-06-01'
      }
    }
  ]

  const handleAddOrganization = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Add organization logic here
    setOpen(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Organizations</h1>
          <p className="text-muted-foreground mt-2">
            Manage all organizations in the system
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Organization
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Organization</DialogTitle>
              <DialogDescription>
                Create a new organization in the system
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddOrganization}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input id="name" placeholder="Enter organization name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" placeholder="organization-slug" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subscription">Subscription Tier</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue placeholder="Select subscription tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Organization</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {organizations.map((org) => (
          <Card key={org.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  <CardTitle>{org.name}</CardTitle>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <div className="text-sm font-medium">Organization ID</div>
                  <div className="text-sm text-muted-foreground">{org.id}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{org.users}</div>
                      <p className="text-xs text-muted-foreground">Active users</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Subscription</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{org.subscription.tier}</div>
                      <p className="text-xs text-muted-foreground">{org.subscription.status}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Renewal</CardTitle>
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {new Date(org.subscription.endsAt).toLocaleDateString('en-US', { 
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground">Next renewal</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
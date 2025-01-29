import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Lock, User, Building } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

export default function SettingsPage() {
  const { user } = useAuth()

  // Only super_admin and tenant_admin can modify organization settings
  const canManageOrganization = ['super_admin', 'tenant_admin'].includes(user?.role || '')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                type="email" 
                placeholder="your@email.com" 
                value={user?.email || ''}
                disabled
              />
              <p className="text-sm text-muted-foreground">
                Email cannot be changed. Contact support if you need to update it.
              </p>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Name</label>
              <Input 
                placeholder="Your name" 
                defaultValue={`${user?.first_name || ''} ${user?.last_name || ''}`}
              />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications in the browser
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>
              Manage your security preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Two-Factor Authentication
              </Button>
            </div>
          </CardContent>
        </Card>

        {canManageOrganization && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                <CardTitle>Organization</CardTitle>
              </div>
              <CardDescription>
                Update your organization settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Organization Name</label>
                  <Input placeholder="Your organization name" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Organization ID</label>
                  <Input 
                    value={user?.organization_id || 'N/A'} 
                    disabled 
                  />
                  <p className="text-sm text-muted-foreground">
                    This is your unique organization identifier
                  </p>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Subscription Tier</label>
                  <Input 
                    value={user?.role === 'super_admin' ? 'Enterprise' : 'Professional'} 
                    disabled 
                  />
                </div>
                <Button>Update Organization</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!canManageOrganization && user?.organization_id && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                <CardTitle>Organization</CardTitle>
              </div>
              <CardDescription>
                Your organization information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Organization ID</label>
                  <Input 
                    value={user.organization_id} 
                    disabled 
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Contact your organization administrator to update organization settings
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAuth } from "@/lib/auth/auth-context"

export default function CalendarPage() {
  const { user } = useAuth()

  const getEvents = () => {
    switch (user?.role) {
      case 'super_admin':
        return [
          { title: "System Maintenance", date: "Today, 2:00 PM", type: "maintenance" },
          { title: "New Feature Release", date: "Tomorrow, 10:00 AM", type: "release" },
          { title: "Platform Review", date: "Feb 15, 3:00 PM", type: "review" }
        ]
      case 'tenant_admin':
        return [
          { title: "Department Meeting", date: "Today, 2:00 PM", type: "meeting" },
          { title: "Performance Reviews", date: "Tomorrow, 10:00 AM", type: "review" },
          { title: "Training Session", date: "Feb 15, 3:00 PM", type: "training" }
        ]
      case 'tenant_user':
        return [
          { title: "Team Meeting", date: "Today, 2:00 PM", type: "meeting" },
          { title: "Project Review", date: "Tomorrow, 10:00 AM", type: "review" },
          { title: "Employee Onboarding", date: "Feb 15, 3:00 PM", type: "onboarding" }
        ]
      default:
        return [
          { title: "Team Meeting", date: "Today, 2:00 PM", type: "meeting" },
          { title: "Training Session", date: "Tomorrow, 10:00 AM", type: "training" },
          { title: "Performance Review", date: "Feb 15, 3:00 PM", type: "review" }
        ]
    }
  }

  const events = getEvents()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground mt-2">
            {user?.role === 'super_admin'
              ? 'System-wide events and maintenance schedule'
              : user?.role === 'tenant_admin'
              ? 'Organization events and schedules'
              : user?.role === 'tenant_user'
              ? 'Team events and employee schedules'
              : 'Your schedule and events'}
          </p>
        </div>
        {['super_admin', 'tenant_admin', 'tenant_user'].includes(user?.role || '') && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Upcoming Events</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {events.map((event, i) => (
                <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
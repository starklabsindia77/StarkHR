import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail, Clock } from "lucide-react"

export default function HelpPage() {
  const supportChannels = [
    {
      title: "Live Chat",
      description: "Chat with our support team",
      icon: MessageCircle,
      status: "Available",
      action: "Start Chat"
    },
    {
      title: "Phone Support",
      description: "Call our support line",
      icon: Phone,
      status: "Available 9 AM - 5 PM",
      action: "Call Now"
    },
    {
      title: "Email Support",
      description: "Send us an email",
      icon: Mail,
      status: "24/7 Support",
      action: "Send Email"
    }
  ]

  const recentTickets = [
    {
      id: "TKT-001",
      subject: "Password Reset Request",
      status: "Resolved",
      lastUpdate: "2024-03-10",
      priority: "High"
    },
    {
      id: "TKT-002",
      subject: "Benefits Enrollment Issue",
      status: "In Progress",
      lastUpdate: "2024-03-09",
      priority: "Medium"
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Help Desk</h1>
          <p className="text-muted-foreground mt-2">
            Get support and assistance for any issues
          </p>
        </div>
        <Button>
          <MessageCircle className="mr-2 h-4 w-4" />
          New Support Ticket
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {supportChannels.map((channel, i) => {
          const Icon = channel.icon
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{channel.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{channel.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {channel.status}
                  </span>
                  <Button variant="outline" size="sm">{channel.action}</Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{ticket.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ticket.priority === 'High' 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="font-medium mt-1">{ticket.subject}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Last updated: {new Date(ticket.lastUpdate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm px-2.5 py-0.5 rounded-full ${
                    ticket.status === 'Resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {ticket.status}
                  </span>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
import { 
  Building2, 
  Users, 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Calendar,
  Clock,
  DollarSign,
  User,
  Boxes,
  LineChart,
  GraduationCap,
  Database,
  Shield,
  Wallet,
  Receipt,
  BadgeHelp,
  BookOpen,
  Briefcase,
  Award,
  HeartHandshake,
  Laptop,
  HelpCircle,
  Lock,
  CreditCard,
  ToggleLeft,
  Building
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth/auth-context"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const location = useLocation()
  const { user } = useAuth()
  const role = user?.role || 'tenant_employee'

  const isActive = (path: string) => location.pathname.startsWith(path)

  // Define menu sections based on role
  const getMenuSections = () => {
    switch (role) {
      case 'super_admin':
        return [
          {
            title: "Platform",
            items: [
              {
                title: "Organizations",
                icon: Building2,
                href: "/admin/organizations",
                show: true
              },
              {
                title: "Analytics",
                icon: LineChart,
                href: "/admin/analytics",
                show: true
              }
            ]
          },
          {
            title: "Subscription",
            items: [
              {
                title: "Plans & Billing",
                icon: CreditCard,
                href: "/admin/subscription",
                show: true
              },
              {
                title: "Features",
                icon: ToggleLeft,
                href: "/admin/features",
                show: true
              }
            ]
          },
          {
            title: "Administration",
            items: [
              {
                title: "System Settings",
                icon: Settings,
                href: "/admin/settings",
                show: true
              },
              {
                title: "Access Control",
                icon: Lock,
                href: "/admin/access",
                show: true
              },
              {
                title: "Audit Logs",
                icon: FileText,
                href: "/admin/audit",
                show: true
              }
            ]
          },
          {
            title: "Support",
            items: [
              {
                title: "Support Tickets",
                icon: HelpCircle,
                href: "/admin/support",
                show: true
              },
              {
                title: "Documentation",
                icon: BookOpen,
                href: "/admin/docs",
                show: true
              }
            ]
          }
        ]
      case 'tenant_admin':
        return [
          {
            title: "Overview",
            items: [
              {
                title: "Dashboard",
                icon: LayoutDashboard,
                href: "/dashboard/overview",
                show: true
              },
              {
                title: "Analytics",
                icon: LineChart,
                href: "/analytics",
                show: true
              },
              {
                title: "Subscription",
                icon: CreditCard,
                href: "/tenant/subscription",
                show: true
              }
            ]
          },
          {
            title: "Employee Management",
            items: [
              {
                title: "Employees",
                icon: Users,
                href: "/employees",
                show: true
              },
              {
                title: "Departments",
                icon: Building2,
                href: "/departments",
                show: true
              },
              {
                title: "Positions",
                icon: Briefcase,
                href: "/positions",
                show: true
              }
            ]
          },
          {
            title: "Time Management",
            items: [
              {
                title: "Attendance",
                icon: Clock,
                href: "/attendance",
                show: true
              },
              {
                title: "Leave Management",
                icon: Calendar,
                href: "/leave",
                show: true
              },
              {
                title: "Shift Schedule",
                icon: Calendar,
                href: "/schedule",
                show: true
              }
            ]
          },
          {
            title: "Payroll & Benefits",
            items: [
              {
                title: "Payroll",
                icon: DollarSign,
                href: "/payroll",
                show: true
              },
              {
                title: "Tax Documents",
                icon: Receipt,
                href: "/tax-documents",
                show: true
              },
              {
                title: "Benefits",
                icon: HeartHandshake,
                href: "/benefits",
                show: true
              }
            ]
          },
          {
            title: "Resources",
            items: [
              {
                title: "Assets",
                icon: Laptop,
                href: "/assets",
                show: true
              },
              {
                title: "Documents",
                icon: FileText,
                href: "/documents",
                show: true
              },
              {
                title: "Training",
                icon: GraduationCap,
                href: "/training",
                show: true
              }
            ]
          },
          {
            title: "Performance",
            items: [
              {
                title: "Goals & KPIs",
                icon: Award,
                href: "/goals",
                show: true
              },
              {
                title: "Reviews",
                icon: Briefcase,
                href: "/reviews",
                show: true
              }
            ]
          },
          {
            title: "Administration",
            items: [
              {
                title: "Access Management",
                icon: Lock,
                href: "/settings/access-management",
                show: true
              },
              {
                title: "Settings",
                icon: Settings,
                href: "/settings",
                show: true
              }
            ]
          },
          {
            title: "Support",
            items: [
              {
                title: "Help Desk",
                icon: HelpCircle,
                href: "/help",
                show: true
              },
              {
                title: "Knowledge Base",
                icon: BookOpen,
                href: "/knowledge-base",
                show: true
              },
              {
                title: "FAQs",
                icon: BadgeHelp,
                href: "/faqs",
                show: true
              }
            ]
          }
        ]
      case 'tenant_user':
        return [
          {
            title: "Overview",
            items: [
              {
                title: "Dashboard",
                icon: LayoutDashboard,
                href: "/dashboard/overview",
                show: true
              }
            ]
          },
          {
            title: "Employee Management",
            items: [
              {
                title: "Employees",
                icon: Users,
                href: "/employees",
                show: true
              },
              {
                title: "Departments",
                icon: Building2,
                href: "/departments",
                show: true
              }
            ]
          },
          {
            title: "Time Management",
            items: [
              {
                title: "Attendance",
                icon: Clock,
                href: "/attendance",
                show: true
              },
              {
                title: "Leave Requests",
                icon: Calendar,
                href: "/leave",
                show: true
              }
            ]
          },
          {
            title: "Resources",
            items: [
              {
                title: "Documents",
                icon: FileText,
                href: "/documents",
                show: true
              },
              {
                title: "Training",
                icon: GraduationCap,
                href: "/training",
                show: true
              }
            ]
          },
          {
            title: "Support",
            items: [
              {
                title: "Help",
                icon: HelpCircle,
                href: "/help",
                show: true
              },
              {
                title: "FAQs",
                icon: BadgeHelp,
                href: "/faqs",
                show: true
              }
            ]
          }
        ]
      default: // tenant_employee
        return [
          {
            title: "Overview",
            items: [
              {
                title: "Dashboard",
                icon: LayoutDashboard,
                href: "/dashboard/overview",
                show: true
              },
              {
                title: "Profile",
                icon: User,
                href: "/profile",
                show: true
              }
            ]
          },
          {
            title: "Time & Attendance",
            items: [
              {
                title: "Attendance",
                icon: Clock,
                href: "/attendance",
                show: true
              },
              {
                title: "Leave Management",
                icon: Calendar,
                href: "/leave",
                show: true
              },
              {
                title: "Schedule",
                icon: Calendar,
                href: "/schedule",
                show: true
              }
            ]
          },
          {
            title: "Payroll & Benefits",
            items: [
              {
                title: "Payroll",
                icon: DollarSign,
                href: "/payroll",
                show: true
              },
              {
                title: "Tax Documents",
                icon: Receipt,
                href: "/tax-documents",
                show: true
              },
              {
                title: "Benefits",
                icon: HeartHandshake,
                href: "/benefits",
                show: true
              }
            ]
          },
          {
            title: "Development",
            items: [
              {
                title: "Training",
                icon: GraduationCap,
                href: "/training",
                show: true
              },
              {
                title: "Goals",
                icon: Award,
                href: "/goals",
                show: true
              },
              {
                title: "Reviews",
                icon: Briefcase,
                href: "/reviews",
                show: true
              }
            ]
          },
          {
            title: "Resources",
            items: [
              {
                title: "Documents",
                icon: FileText,
                href: "/documents",
                show: true
              },
              {
                title: "Knowledge Base",
                icon: BookOpen,
                href: "/knowledge-base",
                show: true
              },
              {
                title: "Help",
                icon: HelpCircle,
                href: "/help",
                show: true
              }
            ]
          }
        ]
    }
  }

  const sections = getMenuSections()

  return (
    <div className="flex flex-col gap-6 p-4">
      {sections?.map((section, index) => (
        <div key={index}>
          <h4 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
            {section.title}
          </h4>
          <div className="space-y-1">
            {section.items
              .filter(item => item.show)
              .map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-2",
                        isActive(item.href) && "bg-secondary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Button>
                  </Link>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
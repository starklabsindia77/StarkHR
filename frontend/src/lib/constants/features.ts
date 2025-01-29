import { 
  Users, Building2, DollarSign, CalendarDays, FileText,
  Clock, Shield, Settings, LineChart, Boxes, Server,
  UserPlus, Briefcase, GraduationCap, Database
} from "lucide-react"

export const roleBasedFeatures = {
  super_admin: {
    title: "System Administration",
    description: "Manage the entire platform and organizations",
    features: {
      organization_management: {
        icon: Building2,
        title: "Organization Management",
        subFeatures: [
          "Create and manage organizations",
          "Configure subscription plans",
          "Monitor organization usage",
          "Manage billing and invoicing"
        ]
      },
      system_administration: {
        icon: Settings,
        title: "System Configuration",
        subFeatures: [
          "Global system settings",
          "Feature toggles",
          "Email templates",
          "Integration settings"
        ]
      },
      platform_analytics: {
        icon: LineChart,
        title: "Platform Analytics",
        subFeatures: [
          "Usage statistics",
          "Revenue analytics",
          "User engagement metrics",
          "System performance monitoring"
        ]
      }
    }
  },

  tenant_admin: {
    title: "Organization Administration",
    description: "Manage your organization's HR operations",
    features: {
      employee_management: {
        icon: Users,
        title: "Employee Management",
        subFeatures: [
          "Employee onboarding",
          "Department management",
          "Role assignments",
          "Performance reviews"
        ]
      },
      payroll: {
        icon: DollarSign,
        title: "Payroll Management",
        subFeatures: [
          "Salary processing",
          "Tax management",
          "Benefits administration",
          "Payroll reporting"
        ]
      },
      resource_management: {
        icon: Boxes,
        title: "Resource Management",
        subFeatures: [
          "Asset tracking",
          "Resource allocation",
          "Inventory management",
          "Maintenance scheduling"
        ]
      }
    }
  },

  tenant_user: {
    title: "HR Management",
    description: "Handle day-to-day HR operations",
    features: {
      employee_records: {
        icon: Database,
        title: "Employee Records",
        subFeatures: [
          "View employee profiles",
          "Update employee information",
          "Document management",
          "Employee history"
        ]
      },
      attendance: {
        icon: Clock,
        title: "Attendance Management",
        subFeatures: [
          "Track attendance",
          "Manage leave requests",
          "Overtime tracking",
          "Shift management"
        ]
      },
      training: {
        icon: GraduationCap,
        title: "Training & Development",
        subFeatures: [
          "Training programs",
          "Skill assessments",
          "Certification tracking",
          "Learning management"
        ]
      }
    }
  },

  tenant_employee: {
    title: "Employee Self-Service",
    description: "Manage your personal information and requests",
    features: {
      profile: {
        icon: UserPlus,
        title: "Profile Management",
        subFeatures: [
          "Update personal info",
          "View payslips",
          "Tax documents",
          "Benefits enrollment"
        ]
      },
      attendance_leave: {
        icon: CalendarDays,
        title: "Attendance & Leave",
        subFeatures: [
          "View attendance",
          "Apply for leave",
          "Check leave balance",
          "View schedule"
        ]
      },
      documents: {
        icon: FileText,
        title: "Documents & Requests",
        subFeatures: [
          "Submit documents",
          "View company policies",
          "Raise requests",
          "Track applications"
        ]
      }
    }
  }
}

export type UserRoleFeatures = keyof typeof roleBasedFeatures
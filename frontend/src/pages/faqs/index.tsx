import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function FAQsPage() {
  const faqs = {
    "General": [
      {
        question: "How do I update my personal information?",
        answer: "You can update your personal information by navigating to the Profile section in your dashboard. Click on 'Edit Profile' to make changes to your details."
      },
      {
        question: "What should I do if I forget my password?",
        answer: "Click on the 'Forgot Password' link on the login page. Enter your email address, and you'll receive instructions to reset your password."
      }
    ],
    "Leave & Attendance": [
      {
        question: "How do I apply for leave?",
        answer: "Go to the Leave Management section, click on 'Request Leave', fill out the leave request form with dates and reason, and submit for approval."
      },
      {
        question: "How is my attendance tracked?",
        answer: "Your attendance is automatically tracked when you log in to the system. You can view your attendance records in the Attendance section."
      }
    ],
    "Payroll & Benefits": [
      {
        question: "When are salaries processed?",
        answer: "Salaries are typically processed on the 25th of each month and credited by the last working day of the month."
      },
      {
        question: "How can I view my payslips?",
        answer: "You can access your payslips in the Payroll section. Click on 'View Payslips' to download current and previous month's payslips."
      }
    ]
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mt-2">
          Find quick answers to common questions
        </p>
      </div>

      <div className="relative">
        <Input 
          placeholder="Search FAQs..."
          className="w-full h-12 pl-12"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="space-y-6">
        {Object.entries(faqs).map(([category, questions]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {questions.map((faq, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="font-medium">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground">
              If you cannot find answer to your question in our FAQ, you can always contact us. We will answer to you shortly!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
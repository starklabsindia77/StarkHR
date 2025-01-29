import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Starter",
    price: 29,
    features: [
      "Up to 25 employees",
      "Basic HR features",
      "Email support",
      "1 admin user"
    ]
  },
  {
    name: "Professional",
    price: 99,
    popular: true,
    features: [
      "Up to 100 employees",
      "Advanced HR features",
      "Priority support",
      "5 admin users",
      "Custom reports",
      "API access"
    ]
  },
  {
    name: "Enterprise",
    price: 299,
    features: [
      "Unlimited employees",
      "Full feature access",
      "24/7 support",
      "Unlimited admin users",
      "Custom integrations",
      "Dedicated account manager"
    ]
  }
]

interface PlanSelectorProps {
  selectedPlan?: string;
  onPlanSelect: (plan: string) => void;
}

export function PlanSelector({ selectedPlan, onPlanSelect }: PlanSelectorProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.name}
          className={`relative ${
            plan.popular ? 'border-primary shadow-lg' : ''
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
          )}
          <CardHeader>
            <CardTitle className="flex justify-between items-baseline">
              <span>{plan.name}</span>
              <span className="text-2xl font-bold">${plan.price}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={selectedPlan === plan.name ? "default" : "outline"}
              className="w-full"
              onClick={() => onPlanSelect(plan.name)}
            >
              {selectedPlan === plan.name ? "Selected" : "Select Plan"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
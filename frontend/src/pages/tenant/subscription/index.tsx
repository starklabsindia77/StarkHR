import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CreditCard, 
  Check, 
  X,
  DollarSign,
  Users,
  Building2,
  HardDrive,
  Shield,
  AlertTriangle
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock exchange rates - in production, fetch from an API
const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 82.94,
  AUD: 1.53,
  CAD: 1.35,
  SGD: 1.34,
  AED: 3.67
}

// Mock location detection - in production, use geolocation or IP-based detection
const detectUserLocation = () => {
  return {
    country: 'India',
    currency: 'INR',
    region: 'Asia'
  }
}

interface Plan {
  id: string
  name: string
  description: string
  pricePerEmployee: number // Price per employee per month in USD
  features: string[]
  minimumEmployees: number
  popular?: boolean
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams getting started',
    pricePerEmployee: 8,
    minimumEmployees: 5,
    features: [
      'Basic employee management',
      'Attendance tracking',
      'Basic reporting',
      'Email support',
      'Mobile app access',
      '5 GB storage per employee',
      'Basic HR tools'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for growing organizations',
    pricePerEmployee: 15,
    minimumEmployees: 10,
    features: [
      'Everything in Starter, plus:',
      'Advanced HR features',
      'Performance management',
      'Custom workflows',
      'Priority support',
      'API access',
      'Advanced analytics',
      '15 GB storage per employee',
      'Training management'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large enterprises with custom needs',
    pricePerEmployee: 25,
    minimumEmployees: 50,
    features: [
      'Everything in Professional, plus:',
      'Unlimited features',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantees',
      'Advanced security',
      'Custom reporting',
      'Audit logs',
      '50 GB storage per employee',
      'White-label options'
    ]
  }
]

// Regional pricing adjustments
const regionalPricing = {
  'North America': 1, // Base price
  'Europe': 0.95, // 5% discount
  'Asia': 0.7, // 30% discount
  'South America': 0.75, // 25% discount
  'Africa': 0.65, // 35% discount
  'Oceania': 0.9 // 10% discount
}

export default function SubscriptionPage() {
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState(detectUserLocation())
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [employeeCount, setEmployeeCount] = useState(10)

  // Get current subscription info - replace with API call
  const currentSubscription = {
    plan: 'starter',
    status: 'active',
    nextBilling: '2024-04-01',
    paymentMethod: {
      type: 'card',
      last4: '4242'
    }
  }

  const calculatePrice = (pricePerEmployee: number, employees: number) => {
    // Apply regional discount
    const regionalDiscount = regionalPricing[userLocation.region as keyof typeof regionalPricing] || 1
    const adjustedPrice = pricePerEmployee * regionalDiscount * employees

    // Convert to local currency
    const exchangeRate = exchangeRates[userLocation.currency as keyof typeof exchangeRates] || 1
    const localPrice = adjustedPrice * exchangeRate

    // Apply yearly discount if applicable
    const finalPrice = billingCycle === 'yearly' 
      ? localPrice * 10 // 2 months free
      : localPrice

    return {
      monthly: localPrice.toFixed(2),
      yearly: (localPrice * 10).toFixed(2),
      perEmployee: (localPrice / employees).toFixed(2),
      original: pricePerEmployee,
      discount: Math.round((1 - regionalDiscount) * 100)
    }
  }

  const handleUpgrade = (planId: string) => {
    toast({
      title: 'Confirm Subscription Change',
      description: `Are you sure you want to upgrade to the ${planId} plan?`,
      action: (
        <div className="flex gap-2 mt-2">
          <Button 
            onClick={() => {
              // API call to upgrade subscription
              toast({
                title: 'Subscription Updated',
                description: 'Your subscription has been successfully updated.'
              })
            }}
          >
            Confirm
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      )
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Subscription Plans</h1>
        <p className="text-muted-foreground mt-2">
          Choose the right plan for your organization
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium capitalize">{currentSubscription.plan} Plan</p>
              <p className="text-sm text-muted-foreground">
                Next billing on {new Date(currentSubscription.nextBilling).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground">
                  Card ending in {currentSubscription.paymentMethod.last4}
                </p>
              </div>
              <Button variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Update Payment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 mb-8">
        <div className="inline-flex items-center rounded-lg border p-1">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Save 17%
            </span>
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mb-8">
        <label className="text-sm font-medium">Number of Employees:</label>
        <input
          type="number"
          min="1"
          value={employeeCount}
          onChange={(e) => setEmployeeCount(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-24 px-3 py-2 border rounded-md"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const price = calculatePrice(plan.pricePerEmployee, employeeCount)
          const isMinimumMet = employeeCount >= plan.minimumEmployees
          return (
            <Card key={plan.id} className={`relative ${
              plan.popular ? 'border-primary shadow-lg' : ''
            }`}>
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
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {userLocation.currency} {billingCycle === 'monthly' ? price.monthly : price.yearly}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {userLocation.currency} {price.perEmployee} per employee/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </div>
                  </div>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                {price.discount > 0 && (
                  <div className="mt-2 text-sm">
                    <span className="text-green-600 font-medium">
                      {price.discount}% regional discount applied
                    </span>
                  </div>
                )}
                {!isMinimumMet && (
                  <div className="mt-2 text-sm text-yellow-600">
                    Minimum {plan.minimumEmployees} employees required
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full"
                  variant={currentSubscription.plan === plan.id ? "outline" : "default"}
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={currentSubscription.plan === plan.id || !isMinimumMet}
                >
                  {currentSubscription.plan === plan.id ? 'Current Plan' : 
                   !isMinimumMet ? `Minimum ${plan.minimumEmployees} employees required` : 'Upgrade'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enterprise Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Advanced Security</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                SSO, audit logs, and advanced security controls
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Dedicated Support</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                24/7 priority support with dedicated account manager
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Custom Integration</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Custom API integrations and workflow automation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border p-4 bg-yellow-50">
        <div className="flex gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <div className="flex-1">
            <h3 className="font-medium text-yellow-900">Important Note</h3>
            <p className="text-sm text-yellow-800 mt-1">
              Prices are shown in {userLocation.currency} for {userLocation.country}. 
              Regional pricing may vary. Annual subscriptions are billed upfront.
              Minimum employee requirements apply per plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
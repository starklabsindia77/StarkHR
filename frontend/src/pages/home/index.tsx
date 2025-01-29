import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { PublicLayout } from "@/components/layouts"
import { roleBasedFeatures } from "@/lib/constants/features"

export default function HomePage() {
  return (
    <PublicLayout>
      <div className="container py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Complete HR & Resource Management Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A comprehensive solution for organizations of all sizes
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            {/* <Link to="/login">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link> */}
          </div>
        </div>

        <div className="space-y-20">
          {Object.entries(roleBasedFeatures).map(([role, roleData]) => (
            <section key={role}>
              <h2 className="text-3xl font-bold text-center mb-4">{roleData.title}</h2>
              <p className="text-center text-muted-foreground mb-12">{roleData.description}</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(roleData.features).map(([key, feature]) => {
                  const Icon = feature.icon
                  return (
                    <Card key={key} className="relative overflow-hidden">
                      <CardHeader>
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {feature.subFeatures.map((subFeature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                              {subFeature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of organizations already using our platform
          </p>
          <Link to="/register">
            <Button size="lg">Start Your Free Trial</Button>
          </Link>
        </div>
      </div>
    </PublicLayout>
  )
}
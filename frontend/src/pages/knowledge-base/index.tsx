import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, FolderOpen, Star, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function KnowledgeBasePage() {
  const categories = [
    {
      title: "Getting Started",
      articles: 12,
      icon: BookOpen
    },
    {
      title: "HR Policies",
      articles: 25,
      icon: FolderOpen
    },
    {
      title: "Benefits & Perks",
      articles: 18,
      icon: Star
    }
  ]

  const popularArticles = [
    {
      title: "How to Request Time Off",
      views: 1250,
      lastUpdated: "2024-03-01"
    },
    {
      title: "Understanding Your Benefits Package",
      views: 980,
      lastUpdated: "2024-02-28"
    },
    {
      title: "Employee Handbook Overview",
      views: 856,
      lastUpdated: "2024-02-25"
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Knowledge Base</h1>
        <p className="text-muted-foreground mt-2">
          Find answers to common questions and learn about company policies
        </p>
      </div>

      <div className="relative">
        <Input 
          placeholder="Search knowledge base..."
          className="w-full h-12 pl-12"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category, i) => {
          const Icon = category.icon
          return (
            <Card key={i} className="hover:border-primary cursor-pointer transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{category.title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {category.articles} articles
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularArticles.map((article, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors">
                <div>
                  <h3 className="font-medium">{article.title}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm text-muted-foreground">
                      {article.views} views
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Updated {new Date(article.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Read More</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you with any questions
            </p>
            <Button>Contact Support</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
import { useState } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { MainNav } from '@/components/layout/main-nav'
import { UserNav } from '@/components/layout/user-nav'
import { ProtectedRoute } from '@/components/layout/protected-route'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Bell, Menu, Search, Sun, Moon, ChevronLeft } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme, setTheme } = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-4">
            <Button
              variant="ghost"
              size="icon"
              className="mr-4 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Logo */}
            <div className="mr-4 hidden lg:flex">
              <strong className="text-xl">HR Platform</strong>
            </div>

            {/* Search */}
            <div className="flex-1 md:ml-auto md:max-w-sm">
              <form className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8"
                />
              </form>
            </div>

            {/* Right side items */}
            <div className="ml-auto flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hidden md:flex"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
              </Button>
              
              <UserNav />
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside 
            className={cn(
              "fixed inset-y-0 left-0 z-40 mt-16 flex w-64 flex-col border-r bg-background transition-transform lg:translate-x-0 lg:border-r",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="flex flex-1 flex-col overflow-y-auto">
              <MainNav />
            </div>
            <div className="border-t p-4">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => setSidebarOpen(false)}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Collapse
              </Button>
            </div>
          </aside>

          {/* Backdrop for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className={cn(
            "flex-1 px-4 md:px-8 py-8 transition-all duration-300",
            sidebarOpen ? "lg:ml-64" : "lg:ml-0"
          )}>
            {children}
          </main>
        </div>

        {/* Footer */}
        <footer className={cn(
          "border-t py-4 px-6 transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}>
          <div className="text-center text-sm text-muted-foreground">
            © {currentYear} HR Platform. All rights reserved.
          </div>
        </footer>
      </div>
      <Toaster />
    </ProtectedRoute>
  )
}
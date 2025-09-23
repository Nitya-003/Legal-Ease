"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Brain,
  Menu,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Zap,
  Shield,
  Bell,
} from "lucide-react"

export function NavigationHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Documents", href: "/documents", icon: FileText },
    { name: "Analysis", href: "/analysis", icon: Brain },
    { name: "Chat", href: "/chat", icon: MessageSquare },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center animate-glow">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold gradient-text">LegalEase</h1>
                <p className="text-xs text-muted-foreground -mt-1">AI Legal Assistant</p>
              </div>
            </Link>

            { }
            <nav className="hidden md:flex items-center gap-1 ml-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className={`gap-2 ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>

          { }
          <div className="flex items-center gap-3">
            { }
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              AI Online
            </div>

            { }
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-primary">2</Badge>
            </Button>

            { }
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Legal User</p>
                    <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Privacy</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            { }
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  { }
                  <div className="flex items-center gap-2 pb-4 border-b">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold gradient-text">LegalEase</h2>
                      <p className="text-xs text-muted-foreground">AI Legal Assistant</p>
                    </div>
                  </div>

                  { }
                  <nav className="flex-1 py-4">
                    <div className="space-y-2">
                      {navigation.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                            <Button
                              variant={isActive(item.href) ? "secondary" : "ghost"}
                              className={`w-full justify-start gap-3 ${
                                isActive(item.href)
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                              {item.name}
                            </Button>
                          </Link>
                        )
                      })}
                    </div>

                    { }
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">AI Status</span>
                        <Badge className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" />
                          Analysis Engine Ready
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          Privacy Mode Enabled
                        </div>
                      </div>
                    </div>
                  </nav>

                  { }
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Legal User</p>
                        <p className="text-xs text-muted-foreground">user@example.com</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <Settings className="w-4 h-4" />
                        Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <HelpCircle className="w-4 h-4" />
                        Help & Support
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-600">
                        <LogOut className="w-4 h-4" />
                        Log out
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

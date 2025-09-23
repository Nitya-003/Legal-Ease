"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Upload, MessageSquare, AlertTriangle, Download, Scale, Menu, X, Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { FloatingChat } from "@/components/floating-chat"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { icon: Upload, label: "Upload Document", href: "/upload", description: "Start here" },
    { icon: FileText, label: "Simplify & Summarize", href: "/simplify", description: "Break it down" },
    { icon: MessageSquare, label: "Ask Questions", href: "/chat", description: "Get answers" },
    { icon: AlertTriangle, label: "Highlights & Risks", href: "/risks", description: "Stay informed" },
    { icon: Download, label: "Download Outputs", href: "/download", description: "Export results" },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      { }
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-sidebar border-r border-sidebar-border
        transform transition-all duration-300 ease-out custom-scrollbar overflow-y-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative lg:z-auto lg:flex-shrink-0
      `}
      >
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border bg-sidebar/80 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-200">
              <Scale className="w-6 h-6 text-primary-foreground group-hover:rotate-12 transition-transform duration-200" />
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-200">
              <h1 className="text-xl font-bold text-sidebar-foreground">LegalEase</h1>
              <p className="text-xs text-sidebar-foreground/60">AI Legal Assistant</p>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden focus-enhanced hover:rotate-90 transition-transform duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item, index) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start gap-4 h-16 text-left p-4 rounded-xl transition-all duration-300 ease-out focus-enhanced group hover:scale-[1.02] hover:shadow-md ${
                pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md border border-sidebar-border/50 scale-[1.02]"
                  : "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              }`}
              asChild
            >
              <Link href={item.href} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-sidebar-accent group-hover:bg-primary group-hover:text-primary-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 group-hover:translate-x-1 transition-transform duration-200">
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-xs text-sidebar-foreground/60 truncate">{item.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Card className="p-4 bg-gradient-to-br from-sidebar-accent via-sidebar-accent/80 to-sidebar-accent/60 border-sidebar-border/50 backdrop-blur-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="text-sm text-sidebar-accent-foreground">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-primary animate-pulse" />
                <p className="font-semibold">Privacy First</p>
              </div>
              <p className="text-xs opacity-80 leading-relaxed">
                Documents are processed securely and never stored permanently. Your data stays private.
              </p>
            </div>
          </Card>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card/80 backdrop-blur-md border-b border-border px-6 py-4 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden focus-enhanced hover:scale-110 transition-transform duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">All systems operational</span>
                </div>
                <Badge variant="secondary" className="text-xs hover:scale-105 transition-transform duration-200">
                  v2.1.0
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</main>

        <FloatingChat />
      </div>
    </div>
  )
}

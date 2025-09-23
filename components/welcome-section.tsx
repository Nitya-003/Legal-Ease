import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, MessageSquare, AlertTriangle, Zap, Shield, Globe, BookOpen } from "lucide-react"
import Link from "next/link"

export function WelcomeSection() {
  const features = [
    {
      icon: Zap,
      title: "Smart Analogies",
      description: "Complex legal terms explained through real-world comparisons that make sense",
      badge: "AI-Powered",
      color: "from-yellow-500/10 to-orange-500/10",
    },
    {
      icon: AlertTriangle,
      title: "Risk Radar",
      description: "Visual risk assessment for every clause with detailed severity analysis",
      badge: "Risk Detection",
      color: "from-red-500/10 to-pink-500/10",
    },
    {
      icon: BookOpen,
      title: "Learning Mode",
      description: "Side-by-side view of original, simplified, and analogies for better understanding",
      badge: "Educational",
      color: "from-blue-500/10 to-indigo-500/10",
    },
    {
      icon: Shield,
      title: "Privacy Switch",
      description: "Anonymize names and entities before AI processing to protect sensitive information",
      badge: "Privacy First",
      color: "from-green-500/10 to-emerald-500/10",
    },
  ]

  const quickActions = [
    {
      icon: Upload,
      title: "Upload Document",
      description: "Start by uploading your PDF, TXT, or DOCX file for instant analysis",
      color: "bg-primary text-primary-foreground",
      href: "/upload",
      gradient: "from-primary to-primary/80",
    },
    {
      icon: FileText,
      title: "Quick Simplify",
      description: "Get instant plain-language summaries with smart analogies",
      color: "bg-accent text-accent-foreground",
      href: "/simplify",
      gradient: "from-accent to-accent/80",
    },
    {
      icon: MessageSquare,
      title: "Ask Questions",
      description: "Chat with your document to understand specific clauses and terms",
      color: "bg-secondary text-secondary-foreground",
      href: "/chat",
      gradient: "from-secondary to-secondary/80",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in">
      { }
      <div className="text-center space-y-6 py-8">
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Simplify Legal Documents with AI
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Transform complex legal jargon into plain English with smart analogies, risk detection, and interactive Q&A
            powered by advanced AI technology.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-4">
          <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Globe className="w-4 h-4" />
            Multi-language support
          </Badge>
          <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Shield className="w-4 h-4" />
            Privacy-first processing
          </Badge>
          <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Zap className="w-4 h-4" />
            Instant results
          </Badge>
        </div>
      </div>

      { }
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Get Started in Seconds</h2>
          <p className="text-muted-foreground">Choose your preferred way to begin simplifying legal documents</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={action.title}
              className="cursor-pointer card-hover border-2 hover:border-primary/20 group relative overflow-hidden"
              asChild
            >
              <Link href={action.href}>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                />
                <CardHeader className="pb-4 relative">
                  <div
                    className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <action.icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{action.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{action.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      { }
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Innovative Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond basic simplification - smart tools designed for better legal document understanding
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="card-hover border-2 hover:border-primary/20 group relative overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <CardHeader className="pb-4 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs font-medium">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      { }
      <Card className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border-2 border-primary/20 card-hover relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            Try the Interactive Demo
          </CardTitle>
          <CardDescription className="text-lg">
            See how LegalEase transforms a complex rental agreement into plain English in seconds
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              "Upload rental agreement",
              "Clause breakdown",
              "Risk highlighting",
              "Q&A interaction",
              "Download summary",
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  {step}
                </Badge>
                {index < 4 && <span className="text-muted-foreground">→</span>}
              </div>
            ))}
          </div>
          <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow" asChild>
            <Link href="/upload">
              <Upload className="w-5 h-5 mr-2" />
              Start Demo with Sample Document
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

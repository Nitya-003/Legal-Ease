import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Shield,
  Zap,
  FileText,
  MessageSquare,
  BarChart3,
  Clock,
  AlertTriangle,
  BookOpen,
  Target,
} from "lucide-react"

export function FeatureGrid() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced AI analyzes your legal documents to extract key insights, risks, and actionable recommendations.",
      badge: "Core Feature",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your documents are processed securely with optional anonymization. Data is never stored permanently.",
      badge: "Security",
      color: "text-green-500",
    },
    {
      icon: MessageSquare,
      title: "Interactive Chat",
      description: "Ask questions about your document in plain language and get instant, contextual answers.",
      badge: "AI Chat",
      color: "text-blue-500",
    },
    {
      icon: FileText,
      title: "Multi-Format Support",
      description: "Upload PDF, DOCX, and TXT files. Our AI handles various document types and structures.",
      badge: "Compatibility",
      color: "text-purple-500",
    },
    {
      icon: AlertTriangle,
      title: "Risk Assessment",
      description: "Identify potential legal risks and get recommendations to protect your interests.",
      badge: "Risk Analysis",
      color: "text-orange-500",
    },
    {
      icon: BookOpen,
      title: "Term Simplification",
      description: "Complex legal jargon explained in simple, understandable language with context.",
      badge: "Education",
      color: "text-teal-500",
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get comprehensive analysis in minutes, not hours. Save time on document review.",
      badge: "Speed",
      color: "text-indigo-500",
    },
    {
      icon: BarChart3,
      title: "Detailed Insights",
      description: "Comprehensive reports with confidence scores, key points, and action items.",
      badge: "Analytics",
      color: "text-pink-500",
    },
    {
      icon: Target,
      title: "Action Items",
      description: "Get specific, actionable recommendations based on your document analysis.",
      badge: "Guidance",
      color: "text-red-500",
    },
  ]

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-4">
            <Zap className="h-4 w-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Everything you need to understand
            <span className="block text-primary">legal documents</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform transforms complex legal documents into clear, actionable insights that help you
            make informed decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="card-hover group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-12 h-12 rounded-lg bg-background border-2 flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        { }
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-sm text-muted-foreground">Documents Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2min</div>
            <div className="text-sm text-muted-foreground">Average Analysis Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">AI Availability</div>
          </div>
        </div>
      </div>
    </section>
  )
}

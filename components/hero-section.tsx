import { Button } from "@/components/ui/button"
import { ArrowRight, Scale, FileText, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      { }
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      { }
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Scale className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">LegalEase</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </a>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </nav>

      { }
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Zap className="h-4 w-4" />
            AI-Powered Legal Analysis
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Simplify Legal Documents
            <span className="block text-primary">with AI Intelligence</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Transform complex legal documents into clear, actionable insights. Our AI analyzes contracts, agreements,
            and legal texts to help you understand what matters most.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" className="gap-2">
              Start Analyzing
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              View Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

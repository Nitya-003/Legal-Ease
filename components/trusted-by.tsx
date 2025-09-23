import { Badge } from "@/components/ui/badge"

export function TrustedBy() {
  const companies = [
    { name: "LegalTech Corp", logo: "LT" },
    { name: "Justice Partners", logo: "JP" },
    { name: "Law Firm Associates", logo: "LFA" },
    { name: "Contract Solutions", logo: "CS" },
    { name: "Legal Advisory Group", logo: "LAG" },
    { name: "Document Experts", logo: "DE" },
    { name: "Compliance Pro", logo: "CP" },
    { name: "Legal Insights", logo: "LI" },
  ]

  const testimonials = [
    {
      quote: "LegalEase has transformed how we review contracts. What used to take hours now takes minutes.",
      author: "Sarah Chen",
      role: "Legal Counsel",
      company: "TechStart Inc.",
    },
    {
      quote: "The AI analysis is incredibly accurate and helps us identify risks we might have missed.",
      author: "Michael Rodriguez",
      role: "Contract Manager",
      company: "Global Enterprises",
    },
    {
      quote: "Finally, a tool that makes legal documents accessible to non-lawyers on our team.",
      author: "Emily Johnson",
      role: "Operations Director",
      company: "StartupCo",
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        { }
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-8">Trusted by legal professionals worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {companies.map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-lg bg-muted/50 border flex items-center justify-center hover:bg-muted transition-colors">
                  <span className="text-sm font-bold text-muted-foreground">{company.logo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        { }
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">What our users say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how legal professionals are using LegalEase to streamline their document review process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border rounded-lg p-6 card-hover">
                <blockquote className="text-foreground mb-4">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        { }
        <div className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to simplify your legal documents?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust LegalEase to analyze their documents and provide clear,
            actionable insights.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-green-100 text-green-800">Free Trial Available</Badge>
            <Badge className="bg-blue-100 text-blue-800">No Credit Card Required</Badge>
            <Badge className="bg-purple-100 text-purple-800">Setup in 2 Minutes</Badge>
          </div>
        </div>
      </div>
    </section>
  )
}

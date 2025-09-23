"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Lightbulb,
  AlertTriangle,
  Clock,
  Eye,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle,
} from "lucide-react"

interface ClauseData {
  id: string
  original: string
  basic: string
  intermediate: string
  expert: string
  analogy: string
  risk: {
    type: "low" | "medium" | "high"
    severity: string
    description: string
  }
  timeline?: string
}

export function DocumentSimplifier() {
  const [processingLevel, setProcessingLevel] = useState<"basic" | "intermediate" | "expert">("basic")
  const [learningMode, setLearningMode] = useState(false)
  const [expandedClauses, setExpandedClauses] = useState<Set<string>>(new Set())
  const [copiedClause, setCopiedClause] = useState<string | null>(null)

  const mockClauses: ClauseData[] = [
    {
      id: "C1",
      original:
        "The tenant shall not terminate this agreement before the expiration of eleven (11) months from the commencement date, and any such premature termination shall constitute a material breach of this agreement, subjecting the tenant to liquidated damages equivalent to two (2) months' rent.",
      basic: "You cannot leave before 11 months, or you will be fined 2 months' rent.",
      intermediate:
        "The tenant must stay for at least 11 months. Leaving earlier is considered breaking the contract and results in a penalty of 2 months' rent.",
      expert:
        "Clause requires an 11-month minimum tenancy period. Early termination constitutes material breach, exposing tenant to liquidated damages of two months' rental payment.",
      analogy: "Like leaving a gym membership early and still paying the cancellation fees.",
      risk: {
        type: "high",
        severity: "High",
        description: "Significant financial penalty for early termination",
      },
      timeline: "11-month minimum commitment",
    },
    {
      id: "C2",
      original:
        "The landlord reserves the right to inspect the premises with twenty-four (24) hours written notice to the tenant, except in cases of emergency where immediate access may be required.",
      basic: "The landlord can visit your place with 24 hours notice, or immediately in emergencies.",
      intermediate:
        "The landlord has the right to inspect the property but must give you 24 hours written notice, except during emergencies when they can enter immediately.",
      expert:
        "Landlord retains inspection rights subject to 24-hour written notice requirement, with emergency exception clause permitting immediate access.",
      analogy: "Like your parents calling before visiting, except they can come right in if there's a fire.",
      risk: {
        type: "medium",
        severity: "Medium",
        description: "Limited privacy with inspection rights",
      },
    },
    {
      id: "C3",
      original:
        "The security deposit shall be held in an interest-bearing account and returned within thirty (30) days of lease termination, less any deductions for damages beyond normal wear and tear.",
      basic: "Your security deposit earns interest and comes back in 30 days, minus any damage costs.",
      intermediate:
        "The security deposit will be kept in an account that earns interest. You'll get it back within 30 days after moving out, but they can subtract money for any damage beyond normal use.",
      expert:
        "Security deposit maintained in interest-bearing escrow account with 30-day return obligation, subject to deductions for damages exceeding normal wear and tear standards.",
      analogy: "Like borrowing a friend's car - you get your keys back unless you scratch it up.",
      risk: {
        type: "low",
        severity: "Low",
        description: "Standard security deposit terms with interest benefit",
      },
    },
  ]

  const toggleClauseExpansion = (clauseId: string) => {
    const newExpanded = new Set(expandedClauses)
    if (newExpanded.has(clauseId)) {
      newExpanded.delete(clauseId)
    } else {
      newExpanded.add(clauseId)
    }
    setExpandedClauses(newExpanded)
  }

  const copyToClipboard = async (text: string, clauseId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedClause(clauseId)
      setTimeout(() => setCopiedClause(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const getRiskColor = (risk: ClauseData["risk"]["type"]) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getRiskIcon = (risk: ClauseData["risk"]["type"]) => {
    switch (risk) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "medium":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-600" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Simplify & Summarize</h1>
        <p className="text-muted-foreground">
          AI-powered analysis of your legal document with plain language explanations and smart analogies.
        </p>
      </div>

      { }
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Analysis Settings
          </CardTitle>
          <CardDescription>Customize how your document is simplified and presented.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          { }
          <div>
            <Label className="text-base font-medium mb-3 block">Explanation Level</Label>
            <Tabs value={processingLevel} onValueChange={(value) => setProcessingLevel(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="expert">Expert</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          { }
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <Label htmlFor="learning-mode" className="text-base font-medium">
                  Learning Mode
                </Label>
                <p className="text-sm text-muted-foreground">Show original, simplified, and analogy side by side</p>
              </div>
            </div>
            <Switch id="learning-mode" checked={learningMode} onCheckedChange={setLearningMode} />
          </div>
        </CardContent>
      </Card>

      { }
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Document: Rental Agreement Sample
          </CardTitle>
          <CardDescription>
            Analyzed {mockClauses.length} clauses • Processing complete • {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Analysis Complete</span>
            </div>
            <Badge variant="outline" className="gap-1">
              <Clock className="w-3 h-3" />
              Processed in 2.3s
            </Badge>
          </div>

          <Progress value={100} className="mb-6" />

          { }
          <Alert className="mb-6">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              <strong>Risk Summary:</strong> 1 high-risk clause detected (early termination penalty). Review carefully
              before signing.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      { }
      <div className="space-y-4">
        {mockClauses.map((clause) => (
          <Card key={clause.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Clause {clause.id}</Badge>
                  <Badge className={`${getRiskColor(clause.risk.type)} border`}>
                    {getRiskIcon(clause.risk.type)}
                    {clause.risk.severity} Risk
                  </Badge>
                  {clause.timeline && (
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="w-3 h-3" />
                      {clause.timeline}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(clause[processingLevel], clause.id)}>
                    {copiedClause === clause.id ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toggleClauseExpansion(clause.id)}>
                    {expandedClauses.has(clause.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {learningMode ? (
                <Tabs defaultValue="simplified" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="simplified">Simplified</TabsTrigger>
                    <TabsTrigger value="original">Original</TabsTrigger>
                    <TabsTrigger value="analogy">Analogy</TabsTrigger>
                  </TabsList>
                  <TabsContent value="simplified" className="mt-4">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-foreground">{clause[processingLevel]}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="original" className="mt-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-muted-foreground text-sm">{clause.original}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="analogy" className="mt-4">
                    <div className="p-4 bg-accent/50 rounded-lg border border-accent">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-accent-foreground">{clause.analogy}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <>
                  { }
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-foreground">{clause[processingLevel]}</p>
                  </div>

                  { }
                  <div className="p-4 bg-accent/50 rounded-lg border border-accent">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-accent-foreground">{clause.analogy}</p>
                    </div>
                  </div>
                </>
              )}

              { }
              <div className={`p-3 rounded-lg border ${getRiskColor(clause.risk.type)}`}>
                <div className="flex items-center gap-2 mb-1">
                  {getRiskIcon(clause.risk.type)}
                  <span className="font-medium text-sm">Risk Assessment</span>
                </div>
                <p className="text-sm">{clause.risk.description}</p>
              </div>

              { }
              {expandedClauses.has(clause.id) && (
                <div className="p-4 bg-muted rounded-lg border-l-4 border-muted-foreground">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Original Text</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{clause.original}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      { }
      <div className="flex gap-3 pt-4">
        <Button className="flex-1">Continue to Q&A</Button>
        <Button variant="outline">Download Summary</Button>
        <Button variant="outline">View Risk Report</Button>
      </div>
    </div>
  )
}

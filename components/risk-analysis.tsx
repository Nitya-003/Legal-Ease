"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Shield,
  TrendingUp,
  Clock,
  DollarSign,
  FileText,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
} from "lucide-react"

interface RiskItem {
  id: string
  type: "penalty" | "privacy" | "termination" | "financial" | "legal" | "timeline"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  clauseReference: string
  impact: string
  recommendation: string
  likelihood: number
}

interface RiskCategory {
  name: string
  icon: any
  count: number
  highRisk: number
  color: string
}

export function RiskAnalysis() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const risks: RiskItem[] = [
    {
      id: "R1",
      type: "penalty",
      severity: "high",
      title: "Early Termination Penalty",
      description: "Significant financial penalty for leaving before 11 months",
      clauseReference: "C1",
      impact: "2 months' rent penalty ($3,000)",
      recommendation: "Consider negotiating a reduced penalty or graduated scale",
      likelihood: 85,
    },
    {
      id: "R2",
      type: "privacy",
      severity: "medium",
      title: "Landlord Inspection Rights",
      description: "Landlord can inspect with 24-hour notice, emergency access allowed",
      clauseReference: "C2",
      impact: "Limited privacy, potential for frequent inspections",
      recommendation: "Request specific limits on inspection frequency",
      likelihood: 60,
    },
    {
      id: "R3",
      type: "financial",
      severity: "low",
      title: "Security Deposit Terms",
      description: "Standard security deposit with interest, 30-day return period",
      clauseReference: "C3",
      impact: "Potential deductions for damages beyond normal wear",
      recommendation: "Document property condition thoroughly at move-in",
      likelihood: 30,
    },
    {
      id: "R4",
      type: "legal",
      severity: "medium",
      title: "Maintenance Responsibilities",
      description: "Tenant responsible for minor repairs and maintenance",
      clauseReference: "C4",
      impact: "Unexpected maintenance costs",
      recommendation: "Clarify what constitutes 'minor' vs 'major' repairs",
      likelihood: 70,
    },
  ]

  const riskCategories: RiskCategory[] = [
    {
      name: "Financial",
      icon: DollarSign,
      count: risks.filter((r) => r.type === "financial" || r.type === "penalty").length,
      highRisk: risks.filter((r) => (r.type === "financial" || r.type === "penalty") && r.severity === "high").length,
      color: "text-red-600",
    },
    {
      name: "Privacy",
      icon: Shield,
      count: risks.filter((r) => r.type === "privacy").length,
      highRisk: risks.filter((r) => r.type === "privacy" && r.severity === "high").length,
      color: "text-yellow-600",
    },
    {
      name: "Legal",
      icon: FileText,
      count: risks.filter((r) => r.type === "legal" || r.type === "termination").length,
      highRisk: risks.filter((r) => (r.type === "legal" || r.type === "termination") && r.severity === "high").length,
      color: "text-blue-600",
    },
    {
      name: "Timeline",
      icon: Clock,
      count: risks.filter((r) => r.type === "timeline").length,
      highRisk: risks.filter((r) => r.type === "timeline" && r.severity === "high").length,
      color: "text-purple-600",
    },
  ]

  const getSeverityColor = (severity: RiskItem["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-red-600 text-white"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getSeverityIcon = (severity: RiskItem["severity"]) => {
    switch (severity) {
      case "critical":
      case "high":
        return <XCircle className="w-4 h-4" />
      case "medium":
        return <AlertCircle className="w-4 h-4" />
      case "low":
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const getOverallRiskScore = () => {
    const severityWeights = { critical: 4, high: 3, medium: 2, low: 1 }
    const totalWeight = risks.reduce((sum, risk) => sum + severityWeights[risk.severity], 0)
    const maxPossibleWeight = risks.length * 4
    return Math.round((totalWeight / maxPossibleWeight) * 100)
  }

  const filteredRisks = selectedCategory === "all" ? risks : risks.filter((risk) => risk.type === selectedCategory)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Highlights & Risks</h1>
        <p className="text-muted-foreground">
          Comprehensive risk analysis of your legal document with actionable recommendations.
        </p>
      </div>

      { }
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Overall Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 mb-2">{getOverallRiskScore()}%</div>
            <Progress value={getOverallRiskScore()} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              {getOverallRiskScore() > 70 ? "High" : getOverallRiskScore() > 40 ? "Medium" : "Low"} risk document
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Total Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{risks.length}</div>
            <div className="flex gap-2">
              <Badge className="bg-red-100 text-red-800 text-xs">
                {risks.filter((r) => r.severity === "high").length} High
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                {risks.filter((r) => r.severity === "medium").length} Medium
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Financial Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">$3,000</div>
            <p className="text-sm text-muted-foreground">Potential penalty exposure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {risks.filter((r) => r.severity === "high" || r.severity === "medium").length}
            </div>
            <p className="text-sm text-muted-foreground">Recommendations to review</p>
          </CardContent>
        </Card>
      </div>

      { }
      <Card>
        <CardHeader>
          <CardTitle>Risk Categories</CardTitle>
          <CardDescription>Breakdown of risks by category and severity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {riskCategories.map((category) => (
              <div key={category.name} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Badge variant="outline">{category.count}</Badge>
                </div>
                {category.highRisk > 0 && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <AlertDescription className="text-sm text-red-800">
                      {category.highRisk} high-risk item{category.highRisk > 1 ? "s" : ""}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      { }
      <Card>
        <CardHeader>
          <CardTitle>Risk Analysis</CardTitle>
          <CardDescription>Detailed breakdown of identified risks and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Risks</TabsTrigger>
              <TabsTrigger value="penalty">Financial</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-6">
              <div className="space-y-4">
                {filteredRisks.map((risk) => (
                  <Card key={risk.id} className="border-l-4 border-l-muted">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={`${getSeverityColor(risk.severity)} border`}>
                            {getSeverityIcon(risk.severity)}
                            {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
                          </Badge>
                          <Badge variant="outline">Clause {risk.clauseReference}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <TrendingUp className="w-4 h-4" />
                          {risk.likelihood}% likelihood
                        </div>
                      </div>
                      <CardTitle className="text-lg">{risk.title}</CardTitle>
                      <CardDescription>{risk.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                            Potential Impact
                          </h4>
                          <p className="text-sm text-muted-foreground">{risk.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Recommendation
                          </h4>
                          <p className="text-sm text-muted-foreground">{risk.recommendation}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Clause
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Get Legal Advice
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      { }
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="w-4 h-4 text-orange-600" />
        <AlertDescription>
          <strong>Action Required:</strong> We've identified {risks.filter((r) => r.severity === "high").length}{" "}
          high-risk items that need your attention before signing. Consider consulting with a legal professional for the
          early termination clause.
        </AlertDescription>
      </Alert>

      { }
      <div className="flex gap-3">
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Download Risk Report
        </Button>
        <Button variant="outline">Share with Legal Advisor</Button>
        <Button variant="outline">Schedule Review</Button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { DocumentUpload } from "@/components/document-upload"
import { DocumentAnalysis } from "@/components/document-analysis"
import { DocumentChat } from "@/components/document-chat"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  Brain,
  MessageSquare,
  Upload,
  BarChart3,
  Settings,
  History,
  Shield,
  Zap,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"

interface DocumentAnalysisResult {
  summary: string
  keyPoints: string[]
  risks: Array<{
    level: "low" | "medium" | "high"
    description: string
    recommendation: string
  }>
  simplifiedTerms: Array<{
    term: string
    definition: string
    context: string
  }>
  actionItems: string[]
  confidence: number
}

export default function DashboardPage() {
  const [currentDocument, setCurrentDocument] = useState<string | null>("rental-agreement-sample.pdf")
  const [analysis, setAnalysis] = useState<DocumentAnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("upload")

  const mockAnalysis: DocumentAnalysisResult = {
    summary:
      "This is a standard residential rental agreement for a one-bedroom apartment. The lease term is 12 months with a monthly rent of $1,200. The agreement includes standard clauses for security deposits, maintenance responsibilities, and termination conditions.",
    keyPoints: [
      "Monthly rent: $1,200 due on the 1st of each month",
      "Security deposit: $1,200 (refundable with conditions)",
      "Lease term: 12 months starting January 1, 2024",
      "Tenant responsible for utilities except water/sewer",
      "No pets allowed without written permission",
      "30-day notice required for lease termination",
    ],
    risks: [
      {
        level: "medium",
        description: "Late rent payment penalties are quite steep at $50 plus $10 per day",
        recommendation: "Set up automatic payments to avoid late fees",
      },
      {
        level: "low",
        description: "Security deposit return depends on property condition",
        recommendation: "Document property condition with photos at move-in",
      },
    ],
    simplifiedTerms: [
      {
        term: "Joint and Several Liability",
        definition: "If multiple tenants sign the lease, each person is responsible for the full rent amount",
        context: "This means if your roommate doesn't pay their share, you're still responsible for the entire rent",
      },
      {
        term: "Quiet Enjoyment",
        definition: "Your right to use the property without unreasonable interference from the landlord",
        context: "The landlord cannot enter without proper notice except in emergencies",
      },
    ],
    actionItems: [
      "Review and understand the late payment policy",
      "Take photos of the property condition before moving in",
      "Set up automatic rent payments",
      "Clarify pet policy if you plan to get pets",
      "Understand your rights regarding landlord entry",
    ],
    confidence: 92,
  }

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true)
    setActiveTab("analysis")

    setTimeout(() => {
      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 3000)
  }

  const handleStartChat = () => {
    setActiveTab("chat")
  }

  const recentDocuments = [
    { name: "rental-agreement-sample.pdf", status: "completed", date: "2 hours ago" },
    { name: "employment-contract.docx", status: "analyzing", date: "1 day ago" },
    { name: "service-agreement.pdf", status: "completed", date: "3 days ago" },
  ]

  return (
    <div className="min-h-screen bg-background">
      { }
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">LegalEase AI</h1>
                  <p className="text-xs text-muted-foreground">Document Analysis Dashboard</p>
                </div>
              </div>
              {currentDocument && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {currentDocument}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          { }
          <div className="lg:col-span-1 space-y-4">
            { }
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Documents Analyzed</span>
                  <Badge>12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risks Identified</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Terms Explained</span>
                  <Badge className="bg-primary/10 text-primary">47</Badge>
                </div>
              </CardContent>
            </Card>

            { }
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.date}</p>
                    </div>
                    {doc.status === "completed" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            { }
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  AI Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Analysis Engine</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Chat Assistant</span>
                  <Badge className="bg-green-100 text-green-800">Ready</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Privacy Mode</span>
                  <Badge variant="outline">
                    <Shield className="w-3 h-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          { }
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Analysis
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Insights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-6">
                <DocumentUpload />
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <DocumentAnalysis
                  documentName={currentDocument || ""}
                  analysis={analysis}
                  isAnalyzing={isAnalyzing}
                  onStartAnalysis={handleStartAnalysis}
                  onStartChat={handleStartChat}
                />
              </TabsContent>

              <TabsContent value="chat" className="space-y-6">
                <DocumentChat />
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Document Insights</CardTitle>
                      <CardDescription>Analytics and trends from your document analysis history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-primary">92%</div>
                          <div className="text-sm text-muted-foreground">Avg. Confidence</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">2.3</div>
                          <div className="text-sm text-muted-foreground">Avg. Risks per Doc</div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold text-green-600">15min</div>
                          <div className="text-sm text-muted-foreground">Avg. Analysis Time</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Alert>
                    <AlertTriangle className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Coming Soon:</strong> Advanced analytics, document comparison, and trend analysis features
                      are in development.
                    </AlertDescription>
                  </Alert>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

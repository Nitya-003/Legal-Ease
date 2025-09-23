"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  FileText,
  Mail,
  Share2,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Printer,
  Link,
  Loader2,
} from "lucide-react"

interface ExportOption {
  id: string
  title: string
  description: string
  icon: any
  format: string
  size: string
  included: string[]
}

export function ExportCenter() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["summary", "risks", "qa"])
  const [exportFormat, setExportFormat] = useState("pdf")
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [shareEmail, setShareEmail] = useState("")
  const [shareMessage, setShareMessage] = useState("")
  const [copiedLink, setCopiedLink] = useState(false)

  const exportOptions: ExportOption[] = [
    {
      id: "summary",
      title: "Simplified Summary",
      description: "Plain language explanations of all clauses with analogies",
      icon: FileText,
      format: "PDF, DOCX",
      size: "~2-4 pages",
      included: ["Clause breakdowns", "Smart analogies", "Key terms glossary"],
    },
    {
      id: "risks",
      title: "Risk Analysis Report",
      description: "Comprehensive risk assessment with recommendations",
      icon: AlertTriangle,
      format: "PDF, DOCX",
      size: "~3-5 pages",
      included: ["Risk categories", "Severity ratings", "Action items", "Financial impact"],
    },
    {
      id: "qa",
      title: "Q&A Session Export",
      description: "Your questions and AI responses for future reference",
      icon: Mail,
      format: "PDF, TXT",
      size: "~1-2 pages",
      included: ["All questions asked", "AI responses", "Clause references", "Timestamps"],
    },
    {
      id: "timeline",
      title: "Obligations Timeline",
      description: "Key dates and deadlines from your document",
      icon: Clock,
      format: "PDF, ICS",
      size: "~1 page",
      included: ["Important dates", "Payment schedules", "Renewal deadlines", "Notice periods"],
    },
    {
      id: "original",
      title: "Original Document",
      description: "Your uploaded document with annotations",
      icon: FileText,
      format: "PDF",
      size: "Original size",
      included: ["Original text", "Risk highlights", "Clause markers", "Notes"],
    },
  ]

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    const progressSteps = [
      { step: 20, message: "Preparing document..." },
      { step: 40, message: "Generating summaries..." },
      { step: 60, message: "Creating risk analysis..." },
      { step: 80, message: "Formatting export..." },
      { step: 100, message: "Export complete!" },
    ]

    for (const { step, message } of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setExportProgress(step)
    }

    
    setTimeout(() => {
      setIsExporting(false)
      setExportProgress(0)
      alert("Export complete! File would be downloaded.")
    }, 500)
  }

  const handleShare = async () => {
    alert(`Sharing with ${shareEmail}`)
  }

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText("https://legalease.app/shared/abc123")
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } catch (err) {
      console.error("Failed to copy link")
    }
  }

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  const getEstimatedSize = () => {
    const baseSize = selectedOptions.length * 2
    return `${baseSize}-${baseSize + 2} pages`
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Download Outputs</h1>
        <p className="text-muted-foreground">
          Export your simplified document analysis in various formats for future reference or sharing.
        </p>
      </div>

      { }
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Document: Rental Agreement Sample
          </CardTitle>
          <CardDescription>Analysis complete • Ready for export • Last updated 2 minutes ago</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-1">
              <FileText className="w-3 h-3" />3 clauses analyzed
            </Badge>
            <Badge variant="outline" className="gap-1">
              <AlertTriangle className="w-3 h-3" />4 risks identified
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Mail className="w-3 h-3" />6 questions answered
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        { }
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Content to Export</CardTitle>
              <CardDescription>Choose which parts of your analysis to include in the export</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {exportOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => toggleOption(option.id)}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <option.icon className="w-4 h-4 text-primary" />
                      <Label htmlFor={option.id} className="font-medium">
                        {option.title}
                      </Label>
                      <Badge variant="outline" className="text-xs">
                        {option.format}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Size: {option.size}</span>
                      <span>•</span>
                      <span>Includes: {option.included.join(", ")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          { }
          <Card>
            <CardHeader>
              <CardTitle>Export Settings</CardTitle>
              <CardDescription>Customize your export format and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="docx">Word Document</SelectItem>
                      <SelectItem value="txt">Plain Text</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Estimated Size</Label>
                  <div className="h-10 px-3 py-2 border rounded-md bg-muted text-sm flex items-center">
                    {getEstimatedSize()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-original" />
                  <Label htmlFor="include-original" className="text-sm">
                    Include original document text
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-timestamps" defaultChecked />
                  <Label htmlFor="include-timestamps" className="text-sm">
                    Include analysis timestamps
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="watermark" />
                  <Label htmlFor="watermark" className="text-sm">
                    Add LegalEase watermark
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        { }
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Export</CardTitle>
              <CardDescription className="text-sm">Download your analysis now</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isExporting ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Generating export...</span>
                  </div>
                  <Progress value={exportProgress} className="h-2" />
                </div>
              ) : (
                <>
                  <Button onClick={handleExport} className="w-full" disabled={selectedOptions.length === 0}>
                    <Download className="w-4 h-4 mr-2" />
                    Download {exportFormat.toUpperCase()}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Export
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Analysis
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Share Analysis</CardTitle>
              <CardDescription className="text-sm">Send to legal advisor or colleague</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="share-email" className="text-sm font-medium mb-2 block">
                  Email Address
                </Label>
                <input
                  id="share-email"
                  type="email"
                  placeholder="lawyer@example.com"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>
              <div>
                <Label htmlFor="share-message" className="text-sm font-medium mb-2 block">
                  Message (Optional)
                </Label>
                <Textarea
                  id="share-message"
                  placeholder="Please review this rental agreement analysis..."
                  value={shareMessage}
                  onChange={(e) => setShareMessage(e.target.value)}
                  className="text-sm"
                  rows={3}
                />
              </div>
              <Button onClick={handleShare} className="w-full" disabled={!shareEmail}>
                <Mail className="w-4 h-4 mr-2" />
                Send Analysis
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Shareable Link</CardTitle>
              <CardDescription className="text-sm">Create a secure link to your analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={copyShareLink}>
                  {copiedLink ? (
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  ) : (
                    <Link className="w-4 h-4 mr-2" />
                  )}
                  {copiedLink ? "Copied!" : "Copy Link"}
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription className="text-xs">
                  Links expire in 30 days and require password access
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          { }
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Exports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Risk Report PDF</span>
                <Button variant="ghost" size="sm">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Full Analysis DOCX</span>
                <Button variant="ghost" size="sm">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      { }
      {selectedOptions.length > 0 && (
        <Alert>
          <CheckCircle className="w-4 h-4" />
          <AlertDescription>
            Ready to export {selectedOptions.length} section{selectedOptions.length > 1 ? "s" : ""} as{" "}
            {exportFormat.toUpperCase()}. Estimated size: {getEstimatedSize()}.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

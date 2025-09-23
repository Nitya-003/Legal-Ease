"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Upload, FileText, File, CheckCircle, AlertCircle, X, Shield, Eye, Loader2 } from "lucide-react"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  error?: string
}

export function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [privacyMode, setPrivacyMode] = useState(false)
  const [processingLevel, setProcessingLevel] = useState<"basic" | "intermediate" | "expert">("basic")

  const acceptedTypes = [".pdf", ".txt", ".docx"]
  const maxFileSize = 10 * 1024 * 1024 // 10MB

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      processFiles(selectedFiles)
    }
  }, [])

  const processFiles = (fileList: File[]) => {
    fileList.forEach((file) => {
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
      if (!acceptedTypes.includes(fileExtension)) {
        alert(`File type ${fileExtension} not supported. Please upload PDF, TXT, or DOCX files.`)
        return
      }

      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        return
      }

      const fileId = Math.random().toString(36).substr(2, 9)
      const uploadedFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
      }

      setFiles((prev) => [...prev, uploadedFile])

      simulateFileProcessing(fileId)
    })
  }

  const simulateFileProcessing = async (fileId: string) => {
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)))
    }

    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status: "processing", progress: 0 } : file)))

    for (let progress = 0; progress <= 100; progress += 15) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, progress } : file)))
    }

    setFiles((prev) =>
      prev.map((file) => (file.id === fileId ? { ...file, status: "completed", progress: 100 } : file)),
    )
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "pdf":
        return <File className="w-5 h-5 text-red-500" />
      case "txt":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "docx":
        return <FileText className="w-5 h-5 text-blue-600" />
      default:
        return <File className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "uploading":
      case "processing":
        return <Loader2 className="w-4 h-4 animate-spin text-primary" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Upload Document</h1>
        <p className="text-muted-foreground">
          Upload your legal document to get started with AI-powered simplification and analysis.
        </p>
      </div>

      { }
      <Card>
        <CardHeader>
          <CardTitle>Select Document</CardTitle>
          <CardDescription>
            Drag and drop your file here, or click to browse. Supports PDF, TXT, and DOCX files up to 10MB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Drop your document here</h3>
            <p className="text-muted-foreground mb-4">or</p>
            <Button asChild>
              <label className="cursor-pointer">
                Browse Files
                <input type="file" className="hidden" multiple accept=".pdf,.txt,.docx" onChange={handleFileSelect} />
              </label>
            </Button>
            <div className="flex justify-center gap-2 mt-4">
              {acceptedTypes.map((type) => (
                <Badge key={type} variant="outline" className="text-xs">
                  {type.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      { }
      <Card>
        <CardHeader>
          <CardTitle>Processing Options</CardTitle>
          <CardDescription>Configure how your document will be analyzed and simplified.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          { }
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <Label htmlFor="privacy-mode" className="text-base font-medium">
                  Privacy Mode
                </Label>
                <p className="text-sm text-muted-foreground">Anonymize names and entities before AI processing</p>
              </div>
            </div>
            <Switch id="privacy-mode" checked={privacyMode} onCheckedChange={setPrivacyMode} />
          </div>

          { }
          <div>
            <Label className="text-base font-medium mb-3 block">Explanation Level</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "basic", label: "Basic", desc: "Simple explanations" },
                { value: "intermediate", label: "Intermediate", desc: "Detailed analysis" },
                { value: "expert", label: "Expert", desc: "Legal terminology" },
              ].map((level) => (
                <Card
                  key={level.value}
                  className={`cursor-pointer transition-colors ${
                    processingLevel === level.value ? "border-primary bg-primary/5" : "hover:border-primary/50"
                  }`}
                  onClick={() => setProcessingLevel(level.value as any)}
                >
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium">{level.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{level.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      { }
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Processing Queue</CardTitle>
            <CardDescription>Track the progress of your document analysis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">{getFileIcon(file.name)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium truncate">{file.name}</h4>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(file.status)}
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>{formatFileSize(file.size)}</span>
                    <span className="capitalize">{file.status}</span>
                  </div>

                  {(file.status === "uploading" || file.status === "processing") && (
                    <Progress value={file.progress} className="h-2" />
                  )}

                  {file.status === "completed" && (
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                      <Button size="sm">Start Analysis</Button>
                    </div>
                  )}

                  {file.error && (
                    <Alert className="mt-2">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription>{file.error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      { }
      <Alert>
        <Shield className="w-4 h-4" />
        <AlertDescription>
          <strong>Privacy Notice:</strong> Your documents are processed securely and never stored permanently. All data
          is deleted after your session ends.
        </AlertDescription>
      </Alert>
    </div>
  )
}

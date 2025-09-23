"use client"

import { useChat } from "@ai-sdk/react"
import { useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  MessageSquare,
  Send,
  FileText,
  Bot,
  User,
  AlertTriangle,
  Lightbulb,
  Copy,
  CheckCircle,
  Loader2,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

export function DocumentChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your legal document assistant. I've analyzed your rental agreement and I'm ready to answer any questions you have about specific clauses, terms, or obligations. What would you like to know?",
      },
    ],
  })

  const [copiedMessage, setCopiedMessage] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestedQuestions = [
    "What happens if I leave early?",
    "Can the landlord enter without permission?",
    "How much is the security deposit?",
    "What are my maintenance responsibilities?",
    "Are pets allowed in this agreement?",
    "What happens if I don't pay rent on time?",
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSuggestedQuestion = (question: string) => {
    if (isLoading) return

    const syntheticEvent = {
      preventDefault: () => {},
      target: { value: question },
    } as any

    handleInputChange(syntheticEvent)
    setTimeout(() => {
      handleSubmit(syntheticEvent)
    }, 0)
  }

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMessage(messageId)
      setTimeout(() => setCopiedMessage(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const extractRiskLevel = (content: string): "low" | "medium" | "high" | undefined => {
    const text = content.toLowerCase()
    if (text.includes("high risk") || text.includes("significant risk") || text.includes("major risk")) return "high"
    if (text.includes("medium risk") || text.includes("moderate risk")) return "medium"
    if (text.includes("low risk") || text.includes("minimal risk")) return "low"
    return undefined
  }

  const getRiskColor = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 font-playfair">Ask Questions</h1>
        <p className="text-muted-foreground">
          Chat with your document to understand specific clauses, obligations, and terms in plain language.
        </p>
      </div>

      { }
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Active Document: Rental Agreement Sample
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-green-500" />3 clauses analyzed • AI-powered analysis ready
          </CardDescription>
        </CardHeader>
      </Card>

      { }
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error.message || "Something went wrong. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      { }
      <div className="grid lg:grid-cols-3 gap-6">
        { }
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col shadow-lg">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Document Q&A
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => {
                    const riskLevel = message.role === "assistant" ? extractRiskLevel(message.content) : undefined

                    return (
                      <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}>
                        {message.role === "assistant" && (
                          <Avatar className="w-8 h-8 bg-primary shadow-md">
                            <AvatarFallback>
                              <Bot className="w-4 h-4 text-primary-foreground" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className={`max-w-[80%] space-y-2 ${message.role === "user" ? "order-first" : ""}`}>
                          <div
                            className={`p-4 rounded-xl shadow-sm ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-muted/50 text-muted-foreground border"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>

                          {message.role === "assistant" && (
                            <div className="space-y-2">
                              { }
                              {riskLevel && (
                                <Badge className={`text-xs ${getRiskColor(riskLevel)} border shadow-sm`}>
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
                                </Badge>
                              )}

                              { }
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(message.content, message.id)}
                                  className="h-8 px-2"
                                >
                                  {copiedMessage === message.id ? (
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </Button>
                                <span className="text-xs text-muted-foreground">{new Date().toLocaleTimeString()}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {message.role === "user" && (
                          <Avatar className="w-8 h-8 bg-secondary shadow-md">
                            <AvatarFallback>
                              <User className="w-4 h-4 text-secondary-foreground" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>

              { }
              <div className="p-4 border-t bg-muted/20">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about any clause or term in your document..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()} className="px-6">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        { }
        <div className="space-y-4">
          { }
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Suggested Questions</CardTitle>
              <CardDescription className="text-sm">Common questions about rental agreements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-3 text-sm hover:bg-primary/5 transition-colors"
                  onClick={() => handleSuggestedQuestion(question)}
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          { }
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Chat Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Messages</span>
                <Badge variant="outline">{messages.length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Questions Asked</span>
                <Badge variant="outline">{messages.filter((m) => m.role === "user").length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">AI Responses</span>
                <Badge className="bg-primary/10 text-primary">
                  {messages.filter((m) => m.role === "assistant").length}
                </Badge>
              </div>
            </CardContent>
          </Card>

          { }
          <Alert className="shadow-sm">
            <Lightbulb className="w-4 h-4" />
            <AlertDescription className="text-sm">
              <strong>Tip:</strong> Ask specific questions like "What happens if..." or "Can I..." for the most helpful
              answers with real-time AI analysis.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}

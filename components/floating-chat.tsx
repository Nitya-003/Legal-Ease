"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, X, Minimize2, Bot, User, Sparkles, AlertTriangle } from "lucide-react"

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm your legal assistant. Ask me anything about your documents or legal terms.",
      },
    ],
  })

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const extractRiskLevel = (content: string): "low" | "medium" | "high" | undefined => {
    const text = content.toLowerCase()
    if (text.includes("high risk") || text.includes("significant risk")) return "high"
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

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90 group"
          size="lg"
        >
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {messages.length > 1 && (
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {messages.filter((m) => m.role === "user").length}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-2xl border-0 transition-all duration-300 ${isMinimized ? "h-14" : "h-96"}`}>
        <CardHeader className="pb-2 px-4 py-3 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Legal Assistant
              <Sparkles className="w-3 h-3 text-primary-foreground/80" />
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 hover:bg-primary-foreground/20 text-primary-foreground"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 hover:bg-primary-foreground/20 text-primary-foreground"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
              <div className="space-y-3">
                {messages.map((message) => {
                  const riskLevel = message.role === "assistant" ? extractRiskLevel(message.content) : undefined

                  return (
                    <div key={message.id} className={`flex gap-2 ${message.role === "user" ? "justify-end" : ""}`}>
                      {message.role === "assistant" && (
                        <Avatar className="w-6 h-6 bg-primary">
                          <AvatarFallback>
                            <Bot className="w-3 h-3 text-primary-foreground" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className={`max-w-[75%] space-y-1 ${message.role === "user" ? "order-first" : ""}`}>
                        <div
                          className={`p-2 rounded-lg text-xs ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground ml-auto"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <p className="leading-relaxed">{message.content}</p>
                        </div>

                        {message.role === "assistant" && riskLevel && (
                          <Badge className={`text-xs ${getRiskColor(riskLevel)} border`}>
                            <AlertTriangle className="w-2 h-2 mr-1" />
                            {riskLevel} risk
                          </Badge>
                        )}
                      </div>

                      {message.role === "user" && (
                        <Avatar className="w-6 h-6 bg-secondary">
                          <AvatarFallback>
                            <User className="w-3 h-3 text-secondary-foreground" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            <div className="p-3 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about legal terms..."
                  disabled={isLoading}
                  className="text-xs h-8"
                />
                <Button type="submit" disabled={isLoading || !input.trim()} size="sm" className="h-8 px-3">
                  <Send className="w-3 h-3" />
                </Button>
              </form>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

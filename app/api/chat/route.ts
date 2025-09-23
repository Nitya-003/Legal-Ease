import type { NextRequest } from "next/server"
import { streamText } from "ai"
import { aiModels, systemPrompts } from "@/lib/ai-config"
import { createClient } from "@/lib/supabase/server"

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const { messages, documentContext, sessionId, documentId } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Messages array is required", { status: 400 })
    }

    const supabase = createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return new Response("Authentication required", { status: 401 })
    }

    let currentSessionId = sessionId
    if (!currentSessionId && documentId) {
      const { data: session, error: sessionError } = await supabase
        .from("chat_sessions")
        .insert({
          document_id: documentId,
          user_id: user.id,
        })
        .select()
        .single()

      if (sessionError) {
        console.error("Error creating chat session:", sessionError)
        return new Response("Failed to create chat session", { status: 500 })
      }

      currentSessionId = session.id
    }

    const lastMessage = messages[messages.length - 1]
    if (currentSessionId && lastMessage.role === "user") {
      await supabase.from("chat_messages").insert({
        session_id: currentSessionId,
        role: "user",
        content: lastMessage.content,
      })
    }

    const enhancedSystemPrompt = `${systemPrompts.chatAssistant}

${documentContext ? `Document Context: ${documentContext}` : "No specific document context provided"}

Please provide helpful answers that:
1. Address the user's specific question directly
2. Reference relevant clauses or sections when applicable
3. Explain legal terms in simple, understandable language
4. Provide helpful analogies when appropriate
5. Assess risk levels (low/medium/high) when relevant
6. Suggest follow-up questions they might want to ask

Format your response as a conversational, helpful explanation.`

    const result = streamText({
      model: aiModels.fast,
      system: enhancedSystemPrompt,
      messages,
      async onFinish({ text, usage, finishReason }) {
        console.log("Chat finished:", { usage, finishReason })

        if (currentSessionId) {
          await supabase.from("chat_messages").insert({
            session_id: currentSessionId,
            role: "assistant",
            content: text,
            metadata: {
              usage,
              finishReason,
              sessionId: currentSessionId,
            },
          })
        }
      },
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat error:", error)
    return new Response("Failed to process your question. Please try again.", { status: 500 })
  }
}

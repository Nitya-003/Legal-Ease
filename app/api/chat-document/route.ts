import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages, documentContext, processingLevel } = await req.json()

    const systemPrompt = `You are a legal AI assistant helping users understand legal documents. 

    Document Context:
    ${documentContext}

    Instructions:
    - Answer questions about the provided document
    - Explain legal concepts in ${processingLevel === "basic" ? "simple, everyday language" : processingLevel === "intermediate" ? "detailed but accessible terms" : "appropriate legal terminology"}
    - Always cite specific sections or clauses when relevant
    - If asked about something not in the document, clearly state that
    - Provide practical advice when appropriate
    - Never provide specific legal advice - always recommend consulting a qualified attorney for legal decisions

    Remember: You are an educational tool, not a replacement for professional legal counsel.`

    const result = streamText({
      model: openai("gpt-4"),
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat error:", error)
    return Response.json({ error: "Failed to process chat message. Please try again." }, { status: 500 })
  }
}

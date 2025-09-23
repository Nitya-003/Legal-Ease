import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

const documentAnalysisSchema = z.object({
  summary: z.string().describe("A clear, concise summary of the document"),
  keyPoints: z.array(z.string()).describe("Main legal points and clauses"),
  risks: z
    .array(
      z.object({
        level: z.enum(["low", "medium", "high"]),
        description: z.string(),
        recommendation: z.string(),
      }),
    )
    .describe("Potential legal risks and recommendations"),
  simplifiedTerms: z
    .array(
      z.object({
        term: z.string(),
        definition: z.string(),
        context: z.string(),
      }),
    )
    .describe("Complex legal terms explained in simple language"),
  actionItems: z.array(z.string()).describe("Recommended actions or next steps"),
  confidence: z.number().min(0).max(100).describe("AI confidence level in the analysis"),
})

export async function POST(req: Request) {
  try {
    const { documentText, processingLevel, privacyMode } = await req.json()

    if (!documentText) {
      return Response.json({ error: "Document text is required" }, { status: 400 })
    }

    // Adjust prompt based on processing level
    const levelPrompts = {
      basic: "Explain in simple, everyday language that anyone can understand.",
      intermediate: "Provide detailed explanations with some legal context.",
      expert: "Use appropriate legal terminology with comprehensive analysis.",
    }

    const privacyPrompt = privacyMode
      ? "IMPORTANT: Anonymize all personal names, company names, and identifying information in your response. Replace them with generic placeholders like [PERSON A], [COMPANY B], etc."
      : ""

    const prompt = `
      ${privacyPrompt}
      
      Analyze this legal document and provide insights. ${levelPrompts[processingLevel as keyof typeof levelPrompts]}
      
      Document content:
      ${documentText}
      
      Provide a comprehensive analysis including:
      - A clear summary of what this document is about
      - Key legal points and important clauses
      - Potential risks or concerns
      - Complex legal terms explained simply
      - Recommended actions or next steps
      - Your confidence level in this analysis
    `

    const { object } = await generateObject({
      model: openai("gpt-4"),
      schema: documentAnalysisSchema,
      prompt,
      temperature: 0.3,
    })

    return Response.json({
      analysis: object,
      processingLevel,
      privacyMode,
    })
  } catch (error) {
    console.error("Document analysis error:", error)
    return Response.json({ error: "Failed to analyze document. Please try again." }, { status: 500 })
  }
}

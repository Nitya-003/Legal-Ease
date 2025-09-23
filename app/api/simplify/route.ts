import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { aiModels, systemPrompts } from "@/lib/ai-config"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

const SimplificationSchema = z.object({
  clauses: z.array(
    z.object({
      id: z.string(),
      original: z.string(),
      basic: z.string(),
      intermediate: z.string(),
      expert: z.string(),
      analogy: z.string(),
      risk: z.object({
        type: z.enum(["low", "medium", "high"]),
        severity: z.string(),
        description: z.string(),
      }),
      timeline: z.string().optional(),
    }),
  ),
  summary: z.object({
    totalClauses: z.number(),
    riskLevel: z.enum(["low", "medium", "high"]),
    processingTime: z.string(),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const { document, level, privacyMode, documentId } = await request.json()
    const startTime = Date.now()

    if (!document || document.trim().length === 0) {
      return NextResponse.json({ error: "Document content is required" }, { status: 400 })
    }

    const supabase = createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const processedDocument = privacyMode ? anonymizeDocument(document) : document

    const { object: analysis } = await generateObject({
      model: aiModels.primary,
      system: systemPrompts.documentSimplifier,
      prompt: `Analyze this legal document and break it down into clauses. For each clause, provide explanations at three levels (basic, intermediate, expert), create a helpful analogy, and assess the risk level.

Document to analyze:
${processedDocument}

Please structure your response with:
1. Individual clauses with ID, original text, three explanation levels, analogy, and risk assessment
2. Overall summary with total clauses, overall risk level, and processing metadata

Focus on making complex legal language accessible while maintaining accuracy.`,
      schema: SimplificationSchema,
    })

    const processingTime = ((Date.now() - startTime) / 1000).toFixed(1) + "s"
    analysis.summary.processingTime = processingTime

    if (documentId) {
      const { error: saveError } = await supabase.from("document_analyses").insert({
        document_id: documentId,
        analysis_type: "simplification",
        content: analysis,
        explanation_level: level || "intermediate",
      })

      if (saveError) {
        console.error("Error saving analysis:", saveError)
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Simplification error:", error)
    return NextResponse.json(
      {
        error: "Failed to process document. Please try again or contact support if the issue persists.",
      },
      { status: 500 },
    )
  }
}

function anonymizeDocument(document: string): string {
  return document
    .replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, "[NAME]") 
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN]") 
    .replace(/\b\d{3}-\d{3}-\d{4}\b/g, "[PHONE]") 
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[EMAIL]") 
    .replace(/\b\d{1,5}\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd)\b/gi, "[ADDRESS]") 
}

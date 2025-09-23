import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { aiModels, systemPrompts } from "@/lib/ai-config"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

const RiskAnalysisSchema = z.object({
  risks: z.array(
    z.object({
      id: z.string(),
      type: z.enum(["penalty", "privacy", "termination", "financial", "legal", "timeline"]),
      severity: z.enum(["low", "medium", "high", "critical"]),
      title: z.string(),
      description: z.string(),
      clauseReference: z.string(),
      impact: z.string(),
      recommendation: z.string(),
      likelihood: z.number().min(0).max(100),
    }),
  ),
  overallScore: z.number().min(0).max(100),
  summary: z.object({
    totalRisks: z.number(),
    highRisk: z.number(),
    recommendations: z.number(),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const { document, clauses, documentId } = await request.json()

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

    const { object: analysis } = await generateObject({
      model: aiModels.advanced,
      system: systemPrompts.riskAnalyzer,
      prompt: `Perform a comprehensive risk analysis of this legal document. Identify all potential risks across these categories:

1. Financial risks (penalties, fees, unexpected costs)
2. Privacy risks (access rights, data collection, inspection rights)
3. Legal risks (binding obligations, liability, breach consequences)
4. Timeline risks (deadlines, termination clauses, renewal terms)
5. Penalty risks (specific penalties, liquidated damages)
6. Termination risks (early termination, breach conditions)

Document to analyze:
${document}

${clauses ? `Previously identified clauses: ${JSON.stringify(clauses)}` : ""}

For each risk identified:
- Assign a unique ID (R1, R2, etc.)
- Categorize the risk type
- Rate severity (low, medium, high, critical)
- Provide a clear title and description
- Reference the specific clause
- Describe the potential impact
- Give actionable recommendations
- Estimate likelihood percentage (0-100%)

Also provide an overall risk score (0-100%) and summary statistics.`,
      schema: RiskAnalysisSchema,
    })

    if (documentId) {
      const riskCounts = analysis.risks.reduce(
        (acc, risk) => {
          acc[risk.type] = (acc[risk.type] || 0) + (risk.severity === "high" || risk.severity === "critical" ? 2 : 1)
          return acc
        },
        {} as Record<string, number>,
      )

      const { error: saveError } = await supabase.from("risk_assessments").insert({
        document_id: documentId,
        overall_score: analysis.overallScore,
        financial_risk: riskCounts.financial || 0,
        privacy_risk: riskCounts.privacy || 0,
        legal_risk: riskCounts.legal || 0,
        timeline_risk: riskCounts.timeline || 0,
        risks: analysis.risks,
        recommendations: analysis.risks.map((r) => r.recommendation),
      })

      if (saveError) {
        console.error("Error saving risk assessment:", saveError)
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Risk analysis error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze document risks. Please try again.",
      },
      { status: 500 },
    )
  }
}

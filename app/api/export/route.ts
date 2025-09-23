import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { aiModels } from "@/lib/ai-config"

export async function POST(request: NextRequest) {
  try {
    const { sections, format, options, documentData } = await request.json()

    let executiveSummary = ""
    if (sections.includes("executive-summary") && documentData) {
      const { text } = await generateText({
        model: aiModels.fast,
        system: "You are a legal document summarization expert. Create concise, actionable executive summaries.",
        prompt: `Create an executive summary for this legal document analysis:

Document Analysis Data:
${JSON.stringify(documentData, null, 2)}

The summary should include:
1. Document type and key purpose
2. Most critical risks and their implications
3. Key recommendations for the user
4. Overall risk assessment
5. Next steps or actions to consider

Keep it concise but comprehensive, suitable for someone who needs to quickly understand the document's implications.`,
      })
      executiveSummary = text
    }

    const mockResponse = {
      downloadUrl: `/api/download/${Date.now()}.${format}`,
      filename: `legal-analysis-${Date.now()}.${format}`,
      size: "2.4 MB",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      executiveSummary: executiveSummary || undefined,
      sections: sections,
      generatedAt: new Date().toISOString(),
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate export. Please try again.",
      },
      { status: 500 },
    )
  }
}

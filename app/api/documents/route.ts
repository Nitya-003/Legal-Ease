import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { data: documents, error } = await supabase
      .from("documents")
      .select(`
        *,
        document_analyses(id, analysis_type, created_at),
        risk_assessments(overall_score, created_at)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching documents:", error)
      return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
    }

    return NextResponse.json({ documents })
  } catch (error) {
    console.error("Documents fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, fileType, fileSize, privacyMode } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const supabase = createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { data: document, error } = await supabase
      .from("documents")
      .insert({
        user_id: user.id,
        title,
        original_content: content,
        file_type: fileType || "text/plain",
        file_size: fileSize || content.length,
        privacy_mode: privacyMode || false,
        processing_status: "uploaded",
      })
      .select()
      .single()

    if (error) {
      console.error("Error saving document:", error)
      return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
    }

    return NextResponse.json({ document })
  } catch (error) {
    console.error("Document save error:", error)
    return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
  }
}

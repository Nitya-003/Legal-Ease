export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string
          title: string
          original_content: string
          file_type: string
          file_size: number | null
          upload_date: string
          processing_status: string
          privacy_mode: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          original_content: string
          file_type: string
          file_size?: number | null
          upload_date?: string
          processing_status?: string
          privacy_mode?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          original_content?: string
          file_type?: string
          file_size?: number | null
          upload_date?: string
          processing_status?: string
          privacy_mode?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      document_analyses: {
        Row: {
          id: string
          document_id: string
          analysis_type: string
          content: any
          explanation_level: string
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          analysis_type: string
          content: any
          explanation_level?: string
          created_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          analysis_type?: string
          content?: any
          explanation_level?: string
          created_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          document_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          user_id?: string
          created_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          role: string
          content: string
          metadata: any | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: string
          content: string
          metadata?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: string
          content?: string
          metadata?: any | null
          created_at?: string
        }
      }
      risk_assessments: {
        Row: {
          id: string
          document_id: string
          overall_score: number
          financial_risk: number
          privacy_risk: number
          legal_risk: number
          timeline_risk: number
          risks: any
          recommendations: any | null
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          overall_score: number
          financial_risk?: number
          privacy_risk?: number
          legal_risk?: number
          timeline_risk?: number
          risks: any
          recommendations?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          overall_score?: number
          financial_risk?: number
          privacy_risk?: number
          legal_risk?: number
          timeline_risk?: number
          risks?: any
          recommendations?: any | null
          created_at?: string
        }
      }
    }
  }
}

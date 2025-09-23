-- LegalEase Database Schema
-- Run this script in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  original_content TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processing_status TEXT DEFAULT 'pending',
  privacy_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document analyses table
CREATE TABLE IF NOT EXISTS public.document_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
  analysis_type TEXT NOT NULL, -- 'simplification', 'risks', 'summary'
  content JSONB NOT NULL,
  explanation_level TEXT DEFAULT 'intermediate',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat sessions table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create risk assessments table
CREATE TABLE IF NOT EXISTS public.risk_assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL,
  financial_risk INTEGER DEFAULT 0,
  privacy_risk INTEGER DEFAULT 0,
  legal_risk INTEGER DEFAULT 0,
  timeline_risk INTEGER DEFAULT 0,
  risks JSONB NOT NULL,
  recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own documents" ON public.documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" ON public.documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" ON public.documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" ON public.documents
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for other tables
CREATE POLICY "Users can view own document analyses" ON public.document_analyses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.documents 
      WHERE documents.id = document_analyses.document_id 
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own document analyses" ON public.document_analyses
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.documents 
      WHERE documents.id = document_analyses.document_id 
      AND documents.user_id = auth.uid()
    )
  );

-- Chat session policies
CREATE POLICY "Users can view own chat sessions" ON public.chat_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat sessions" ON public.chat_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own chat messages" ON public.chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.chat_sessions 
      WHERE chat_sessions.id = chat_messages.session_id 
      AND chat_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own chat messages" ON public.chat_messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chat_sessions 
      WHERE chat_sessions.id = chat_messages.session_id 
      AND chat_sessions.user_id = auth.uid()
    )
  );

-- Risk assessment policies
CREATE POLICY "Users can view own risk assessments" ON public.risk_assessments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.documents 
      WHERE documents.id = risk_assessments.document_id 
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own risk assessments" ON public.risk_assessments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.documents 
      WHERE documents.id = risk_assessments.document_id 
      AND documents.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_document_analyses_document_id ON public.document_analyses(document_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_document_id ON public.chat_sessions(document_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_document_id ON public.risk_assessments(document_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

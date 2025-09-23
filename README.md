# LegalEase 📋

> AI-powered legal document simplification and analysis platform that transforms complex legal jargon into plain English with persistent data storage.


## ✨ Features

### 🤖 AI-Powered Document Simplification
- **Smart Clause Analysis**: Breaks down legal documents into digestible sections using GPT-4 Turbo
- **Multiple Explanation Levels**: Choose from basic, intermediate, or expert explanations
- **Intelligent Analogies**: Complex legal concepts explained through relatable comparisons
- **Learning Mode**: Educational tooltips and explanations for legal terminology
- **Multi-Model Support**: Leverages GPT-4, Claude 3.5 Sonnet, and GPT-3.5 Turbo for optimal results

### 🔍 Risk Detection & Analysis
- **AI-Powered Risk Assessment**: Advanced Claude 3.5 Sonnet analysis for comprehensive risk detection
- **Visual Risk Radar**: Interactive charts showing risk distribution across categories
- **Categorized Assessment**: Financial, privacy, legal, timeline, penalty, and termination risk analysis
- **Severity Ratings**: Color-coded risk levels with AI-calculated likelihood scores (0-100%)
- **Actionable Recommendations**: Specific AI-generated suggestions for risk mitigation

### 💬 Interactive Q&A Chat
- **Document-Specific Queries**: Ask questions about specific clauses or sections
- **Contextual AI Responses**: GPT-powered answers with relevant document references and analogies
- **Suggested Questions**: AI-generated common questions for each document type
- **Real-time Chat**: Instant responses with intelligent clause referencing
- **Chat History**: Persistent conversation storage with Supabase

### 🔒 Privacy-First Design & Authentication
- **Secure User Authentication**: Supabase Auth with email/password and social login options
- **Privacy Mode**: AI-powered anonymization of sensitive information before processing
- **Smart Data Masking**: Automatically detects and masks names, SSNs, emails, and addresses
- **Row Level Security**: Database-level security ensuring users only access their own data
- **Encrypted Storage**: All documents and analyses stored securely in Supabase

### 📊 Document Management & History
- **Document Library**: Persistent storage of all uploaded documents with metadata
- **Analysis History**: Track all AI analyses, risk assessments, and chat sessions
- **Search & Filter**: Find documents by title, date, risk level, or analysis type
- **Progress Tracking**: Monitor document processing status and completion
- **Bulk Operations**: Export multiple documents or analyses at once

### 📤 Export & Sharing
- **AI-Generated Executive Summaries**: Comprehensive document overviews created by AI
- **Multiple Formats**: Export as PDF, DOCX, or TXT with AI-enhanced formatting
- **Customizable Reports**: Include/exclude specific AI analysis sections
- **Shareable Links**: Generate secure links for team collaboration
- **Print-Friendly**: Optimized layouts for physical document printing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)
- OpenAI API key (for GPT models)
- Anthropic API key (for Claude models, optional but recommended)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Nitya-003/legalease.git
   cd legalease
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up Supabase**
   
   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to Project Settings > API and copy your project URL and anon key
   
   c. In the Supabase SQL Editor, run the database setup script:
   \`\`\`sql
   -- Copy and paste the contents of scripts/01-create-tables.sql
   \`\`\`

4. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your API keys to `.env.local`:
   \`\`\`env
   # Supabase Configuration (Required)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
   
   # Required for AI functionality
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Optional but recommended for advanced analysis
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   
   # App configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

7. **Create an account**
   Click "Sign Up" to create your first user account


## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui
- **AI Integration**: 
  - **Vercel AI SDK** for unified AI model access
  - **OpenAI GPT-4 Turbo** for document simplification
  - **OpenAI GPT-3.5 Turbo** for fast chat responses
  - **Anthropic Claude 3.5 Sonnet** for advanced risk analysis
  - **GPT-4o Mini** as fallback model
- **Schema Validation**: Zod for AI response validation
- **Charts**: Recharts for risk visualization
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Analytics**: Vercel Analytics

## 📖 Usage Guide

### 1. Upload Documents
- Drag and drop legal documents (PDF, DOCX, TXT)
- Enable privacy mode for AI-powered anonymization
- Select processing options (explanation level, focus areas)

### 2. AI-Powered Simplification
- Review GPT-4 generated clause breakdowns with structured analysis
- Switch between explanation levels (Basic/Intermediate/Expert)
- Explore AI-generated analogies for complex concepts
- View Claude-powered risk assessments with severity ratings

### 3. Interactive AI Chat
- Use the GPT-3.5 powered chat interface for specific questions
- Get contextual answers with automatic clause referencing
- Explore AI-suggested questions for common concerns
- Receive real-world analogies and risk assessments

### 4. Export AI Reports
- Generate comprehensive AI-powered analysis reports
- Include executive summaries created by AI
- Choose from multiple export formats
- Share results with team members

## 🎨 Design System

LegalEase uses a carefully crafted design system with a cozy, trustworthy color palette:

- **Primary**: Professional teal (`oklch(0.45 0.08 180)`)
- **Background**: Warm cream (`oklch(0.98 0.01 85)`)
- **Foreground**: Deep navy (`oklch(0.25 0.02 240)`)
- **Accent**: Light teal (`oklch(0.65 0.06 180)`)

The interface emphasizes:
- **Trust**: Professional colors and clean typography
- **Accessibility**: High contrast ratios and semantic HTML
- **Responsiveness**: Mobile-first design with adaptive layouts
- **Performance**: Optimized animations and efficient rendering

## 🔧 API Reference

### Authentication Required
All API endpoints require a valid Supabase session. Include the session token in your requests.

### POST `/api/documents`
Create and store a new document.

**Request Body:**
\`\`\`json
{
  "title": "string",
  "content": "string", 
  "fileType": "string",
  "fileSize": "number",
  "privacyMode": "boolean"
}
\`\`\`

### GET `/api/documents`
Retrieve all user documents with analysis summaries.

**Response:**
\`\`\`json
{
  "documents": [
    {
      "id": "uuid",
      "title": "string",
      "upload_date": "timestamp",
      "processing_status": "string",
      "document_analyses": "array",
      "risk_assessments": "array"
    }
  ]
}
\`\`\`

### POST `/api/simplify`
AI-powered document simplification using GPT-4 Turbo with database persistence.

**Request Body:**
\`\`\`json
{
  "document": "string",
  "level": "basic" | "intermediate" | "expert",
  "privacyMode": "boolean",
  "documentId": "uuid"
}
\`\`\`

### POST `/api/chat`
AI-powered Q&A with persistent chat history.

**Request Body:**
\`\`\`json
{
  "message": "string",
  "documentContext": "string",
  "sessionId": "uuid",
  "documentId": "uuid"
}
\`\`\`

### POST `/api/risks`
Advanced risk analysis with database storage.

**Request Body:**
\`\`\`json
{
  "document": "string",
  "clauses": "array",
  "documentId": "uuid"
}
\`\`\`

## 📊 Database Schema

LegalEase uses a comprehensive PostgreSQL schema with Row Level Security:

### Core Tables
- **profiles**: User profile information extending Supabase auth
- **documents**: Document storage with metadata and processing status
- **document_analyses**: AI-generated simplifications and analyses
- **chat_sessions**: Conversation sessions linked to documents
- **chat_messages**: Individual messages with AI metadata
- **risk_assessments**: Comprehensive risk analysis results

### Security Features
- **Row Level Security (RLS)**: Users can only access their own data
- **Authentication Required**: All API endpoints require valid user session
- **Encrypted Storage**: Sensitive data encrypted at rest
- **Audit Trail**: Comprehensive logging of all user actions

## 🔐 Authentication & Security

### User Authentication
- **Email/Password**: Standard authentication with email verification
- **Social Login**: Support for Google, GitHub, and other providers (configurable)
- **Password Reset**: Secure password recovery via email
- **Session Management**: Automatic token refresh and secure logout

### Data Security
- **Row Level Security**: Database-level access control
- **Encrypted Storage**: All sensitive data encrypted at rest
- **HTTPS Only**: All communications encrypted in transit
- **Privacy Mode**: Optional AI-powered data anonymization
- **Audit Logging**: Comprehensive activity tracking

### Environment Security
- **API Key Management**: Secure storage of AI service credentials
- **CORS Protection**: Restricted cross-origin requests
- **Rate Limiting**: Protection against abuse and excessive usage
- **Input Validation**: Comprehensive request sanitization

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   \`\`\`bash
   npx vercel
   \`\`\`

2. **Set Environment Variables**
   In your Vercel dashboard, add all environment variables from `.env.local`

3. **Configure Supabase**
   Update your Supabase project settings with your production domain

### Manual Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Set up production database**
   Run the SQL scripts in your production Supabase instance

3. **Configure environment variables**
   Set all required environment variables in your hosting platform

## 🤝 Contributing

We welcome contributions to LegalEase! Please follow these guidelines:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Reporting Issues
- Use GitHub Issues for bug reports and feature requests
- Include detailed reproduction steps
- Provide environment information (OS, browser, Node.js version)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via [GitHub Issues](https://github.com/Nitya-003/legalease/issues)
- **Discussions**: Join our [GitHub Discussions](https://github.com/Nitya-003/legalease/discussions)

## 🔄 Changelog

### v1.0.0 (Current)
- ✨ Initial release with AI-powered document simplification
- 🔍 Advanced risk analysis with Claude 3.5 Sonnet
- 💬 Interactive Q&A chat system
- 🔒 Privacy-first design with data anonymization
- 📊 Comprehensive document management
- 📤 Multi-format export capabilities

### Upcoming Features
- 📱 Mobile app for iOS and Android
- 🌐 Multi-language support
- 🔗 Integration with popular legal platforms
- 📈 Advanced analytics and reporting
- 👥 Team collaboration features

---

<p align="center">
  Made with ❤️ and 🤖 AI by the LegalEase team
</p>

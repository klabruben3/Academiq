# Academiq - App Architecture Overview

## What is Academiq?

**Academiq** is an AI-powered academic workspace designed for university students to track modules, manage assessments, plan study sessions, and stay on top of university life.

## Tech Stack

- **Framework**: Next.js 16.2.10 (App Router)
- **UI**: React 19, Tailwind CSS 4, Motion (for animations)
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI**: Vercel AI SDK with multiple providers (Groq, OpenAI, Google Gemini)
- **Auth**: Supabase SSR
- **Date handling**: date-fns

## Architecture

```
academiq/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── page.tsx            # Main app entry (redirects to /getstarted if not authenticated)
│   ├── loading.tsx         # Loading screen component
│   ├── getstarted/         # Landing page with auth
│   │   └── page.tsx        # Marketing page + sign-in/signup modal
│   └── og/                 # Open Graph image
│
├── components/
│   ├── layout/             # Main app views
│   │   ├── Academiq.tsx    # Main app shell (sidebar, routing)
│   │   ├── Dashboard.tsx   # Overview with stats, workload chart, upcoming
│   │   ├── Timeline.tsx    # Assessment timeline view
│   │   ├── CalendarView.tsx  # Calendar view
│   │   └── ModulePage.tsx  # Per-module detail page
│   ├── features/           # Feature components
│   │   ├── Analytics.tsx   # Analytics dashboard
│   │   └── ai/             # AI chat system
│   │       ├── WorkspaceConversation.tsx
│   │       ├── actions/
│   │       │   ├── chat.ts           # AI response generation
│   │       │   ├── data.ts           # System prompts
│   │       │   ├── helpers.ts        # Functions the ai and the user can have access to
│   │       │   ├── schema.ts         # Shape of the arguments the helper function may need
│   │       │   └── tools.ts          # AI tools
│   │       └── ui/                   # Chat UI components
│   └── ui/                 # Shared UI components
│
├── context/
│   └── authContext.tsx     # Supabase auth context
│
├── data/
│   ├── mockData.ts         # Mock module data
│   └── modules.ts          # Static module data imported to Academiq
│
├── lib/
│   ├── ai/                 # AI SDK configurations
│   │   ├── - groq.ts
│   │   │   - openai.ts
│   │   │   - gemini.ts
│   │   └── supabase/       # Supabase clients
│   └── helpers.ts          # Utility functions
│
├── types/
│   └── index.ts            # TypeScript interfaces
│
└── utils/
    └── calculations.ts     # Business logic (marks, workload, timeline)
```

## Core Features

### 1. **Dashboard** (`/`)
- Date display with semester week tracking
- Next assessment hero card with countdown
- Stats: Due in 7/14/30 days, semester week
- Priority focus list (high-priority assessments)
- Semester workload area chart
- Module cards with progress bars

### 2. **Navigation Views**
- **Dashboard**: Overview of all modules
- **Timeline**: Chronological assessment view
- **Calendar**: Calendar view of deadlines
- **Analytics**: Detailed stats and insights
- **Modules**: Information about each module, participation formula, assessments, score vs wight graph and target scores
- **Iris**: AI chat interface

### 3. **Module System**
Each module includes:
- Assessment components with weights, dates, study units
- Pass requirements and participation formulas
- Exam information (dates, papers, opportunities)
- Recess periods

### 4. **Iris AI Assistant**
- Chat interface for asking questions about modules
- Uses Groq (llama-3.3-70b-versatile) as primary model
- Can use OpenAI (gpt-4o) or Gemini (gemini-2.0-flash) as alternatives
- Has tool-calling capabilities
- Context-aware (receives compressed module data)

### 5. **Authentication**
- Google OAuth sign-in
- Email/password sign-in
- Supabase-based auth with user profiles
- Anonymous users redirected to `/getstarted`

## Key Business Logic

- **Participation Mark Calculation**: Weighted average of assessment scores
- **Priority Scoring**: Based on days until due, weight, and type
- **Workload Analysis**: Weekly/monthly assessment intensity
- **Exam Eligibility**: Checks if participation mark meets threshold
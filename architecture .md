# Academiq - Comprehensive Architecture Document

## 1. High-Level Architecture

### Overall Architecture
Academiq follows a **client-server architecture** with Next.js App Router, using a hybrid approach:
- **Static module data** (currently) stored in `data/modules.ts`
- **User scores/completion** stored in browser localStorage
- **Authentication** via Supabase
- **AI processing** via server actions with multiple LLM providers

### Major Folder Responsibilities

| Folder | Responsibility |
|--------|----------------|
| `app/` | Next.js App Router pages and layouts |
| `components/layout/` | Main application views (Dashboard, Timeline, Calendar, ModulePage) |
| `components/features/` | Feature-specific components (Analytics, AI chat) |
| `components/ui/` | Shared presentational components (StatCard, ProgressBar, TypeBadge) |
| `context/` | React Context providers (AuthContext) |
| `data/` | Static data definitions (MODULES) |
| `lib/` | External service configurations (AI SDKs, Supabase clients) |
| `types/` | TypeScript type definitions |
| `utils/` | Pure business logic and calculations |

### App Router Organization

```
app/
├── layout.tsx          # Root layout - wraps with AuthProvider
├── page.tsx            # Main app - server component, checks auth, renders Academiq
├── loading.tsx         # Loading screen component
├── getstarted/         # Landing page (marketing + auth)
│   └── page.tsx
└── og/                 # Open Graph image generation
```

## 2. Data Flow - Module Lifecycle

### Canonical Source of Module Data
```
data/modules.ts (MODULES constant)
    ↓
Imported by:
  - Academiq component
  - utils/calculations.ts (buildTimeline, getWorloadData)
```

### Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MODULE DATA FLOW                                  │
└─────────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────────┐
│  app/page.tsx (Server Component)                                           │
│  - Checks Supabase auth                                                    │
│  - Redirects to /getstarted if not authenticated                           │
│  - Renders components/layout/Academiq.tsx                                  │
└────────────────────────────────────────────────────────────────────────────┘
        │ ◀────── data/modules.ts (SOURCE OF TRUTH)
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  components/layout/Academiq.tsx (Client Component)                          │
│  - Imports MODULES                                                          │
│  - Manages LOCAL STATE:                                                     │
│    - scores: Record<string, number> (localStorage)                          │
│    - completed: Record<string, boolean> (localStorage)                      │
│    - view: current view state                                               │
│  - Derives: modulesWithState = MODULES.map(m => ({...m, completed: ...}))   │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ├─────────────────────────────────────────────────────────────────┤
        │                                                                 │
        ▼                                                                 ▼
┌───────────────────────────┐                                  ┌─────────────────────────┐
│  Dashboard.tsx            │                                  │  Timeline.tsx           │
│  - modules prop           │                                  │  - modules prop         │
│  - scores prop            │                                  │  - scores prop          │
│  - Calls buildTimeline    │                                  │  - Calls buildTimeline  │
│  - Calls getPriorityItems │                                  │  - onToggleComplete     │
│  - Calls getWorloadData   │                                  │                         │
└───────────────────────────┘                                  └─────────────────────────┘
        │                                                                   │
        ▼                                                                   ▼
┌───────────────────────────────┐                               ┌───────────────────────┐
│  Analytics.tsx                │                               │  CalendarView.tsx     │
│  - modules prop               │                               │  - modules prop       │
│  - scores prop                │                               │  - scores prop        │
│  - Calls buildTimeline        │                               │  - Calls buildTimeline│
│  - Calls getMonthlyWorkload   │                               └───────────────────────┘
└───────────────────────────────┘                                           │
        │                                                                   ▼
        ▼                                                       ┌─────────────────────────┐
┌───────────────────────┐                                       │  WorkspaceConversation  │
│  ModulePage.tsx       │                                       │  (Iris AI)              │
│  - module prop        │                                       │  - messages state       │
│  - scores prop        │                                       │  - typing state         │
│  - onScoreChange      │                                       │  - compressForAI()      │
└───────────────────────┘                                       └─────────────────────────┘
```

### What Happens When You Change One Module

If you modify a module in `data/modules.ts`:

1. **Immediate re-render** of all components that import MODULES
2. **Dashboard** re-computes:
   - `buildTimeline()` → new events
   - `getPriorityItems()` → new priority list
   - `getWorloadData()` → new workload chart
3. **Timeline** re-computes `buildTimeline()` and re-renders events
4. **CalendarView** re-computes `buildTimeline()` and re-renders calendar
5. **Analytics** re-computes all derived data
6. **ModulePage** (if viewing that module) re-renders with new data
7. **Iris AI** receives updated context via `compressForAI()` on next message

## 3. Source of Truth

### Single Sources of Truth

| Data | Location | Type |
|------|----------|------|
| Module definitions | `data/modules.ts` | Static constant |
| User scores | `localStorage` (key: `academiq-scores`) | Client state |
| Assessment completion | `localStorage` (key: `academiq-completed`) | Client state |
| Auth user | `context/authContext.tsx` (user state) | React Context |
| Chat messages | `Academiq.tsx` (messages state) | Component state |

### Derived Values (Not Stored)

| Value | Derived From | Where Calculated |
|-------|--------------|----------------|
| Timeline events | modules + scores | `utils/calculations.ts:buildTimeline()` |
| Priority items | timeline events | `utils/calculations.ts:getPriorityItems()` |
| Participation mark | module + scores | `utils/calculations.ts:calculateParticipationMark()` |
| Workload data | MODULES | `utils/calculations.ts:getWorloadData()` |
| Exam eligibility | module + scores | `utils/calculations.ts:isExamEligible()` |

## 4. State Management

### React Context
```
AuthContext (context/authContext.tsx)
├── user: User | null
├── isLoading: boolean
└── initialize: () => Promise<void>
```
- **Purpose**: Supabase authentication state
- **Provider**: Wraps entire app in `app/layout.tsx`
- **Consumers**: `app/getstarted/page.tsx`, any component needing auth

### Local State (Component-Level)

| Component | State | Purpose |
|-----------|-------|---------|
| Academiq.tsx | `scores` | User's assessment scores |
| Academiq.tsx | `completed` | Assessment completion status |
| Academiq.tsx | `view` | Current view (dashboard/timeline/etc) |
| Academiq.tsx | `messages` | Chat messages with Iris |
| Academiq.tsx | `typing` | AI typing indicator |
| Academiq.tsx | `sidebarOpen` | Mobile sidebar toggle |
| Timeline.tsx | `filter` | Filter by type/status |
| Timeline.tsx | `selectedModule` | Filter by module |
| CalendarView.tsx | `view` | month/week/agenda view |
| CalendarView.tsx | `current` | Current date being viewed |
| ModulePage.tsx | `editingId` | Which assessment is being edited |
| ModulePage.tsx | `inputVal` | Score input value |

### Server State
- **Supabase auth**: User session managed by Supabase SSR
- **Supabase database**: User profiles (referenced in getstarted)

## 5. Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AUTHENTICATION FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

1. User clicks "Sign In" on /getstarted
         ↓
2. app/getstarted/page.tsx
   - Uses useAuthContext() hook
   - Calls signInWithPassword() or signInWithGoogle()
         ↓
3. app/getstarted/action.ts (server action)
   - signInWithPassword: Creates Supabase session
   - signInWithPassword: Calls supabase.auth.signInWithPassword()
   - signInWithGoogle: Calls supabase.auth.signInWithOAuth()
         ↓
4. lib/supabase/client.ts
   - createClient() returns Supabase browser client
   - Uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
         ↓
5. context/authContext.tsx
   - onAuthStateChange listener updates user state
   - setUser() updates context
         ↓
6. app/getstarted/page.tsx (useEffect)
   - When user exists, checks profiles table
   - If profile exists → router.replace("/")
   - If no profile → opens signup modal
         ↓
7. app/page.tsx (Server Component)
   - createClient() (server-side)
   - supabase.auth.getUser()
   - If no user → redirect("/getstarted")
         ↓
8. components/layout/Academiq.tsx
   - Receives authenticated user (implicit)
   - Renders main application
```

**Files Involved:**
- `app/getstarted/page.tsx` - Auth UI and flow control
- `app/getstarted/action.ts` - Server actions for auth
- `lib/supabase/client.ts` - Browser client
- `lib/supabase/server.ts` - Server client (for page.tsx)
- `context/authContext.tsx` - Auth state management

## 6. AI Flow (Iris)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             IRIS AI FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────┘

1. User types message in WorkspaceConversation
         ↓
2. Academiq.tsx:handleSend()
   - Creates ChatMessage with id, role, content, ts
   - Adds to messages state
   - Calls simulateResponse()
         ↓
3. Academiq.tsx:simulateResponse()
   - Calls askAI("groq", messages, compressForAI())
         ↓
4. tests/cleanText.ts:compressForAI()
   - Extracts module data from the file/s the user uploads
   - Currently uses tests/extractedText.ts as mock data
         ↓
5. components/features/ai/actions/chat.ts:askAI()
   - Selects model (groq by default)
   - Calls generateText() from AI SDK
   - Passes messages and system prompt
         ↓
6. components/features/ai/actions/data.ts:createSystemPromt(compressedText)
   - Injects compressed module data into system prompt
   - Defines Iris behavior rules
         ↓
7. AI Model (llama-3.3-70b-versatile)
   - Processes prompt with module context
   - May call tools (addModule, addUser)
         ↓
8. Response returns to simulateResponse()
   - If tool call: handles tool result, makes secondary call and finally adds to messages state
   - If text: adds to messages state
         ↓
9. WorkspaceConversation re-renders
   - Displays new message
   - Shows typing indicator during processing
```

# Architecture

## Tech Stack
- Next.js 14 App Router
- TypeScript (strict)
- Tailwind CSS + CSS custom properties
- Framer Motion (deferred — not yet installed actively)
- Supabase (auth + PostgreSQL)
- Vercel deployment

## Folder Structure
app/
(auth)/login/         → login page
(dashboard)/
dashboard/          → all protected routes
leads/
outreach/
proposals/
settings/
layout.tsx          → dashboard shell (client component)
components/
layout/               → Sidebar, TopBar, NavItem
ui/                   → primitives (not yet built)
features/             → feature components (not yet built)
lib/
supabase/
client.ts           → browser Supabase client
server.ts           → server Supabase client
utils.ts              → cn() helper
types/index.ts        → shared types (not yet populated)
actions/                → server actions (not yet used)
docs/                   → persistent project context
middleware.ts           → route protection

## Auth Flow
- Supabase email + password
- Middleware protects /dashboard/* routes
- Unauthenticated → redirect to /login
- Authenticated + on /login → redirect to /dashboard

## Key Decisions
- No separate API routes — use server actions for mutations
- Client component for dashboard layout (needs localStorage for sidebar state)
- Sidebar collapse state stored in localStorage
- No Redux, no Zustand — local state only for now
- Tailwind v4 — config lives in globals.css @theme block, no tailwind.config.ts
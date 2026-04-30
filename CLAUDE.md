# CLAUDE.md — Claude-Specific Instructions

## Project Overview
<!-- Update this section once the project purpose is defined -->
Next.js web application.

## Critical Reminders for Claude
- **Font:** Inter (loaded via `next/font/google`) — never Geist
- **Tailwind v4+** — use native v4 syntax, no deprecated v3 classes
- **Supabase:** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — never anon key
- **middleware.ts** — check Next.js version first (v16+ uses `proxy.ts`)
- **State:** Zustand v5 — import from `zustand`, hooks API has changed from v4
- **Animation:** `motion` package (not `framer-motion` directly)

## Commit Convention
- All commit messages in **Indonesian**, detailed and descriptive

## File Ownership
| Layer | Location |
|---|---|
| UI/Components | `/src/components`, `/src/app` |
| API contract | `/src/lib/api.ts` |
| SDK wrappers | `/src/services/` |
| Types | `/src/types/` |
| State stores | `/src/store/` |

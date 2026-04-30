# CLAUDE.md — Claude-Specific Instructions

## Project Overview
<!-- Update this section once the project purpose is defined -->
Next.js web application.

## ⚠️ Critical: Deploy / Push Rules
- **NEVER run `git push` or trigger a Netlify deploy** unless Dier explicitly says to push/deploy.
- `git commit` locally is fine. `git push` is NOT unless told.
- Reason: Netlify free tier has limited build minutes — accidental pushes burn the quota.

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

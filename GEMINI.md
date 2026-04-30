# GEMINI.md — Gemini-Specific Instructions

## Project Overview
<!-- Update this section once the project purpose is defined -->
Next.js web application.

## Key Rules for Gemini
- **Always ask before acting** on anything non-trivial
- **Tailwind v4.2+** — never v3 class names, native v4 syntax only
- **Supabase:** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (not anon key)
- **Font:** Inter via `next/font/google` — configured in `layout.tsx`
- **State:** Zustand v5 with persist middleware
- **Animation:** `motion` package v12+
- **Commits:** Indonesian, detailed messages + push immediately

## Tech Stack Versions (verified at project creation: 2026-04-30)
| Package | Version |
|---|---|
| zustand | 5.0.12 |
| lucide-react | 1.12.0 |
| motion | 12.38.0 |
| @supabase/supabase-js | 2.104.1 |
| react-icons | 5.6.0 |
| clsx | 2.1.1 |

## Tailwind v4 Custom Utilities (in globals.css)
```css
.flexc        — flex row, centered
.flexcc       — flex col, centered
.transall     — transition-all 150ms ease-in-out
.transcenter  — fixed, 50/50 centered
.atranscenter — absolute, 50/50 centered
.glass        — glassmorphism surface
.gradient-text — accent gradient text
```

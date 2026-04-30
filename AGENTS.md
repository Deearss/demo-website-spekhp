<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project-Specific AI Instructions

## ⚠️ Critical: Deploy / Push Rules
- **NEVER run `git push` or trigger a Netlify deploy** unless Dier explicitly says to push/deploy.
- `git commit` locally is fine. `git push` is NOT unless told.
- Reason: Netlify free tier has limited build minutes — accidental pushes burn the quota.

## Folder Structure
```
/src/components  — reusable UI components
/src/app         — Next.js App Router pages & layouts
/src/lib         — utility functions, third-party wrappers (only file UI imports)
/src/services    — API/SDK wrappers (called by lib only)
/src/types       — TypeScript interfaces & types
/src/store       — Zustand stores
/public/images   — image assets
/public/videos   — video assets
/public/sounds   — audio assets
/docs            — project documentation
```

## Key Rules
- TypeScript strict — no `any` unless absolutely necessary
- Tailwind v4+ syntax only — no bracket overrides unless unavoidable
- All state managed via Zustand stores in `/src/store`
- Never make raw fetch calls from UI components — always go through `/src/lib/api.ts`
- Supabase: use Publishable Key (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`), never anon key

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4+, Inter font
- **State:** Zustand 5.0.12 with persist
- **Animation:** Motion 12.38.0
- **Icons:** lucide-react 1.12.0, react-icons 5.6.0
- **Database/Auth:** Supabase 2.104.1
- **Utils:** clsx 2.1.1

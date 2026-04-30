# Architecture

## Folder Structure
```
/src
  /app          — Next.js App Router (pages, layouts, loading, error)
  /components   — reusable UI components
  /lib          — API contract (api.ts) + utility helpers
  /services     — external SDK wrappers (supabase, etc.)
  /types        — TypeScript interfaces & types
  /store        — Zustand stores

/public
  /images       — static image assets
  /videos       — video assets
  /sounds       — audio assets

/docs           — project documentation
```

## Data Flow
```
UI Component
  └─▶ /src/lib/api.ts       (single entry point for all data operations)
        └─▶ /src/services/  (SDK wrappers, never called directly from UI)
              └─▶ External APIs / Supabase
```

## State Management
- Zustand stores in `/src/store/`
- UI reads from stores + calls `api.ts` functions
- Never raw fetch from components

## Auth Flow
- TBD once project purpose is defined

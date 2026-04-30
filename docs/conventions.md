# Conventions

## Naming
| Thing | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserCard.tsx` |
| Hooks | camelCase + `use` prefix | `useAuth.ts` |
| Stores | camelCase + `Store` suffix | `authStore.ts` |
| Services | camelCase + `Service` suffix | `supabaseService.ts` |
| Types | PascalCase | `User.ts`, `ApiResponse.ts` |
| API functions | camelCase verbs | `getUser()`, `createPost()` |
| CSS classes | kebab-case | `.user-card` |

## Component Structure
```tsx
// 1. Imports
// 2. Types (local, if any)
// 3. Component function
// 4. Return JSX
// 5. Export
```

## Tailwind Class Order (clsx pattern)
```tsx
clsx(
  "layout classes",      // flex, grid, positioning
  "sizing classes",      // w, h, p, m
  "visual classes",      // bg, text, border, shadow
  "state classes",       // hover:, focus:, active:
  "responsive classes",  // sm:, md:, lg:
)
```

## Commit Messages
- Language: **Indonesian**
- Format: `[area]: [what] — [why if non-obvious]`
- Example: `feat(auth): tambah Google OAuth — menggantikan email magic link`

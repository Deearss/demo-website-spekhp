# 02 — Struktur Folder

```
project-root/
│
├── data/
│   └── phones.json               → Mock data ~10 HP
│
├── public/
│   └── images/phones/            → Foto HP (bisa pakai URL eksternal)
│
├── src/
│   ├── app/
│   │   ├── page.tsx              → Homepage: listing + search + filter brand
│   │   ├── phones/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      → Halaman detail spesifikasi HP
│   │   ├── terms/
│   │   │   └── page.tsx          → Terms & Conditions
│   │   ├── privacy/
│   │   │   └── page.tsx          → Privacy Policy
│   │   └── contact/
│   │       └── page.tsx          → Contact Us
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── BrandFilter.tsx
│   │   │   └── PhoneGrid.tsx
│   │   ├── detail/
│   │   │   ├── SpecTable.tsx
│   │   │   └── AdBanner.tsx      → Placeholder slot iklan AdSense
│   │   └── shared/
│   │       └── CookieBanner.tsx  → Cookie policy popup
│   │
│   ├── lib/
│   │   └── api.ts                → SATU-SATUNYA pintu akses data dari UI
│   │
│   └── types/
│       └── phone.ts              → Type definitions
│
├── .env.local                    → Environment variables (kalau ada)
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Aturan Penting
- UI **hanya boleh** import dari `src/lib/api.ts`
- Tidak ada raw `fetch` atau akses langsung ke `phones.json` dari komponen
- Semua tipe data wajib dari `src/types/phone.ts`

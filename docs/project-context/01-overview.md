# 01 — Overview Arsitektur Demo

## Tujuan
Website demo untuk memenangkan bid freelance.
Klien minta website spesifikasi ponsel mirip GSMArena.
Demo dibangun dengan Next.js + Tailwind, di-deploy ke Netlify.

## Pendekatan
- **Tipe arsitektur**: Next.js Fullstack (tidak perlu separated backend)
- **Data**: Mock data hardcode (~10 HP) di `/data/phones.json`
- **Prinsip**: Semua akses data lewat `/src/lib/api.ts` — UI tidak boleh fetch langsung

## Tech Stack Demo
| Layer | Teknologi |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Data | Mock JSON lokal |
| Deploy | Netlify |
| Language | TypeScript |

## Catatan
Demo ini bukan produk final.
Produk final akan dibangun ulang dengan Leaf PHP + Eloquent + Blade sesuai permintaan klien.
Demo hanya untuk membuktikan pemahaman konsep & UX ke klien.

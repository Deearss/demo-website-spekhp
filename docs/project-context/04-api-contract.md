# 04 — Kontrak `src/lib/api.ts`

Ini satu-satunya file yang boleh dipanggil dari UI.
Semua logika akses data ada di sini.

## Function Signatures

```typescript
import { Phone, Brand } from "@/types/phone"

// Ambil semua HP, dengan filter opsional
export function getPhones(filter?: {
  brand?: string
  search?: string
}): Phone[]

// Ambil detail 1 HP berdasarkan slug
export function getPhoneBySlug(slug: string): Phone | null

// Ambil daftar semua brand yang tersedia
export function getBrands(): Brand[]
```

## Contoh Pemakaian dari UI

```tsx
// Homepage — tampil semua HP
const phones = getPhones()

// Homepage — filter by brand
const samsungPhones = getPhones({ brand: "Samsung" })

// Homepage — search
const results = getPhones({ search: "iPhone" })

// Detail page
const phone = getPhoneBySlug("samsung-galaxy-s24")

// BrandFilter component
const brands = getBrands()
```

## Aturan
- UI **tidak boleh** import langsung dari `data/phones.json`
- UI **tidak boleh** pakai `fetch` atau `fs.readFile` sendiri
- Kalau data source berubah (mock → real DB → API), cukup update `api.ts` — UI tidak perlu diubah

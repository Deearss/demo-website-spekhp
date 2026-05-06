# 09 — Updated Folder Structure & API Contract v2

## Perubahan dari Versi Sebelumnya

Demo diupgrade dari mock JSON lokal ke Supabase.
Dua hal yang berubah:
1. `src/lib/api.ts` — implementasi diupdate ke Supabase
2. Folder `src/lib/` ditambah 2 file baru: `supabase.ts` + `admin-api.ts`

UI komponen yang sudah ada **tidak perlu disentuh**.

---

## Folder Structure (Updated)

```
project-root/
│
├── data/
│   └── phones.json               → DEPRECATED — tidak dipakai lagi
│
├── src/
│   ├── app/
│   │   ├── page.tsx              → Homepage (tidak berubah)
│   │   ├── phones/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      → Detail page (tidak berubah)
│   │   ├── terms/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── contact/page.tsx
│   │   │
│   │   └── admin/                → ✨ BARU — semua halaman admin
│   │       ├── login/
│   │       │   └── page.tsx      → Halaman login admin
│   │       ├── page.tsx          → Dashboard admin (redirect dari /admin)
│   │       ├── phones/
│   │       │   ├── page.tsx      → Tabel daftar semua HP
│   │       │   ├── new/
│   │       │   │   └── page.tsx  → Form tambah HP baru
│   │       │   └── [slug]/
│   │       │       └── edit/
│   │       │           └── page.tsx → Form edit HP
│   │       └── layout.tsx        → Layout admin (cek auth, sidebar, navbar)
│   │
│   ├── components/
│   │   ├── layout/               → Tidak berubah
│   │   ├── home/                 → Tidak berubah
│   │   ├── detail/               → Tidak berubah
│   │   ├── shared/               → Tidak berubah
│   │   └── admin/                → ✨ BARU
│   │       ├── AdminSidebar.tsx
│   │       ├── AdminNavbar.tsx
│   │       ├── PhoneTable.tsx    → Tabel HP + search + filter + action buttons
│   │       ├── PhoneForm.tsx     → Form tambah/edit HP (shared)
│   │       └── StatsCard.tsx     → Card statistik di dashboard
│   │
│   ├── lib/
│   │   ├── supabase.ts           → ✨ BARU — Supabase client instance
│   │   ├── api.ts                → ✨ UPDATED — implementasi pakai Supabase
│   │   └── admin-api.ts          → ✨ BARU — fungsi CRUD untuk admin panel
│   │
│   └── types/
│       └── phone.ts              → Tidak berubah
```

---

## `src/lib/api.ts` — Updated (Public API)

Kontrak fungsi **tidak berubah** — UI tidak perlu disentuh.
Hanya implementasi dalamnya yang diganti dari JSON ke Supabase.

```typescript
import { supabase } from './supabase'
import { Phone, Brand } from '@/types/phone'

// Ambil semua HP, dengan filter opsional
export async function getPhones(filter?: {
  brand?: string
  search?: string
}): Promise<Phone[]> {
  let query = supabase.from('phones').select('*')

  if (filter?.brand) {
    query = query.eq('brand', filter.brand)
  }

  if (filter?.search) {
    query = query.ilike('name', `%${filter.search}%`)
  }

  const { data, error } = await query.order('release_year', { ascending: false })
  if (error) throw error
  return data as Phone[]
}

// Ambil detail 1 HP berdasarkan slug
export async function getPhoneBySlug(slug: string): Promise<Phone | null> {
  const { data, error } = await supabase
    .from('phones')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as Phone
}

// Ambil daftar semua brand yang tersedia
export async function getBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('phones')
    .select('brand')

  if (error) throw error
  const brands = [...new Set(data.map((row: any) => row.brand))] as Brand[]
  return brands.sort()
}

// Ambil related phones (brand sama, exclude current slug)
export async function getRelatedPhones(brand: string, excludeSlug: string): Promise<Phone[]> {
  const { data, error } = await supabase
    .from('phones')
    .select('*')
    .eq('brand', brand)
    .neq('slug', excludeSlug)
    .limit(4)

  if (error) throw error
  return data as Phone[]
}
```

**Catatan penting**: Karena sekarang async, semua pemanggil di UI harus pakai `await` atau handle Promise. Server Components di Next.js sudah support `async` secara native.

---

## `src/lib/admin-api.ts` — Baru (Admin CRUD API)

```typescript
import { supabase } from './supabase'
import { Phone } from '@/types/phone'

// Login admin
export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

// Logout admin
export async function adminLogout() {
  await supabase.auth.signOut()
}

// Cek session aktif
export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

// Ambil semua HP (untuk tabel admin — sama seperti getPhones tapi tanpa filter)
export async function adminGetPhones(): Promise<Phone[]> {
  const { data, error } = await supabase
    .from('phones')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Phone[]
}

// Tambah HP baru
export async function adminCreatePhone(phone: Omit<Phone, 'id'>): Promise<Phone> {
  const { data, error } = await supabase
    .from('phones')
    .insert(phone)
    .select()
    .single()
  if (error) throw error
  return data as Phone
}

// Update HP
export async function adminUpdatePhone(slug: string, updates: Partial<Phone>): Promise<Phone> {
  const { data, error } = await supabase
    .from('phones')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('slug', slug)
    .select()
    .single()
  if (error) throw error
  return data as Phone
}

// Hapus HP
export async function adminDeletePhone(slug: string): Promise<void> {
  const { error } = await supabase
    .from('phones')
    .delete()
    .eq('slug', slug)
  if (error) throw error
}

// Ambil stats untuk dashboard
export async function adminGetStats() {
  const { count: totalPhones } = await supabase
    .from('phones')
    .select('*', { count: 'exact', head: true })

  const { data: brands } = await supabase
    .from('phones')
    .select('brand')

  const totalBrands = new Set(brands?.map((b: any) => b.brand)).size

  const { data: latestPhones } = await supabase
    .from('phones')
    .select('slug, name, brand, image')
    .order('created_at', { ascending: false })
    .limit(5)

  return {
    totalPhones: totalPhones ?? 0,
    totalBrands,
    latestPhones: latestPhones ?? []
  }
}
```

---

## Aturan yang Tetap Berlaku

- UI **hanya boleh** import dari `src/lib/api.ts` (untuk public pages)
- Admin components **hanya boleh** import dari `src/lib/admin-api.ts`
- Tidak ada komponen yang boleh import `supabase` langsung
- `src/lib/supabase.ts` hanya diimport dari `api.ts` dan `admin-api.ts`

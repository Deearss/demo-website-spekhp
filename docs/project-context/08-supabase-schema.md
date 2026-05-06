# 08 — Supabase Schema & Setup

## Overview
Demo Next.js diupgrade dari mock JSON lokal ke Supabase (PostgreSQL).
Ini memungkinkan admin panel dengan real CRUD + data persisten.

---

## Tabel: `phones`

```sql
create table phones (
  id           bigint generated always as identity primary key,
  slug         text unique not null,
  brand        text not null,
  name         text not null,
  image        text,
  release_year int,

  -- Hero stats (shortcut untuk card & hero section)
  display_inches  text,
  main_camera_mp  text,
  ram_chipset     text,
  battery_mah     text,

  -- NETWORK
  network text,

  -- LAUNCH
  announced text,
  status    text,

  -- BODY
  dimensions text,
  weight     text,
  sim        text,
  ip_rating  text,

  -- DISPLAY
  display_type text,
  display_size text,
  resolution   text,

  -- PLATFORM
  os       text,
  chipset  text,
  cpu      text,
  gpu      text,

  -- MEMORY
  card_slot text,
  internal  text,

  -- MAIN CAMERA
  main_camera          text,
  main_camera_features text,
  main_camera_video    text,

  -- SELFIE CAMERA
  front_camera       text,
  front_camera_video text,

  -- SOUND
  loudspeaker text,
  jack_35mm   text,

  -- COMMS
  wlan      text,
  bluetooth text,
  nfc       text,
  usb       text,

  -- BATTERY
  battery_type text,
  charging     text,

  -- MISC
  colors    text,
  price_idr text,

  -- TIMESTAMPS
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

---

## Row Level Security (RLS)

```sql
-- Enable RLS
alter table phones enable row level security;

-- Public bisa READ semua data (pengunjung website)
create policy "Public can read phones"
  on phones for select
  using (true);

-- Hanya authenticated user (admin) yang bisa INSERT, UPDATE, DELETE
create policy "Authenticated can insert phones"
  on phones for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated can update phones"
  on phones for update
  using (auth.role() = 'authenticated');

create policy "Authenticated can delete phones"
  on phones for delete
  using (auth.role() = 'authenticated');
```

---

## Auth Setup (Supabase Auth)

Gunakan **Supabase Email Auth** bawaan — tidak perlu setup custom.

### Langkah setup:
1. Buka Supabase Dashboard → Authentication → Users
2. Klik "Add User" → isi email + password untuk akun admin Susanto
3. Matikan "Email Confirmation" di Authentication → Settings → agar login langsung bisa tanpa verifikasi email

### Contoh kredensial admin:
```
Email    : admin@webspec.id   (atau terserah)
Password : (set sendiri, kasih ke Susanto)
```

---

## Environment Variables

Tambahkan ke `.env.local` di project Next.js:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Kedua nilai ini didapat dari Supabase Dashboard → Project Settings → API Keys.

> **Catatan:** Gunakan **Publishable Key** (`sb_publishable_...`), bukan Anon Key.
> Publishable Key adalah pengganti resmi Anon Key di Supabase versi terbaru.
> Anon Key masih tersedia di tab "Legacy API Keys" tapi tidak direkomendasikan untuk project baru.

---

## Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Supabase Client Instance

Buat file `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)
```

Import `supabase` ini dari `api.ts` dan `admin-api.ts` — jangan pernah import langsung dari komponen UI.

---

## Seed Data

Setelah tabel dibuat, jalankan seed script untuk mengisi 50 HP mock data.
Lihat `11-seed-data.md` untuk daftar lengkap data HP-nya.

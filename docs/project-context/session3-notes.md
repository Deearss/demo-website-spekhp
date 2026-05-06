# Session Notes — Sesi 3: Demo Upgrade Plan

## Status Proyek
- Demo Next.js sudah live: https://demo-website-spekhp.netlify.app
- Bid status: Shortlisted
- Pak Susanto kirim broadcast ke semua bidder — minta penjelasan konsep + preview lebih detail
- Keputusan: upgrade demo dengan admin panel + Supabase sebelum balas Pak Susanto

---

## Keputusan Sesi Ini

### Upgrade Demo
Demo diupgrade dari:
- Mock JSON lokal → **Supabase (PostgreSQL)**
- Tidak ada admin panel → **Admin panel real CRUD**

Alasan: double ROI — menang bid + portofolio yang lebih kuat.

### Tech Stack Tambahan
| Tambahan | Teknologi |
|---|---|
| Database | Supabase (PostgreSQL) |
| Auth admin | Supabase Auth (email + password) |
| Admin UI | Next.js + Tailwind + PrelineUI |

### Kenapa PrelineUI (bukan ShadcnUI)
- ShadcnUI = React-based → tidak bisa dipakai di Blade (production Leaf PHP)
- PrelineUI = pure HTML/Tailwind → konsisten antara demo dan production
- Dokumentasi PrelineUI: 2169 code snippets, High reputation → AI familiar

### Alur Login Admin untuk Susanto
- Buat akun di Supabase Auth Dashboard
- Kasih email + password ke Pak Susanto
- Susanto login di `yoursite.com/admin/login`
- Bisa langsung tambah/edit/hapus data HP

---

## Dokumen yang Dibuat Sesi Ini

| File | Isi |
|---|---|
| `08-supabase-schema.md` | Schema tabel `phones`, RLS policy, auth setup, env vars |
| `09-folder-and-api-v2.md` | Updated folder structure, `api.ts` v2, `admin-api.ts` baru |
| `10-admin-panel-pages.md` | Semua halaman + komponen admin panel |
| `session3-notes.md` | File ini |

---

## Konteks Teknis Penting

### Yang Berubah dari Demo Lama
| | Sebelum | Sesudah |
|---|---|---|
| Data source | `data/phones.json` | Supabase |
| `api.ts` | Sync, baca JSON | Async, query Supabase |
| Admin | Tidak ada | Full CRUD + auth |

### Yang Tidak Berubah
- Semua public UI components (`Navbar`, `PhoneGrid`, `SpecTable`, dll)
- Struktur tipe data di `src/types/phone.ts`
- Semua public pages (`/`, `/phones/[slug]`, `/terms`, dll)
- Aturan: UI hanya boleh import dari `src/lib/api.ts`

### Catatan Penting untuk Antigravity
1. `api.ts` sekarang **async** — semua fungsi return `Promise<T>`
2. Semua Server Components yang memanggil `api.ts` harus `await`
3. Admin components hanya boleh import dari `admin-api.ts`, bukan `api.ts`
4. `supabase.ts` hanya boleh diimport dari `api.ts` dan `admin-api.ts` — tidak dari UI langsung
5. Seed 50 data HP ke Supabase setelah tabel dibuat

### Urutan Kerjaan untuk Antigravity
```
1. Install @supabase/supabase-js
2. Buat src/lib/supabase.ts
3. Update src/lib/api.ts → implementasi Supabase
4. Buat src/lib/admin-api.ts
5. Buat admin layout + auth guard
6. Buat halaman admin (login, dashboard, daftar HP, tambah, edit)
7. Buat komponen admin (Sidebar, Navbar, PhoneTable, PhoneForm, StatsCard)
8. Seed 50 data HP ke Supabase
9. Test end-to-end
10. Deploy ulang ke Netlify (tambahkan env vars di Netlify dashboard)
```

---

## Next Session
- Tunggu Antigravity selesai ngoding
- Setelah demo upgrade live, balas broadcast Pak Susanto
- Sertakan link demo + penjelasan admin panel di balasan

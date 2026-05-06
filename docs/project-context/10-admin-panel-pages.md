# 10 — Admin Panel Pages & Components

## Stack Admin Panel
- **Framework**: Next.js (App Router) — sama seperti public site
- **CSS**: Tailwind CSS + PrelineUI (via CDN atau npm)
- **Auth**: Supabase Auth (email + password)
- **Data**: `src/lib/admin-api.ts` — satu-satunya pintu akses dari admin UI

---

## Layout Admin (`src/app/admin/layout.tsx`)

Semua halaman admin dibungkus layout ini.
Layout bertanggung jawab untuk:
1. Cek apakah user sudah login — kalau belum, redirect ke `/admin/login`
2. Render sidebar + navbar admin
3. Render `{children}` di area konten

```
┌─────────────────────────────────────────────┐
│  AdminNavbar (top bar — logo + logout btn)  │
├────────────────┬────────────────────────────┤
│                │                            │
│  AdminSidebar  │    {children}              │
│                │    (konten halaman)         │
│  - Dashboard   │                            │
│  - Daftar HP   │                            │
│                │                            │
└────────────────┴────────────────────────────┘
```

---

## Halaman Login (`/admin/login`)

**Tujuan**: Form login untuk admin

**Komponen**: Form biasa (bukan pakai PhoneForm)
- Input: Email, Password
- Tombol: Login
- On submit: panggil `adminLogin(email, password)` dari `admin-api.ts`
- On success: redirect ke `/admin`
- On error: tampilkan pesan error

**Style**: Halaman full-screen centered — tidak pakai sidebar/navbar admin

---

## Halaman Dashboard (`/admin`)

**Tujuan**: Overview ringkas kondisi database

**Komponen yang dipakai**:
- `StatsCard` × 2: "Total HP" + "Total Brand"
- Tabel kecil: 5 HP yang terakhir ditambahkan

**Data yang diambil**:
```typescript
const { totalPhones, totalBrands, latestPhones } = await adminGetStats()
```

**Layout**:
```
┌──────────────────────────────────────────┐
│  Total HP: 50          Total Brand: 8    │ ← StatsCard
├──────────────────────────────────────────┤
│  HP Terbaru                              │
│  ┌─────────────────────────────────────┐ │
│  │ Nama HP        │ Brand   │ Tanggal  │ │
│  │ ...            │ ...     │ ...      │ │
│  └─────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

---

## Halaman Daftar HP (`/admin/phones`)

**Tujuan**: Lihat, search, filter, dan kelola semua HP

**Komponen yang dipakai**:
- `PhoneTable` — tabel lengkap dengan aksi

**Fitur PhoneTable**:
- Kolom: No, Nama HP, Brand, Release Year, Aksi (Edit | Hapus)
- Search bar: filter realtime by nama HP
- Filter brand: dropdown
- Tombol "Tambah HP" → navigasi ke `/admin/phones/new`
- Tombol Edit per row → navigasi ke `/admin/phones/[slug]/edit`
- Tombol Hapus per row → confirm dialog → panggil `adminDeletePhone(slug)`

**Data yang diambil**:
```typescript
const phones = await adminGetPhones()
```

---

## Halaman Tambah HP (`/admin/phones/new`)

**Tujuan**: Form untuk menambah HP baru ke database

**Komponen yang dipakai**:
- `PhoneForm` — mode: `create`

**On submit**:
```typescript
await adminCreatePhone(formData)
// → redirect ke /admin/phones
```

---

## Halaman Edit HP (`/admin/phones/[slug]/edit`)

**Tujuan**: Form untuk mengubah data HP yang sudah ada

**Komponen yang dipakai**:
- `PhoneForm` — mode: `edit`, pre-filled dengan data existing

**Data yang diambil**:
```typescript
const phone = await getPhoneBySlug(slug) // dari api.ts (bukan admin-api)
```

**On submit**:
```typescript
await adminUpdatePhone(slug, formData)
// → redirect ke /admin/phones
```

---

## Komponen Detail

### `AdminSidebar`
- Logo + nama site
- Menu navigasi:
  - Dashboard → `/admin`
  - Daftar HP → `/admin/phones`
- Highlight menu aktif berdasarkan current route

### `AdminNavbar`
- Top bar
- Kiri: nama halaman aktif (e.g. "Dashboard", "Daftar HP")
- Kanan: tombol Logout → panggil `adminLogout()` → redirect ke `/admin/login`

### `StatsCard`
Props: `{ label: string, value: number, icon?: ReactNode }`
Render card dengan angka besar + label di bawahnya.

### `PhoneTable`
Props: `{ phones: Phone[] }`
State internal: search query + selected brand filter
Render tabel dengan aksi edit & hapus per row.

### `PhoneForm`
Props:
```typescript
type PhoneFormProps = {
  mode: 'create' | 'edit'
  initialData?: Partial<Phone>  // hanya untuk mode edit
  onSubmit: (data: Phone) => Promise<void>
}
```

Form dibagi per section mengikuti kategori spesifikasi:
1. **Info Utama** — slug, brand, name, image URL, release year
2. **Hero Stats** — display inches, main camera MP, RAM/chipset, battery mAh
3. **Network & Launch** — network, announced, status
4. **Body** — dimensions, weight, SIM, IP rating
5. **Display** — display type, size, resolution
6. **Platform** — OS, chipset, CPU, GPU
7. **Memory** — card slot, internal storage
8. **Main Camera** — specs, features, video
9. **Selfie Camera** — specs, video
10. **Sound** — loudspeaker, 3.5mm jack
11. **Connectivity** — WLAN, Bluetooth, NFC, USB
12. **Battery** — battery type, charging
13. **Misc** — colors, price IDR

Tombol di bawah form:
- "Simpan" → trigger `onSubmit`
- "Batal" → navigasi kembali ke `/admin/phones`

---

## Auth Guard

Semua halaman di `/admin/*` (kecuali `/admin/login`) harus dicek apakah session aktif.

Implementasi di `src/app/admin/layout.tsx`:
```typescript
const session = await getSession()
if (!session) redirect('/admin/login')
```

Halaman `/admin/login` tidak pakai layout admin — standalone page.

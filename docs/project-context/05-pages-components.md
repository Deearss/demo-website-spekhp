# 05 — Pages & Komponen

## Pages

### `/` — Homepage
**Tujuan**: Listing semua HP + search + filter brand

**Komponen yang dipakai**:
- `Navbar`
- `SearchBar` — input teks, filter realtime
- `BrandFilter` — tombol/tab per brand
- `PhoneGrid` — grid kartu HP
- `AdBanner` — banner iklan placeholder (atas/bawah listing)
- `CookieBanner`
- `Footer`

**Data yang diambil**:
```tsx
getPhones({ brand?, search? })
getBrands()
```

---

### `/phones/[slug]` — Detail Spesifikasi
**Tujuan**: Tampil semua spesifikasi 1 HP secara lengkap

**Komponen yang dipakai**:
- `Navbar`
- `SpecTable` — tabel spesifikasi per kategori
- `AdBanner` — sidebar atau bawah konten
- `Footer`

**Data yang diambil**:
```tsx
getPhoneBySlug(slug)
```

---

### `/terms` — Terms & Conditions
Static page. Konten hardcode teks.

### `/privacy` — Privacy Policy
Static page. Konten hardcode teks.

### `/contact` — Contact Us
Static page. Bisa berisi form sederhana (non-functional di demo).

---

## Komponen Detail

### `SearchBar`
- Input teks
- Trigger filter saat user mengetik (debounce opsional)
- State dikelola di parent (Homepage)

### `BrandFilter`
- List tombol brand dari `getBrands()`
- Tombol "All" untuk reset filter
- State aktif brand dikelola di parent

### `PhoneGrid`
- Terima props `phones: Phone[]`
- Render grid kartu HP
- Tiap kartu: gambar, nama, brand, chipset, klik → `/phones/[slug]`

### `SpecTable`
- Terima props `specs: PhoneSpecs`
- Render tabel per kategori: Display, Platform, Memory, Camera, Battery, Body
- Styling tabel alternating row

### `AdBanner`
- Placeholder kotak dengan teks "Advertisement"
- Ukuran standar AdSense: 728×90 (leaderboard) atau 300×250 (medium rectangle)
- Tidak perlu AdSense asli di demo

### `CookieBanner`
- Popup fixed di bawah layar
- Tombol "Accept" → banner hilang
- State disimpan di `localStorage`

### `Navbar`
- Logo + nama site
- Link: Home, Contact
- Responsive (hamburger menu opsional)

### `Footer`
- Link: Terms, Privacy, Contact
- Copyright text

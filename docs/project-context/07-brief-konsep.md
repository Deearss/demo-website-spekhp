# 07 — Brief Konsep & Keputusan Desain

> Hasil diskusi sesi konsep — dipakai sebagai acuan saat ngoding.

---

## 🌐 Jenis Website

- Direktori informasi spesifikasi HP — mirip IMDb tapi buat HP
- Bukan toko, bukan forum, bukan blog
- Monetisasi: traffic → iklan AdSense
- Target market: Indonesia

---

## 🎨 Desain Visual

| Elemen | Keputusan |
|---|---|
| Vibe | Minimalis — iklan & konten jadi bintangnya |
| Base | Hitam `#000` + Putih `#FFF` |
| Primary | Deep Navy `#0D1B2A` — kesan premium & terpercaya |
| Secondary | Gold `#C9A84C` — luxury, kontras dari navy |

---

## 📄 Struktur Halaman

### Homepage `/`

```
Navbar
[ad-leaderboard 728×90]
[ 🔍 Cari nama HP... ]               ← hero, gede, tengah
[ All ][ Samsung ][ Apple ][ Xiaomi ] ← brand filter
─────────────────────────────────────
[ PhoneGrid ]                         ← above the fold
Footer
```

**Pattern**: Search-first layout
- User tau mau cari apa → ketik langsung di searchbar
- User browsing → klik brand filter, lihat grid
- PhoneGrid wajib keliatan tanpa scroll (above the fold)

---

### Detail Page `/phones/[slug]`

```
Navbar
[ad-leaderboard 728×90]

[ Gambar HP ]   [ Nama + Brand         ]
                [ Chipset | RAM         ]
                [ Kamera | Baterai      ]
                [ OS + versi Android    ]
                [ Harga estimasi (IDR)  ]

[ SpecTable lengkap per kategori ]    [ad-mpu-top 300×250]
                                      [ad-mpu-sticky 300×600]

[ Related Phones — brand sama ]
[ad-fluid]
Footer
```

**Pattern**: Hero snapshot + deep dive table + related phones
- Hero = jawaban instan buat user casual
- SpecTable = deep dive buat user yang serius riset
- Related Phones = user nggak langsung cabut, nambah pageview → nambah revenue iklan
- Related Phones kriteria: brand sama

---

### Terms & Conditions `/terms`
- Static page
- Teks proper (bukan lorem ipsum), standar website direktori informasi + AdSense
- Diakses dari Footer

### Privacy Policy `/privacy`
- Static page
- Teks proper, standar AdSense compliance
- Diakses dari Footer

### Contact Us `/contact`
- Static page
- Form visual: Nama, Email, Pesan + tombol Kirim
- Non-functional di demo
- Diakses dari Footer

---

## 🍪 Cookie Policy

- Muncul pertama kali user buka website
- Posisi: fixed bottom, full width
- Tombol: **Accept only** (target market Indonesia, GDPR tidak berlaku)
- Setelah Accept: disimpan ke localStorage, banner hilang permanen

---

## 📢 Iklan Placement

| Slot | Posisi | Format | Halaman |
|---|---|---|---|
| ad-leaderboard | Bawah navbar | 728×90 | Semua halaman |
| ad-mpu-top | Sidebar atas | 300×250 | Homepage, Detail |
| ad-mpu-sticky | Sidebar bawah (sticky) | 300×600 | Homepage, Detail |
| ad-fluid | Bawah related phones | Fluid | Detail |

Semua iklan di demo pakai placeholder — AdSense asli dipasang di versi production Leaf PHP.

---

## 🗄️ Mock Data

- **Jumlah**: 50 HP
- **Data**: real — HP yang beneran ada di dunia nyata
- **Distribusi brand**:

| Brand | Jumlah |
|---|---|
| Samsung | 12 |
| Apple (iPhone) | 10 |
| Xiaomi | 8 |
| OPPO | 6 |
| Vivo | 5 |
| Realme | 4 |
| OnePlus | 3 |
| Google Pixel | 2 |
| **Total** | **50** |

---

## 🧭 Navigasi

| Tipe | Implementasi |
|---|---|
| Global | Navbar — Logo, Home, Contact |
| Footer | Terms, Privacy, Contact |
| Contextual | Related Phones di detail page (brand sama) |


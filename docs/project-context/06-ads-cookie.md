# 06 — Iklan & Cookie Policy

> Berdasarkan hasil scraping GSMArena. Untuk demo, semua iklan pakai placeholder.
> Implementasi AdSense asli baru dipasang di versi Leaf PHP production.

---

## 🍪 Cookie Policy Popup

### Behavior
- Muncul saat **pertama kali** user membuka website
- Setelah klik "Accept" → **tidak muncul lagi** (disimpan ke `localStorage`)
- Posisi: **fixed bottom**, full width
- Style: bar tipis, teks + tombol Accept

### Implementasi (Demo — Next.js)
```tsx
// components/shared/CookieBanner.tsx

const CookieBanner = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted")
    if (!accepted) setVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie_accepted", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center z-50">
      <p className="text-sm">
        We use cookies to improve your experience. See our{" "}
        <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>
      <button onClick={handleAccept} className="bg-blue-500 px-4 py-2 rounded text-sm ml-4">
        Accept
      </button>
    </div>
  )
}
```

### Catatan untuk Versi Production (Leaf PHP)
- Simpan consent ke session/cookie PHP, bukan localStorage
- Untuk pengguna EU: wajib ada tombol "Reject" juga (GDPR)
- GSMArena menggunakan cookie statement yang ter-embed di Privacy Policy

---

## 📢 Struktur Iklan

### Slot Iklan (mengikuti struktur GSMArena)

| ID Slot | Posisi | Format | Ada di halaman |
|---------|--------|--------|----------------|
| `ad-leaderboard` | Atas konten, bawah navbar | 728×90 | Semua halaman |
| `ad-mpu-top` | Sidebar atas | 300×250 | Homepage, Detail |
| `ad-mpu-sticky` | Sidebar bawah (sticky scroll) | 300×600 | Homepage, Detail |
| `ad-fluid` | Di antara konten | Fluid/native | Halaman Detail |

### Komponen `AdBanner` (Demo — Placeholder)
```tsx
// components/detail/AdBanner.tsx

type AdBannerProps = {
  slot: "leaderboard" | "mpu-top" | "mpu-sticky" | "fluid"
}

const sizes = {
  "leaderboard": "w-full h-[90px]",
  "mpu-top":     "w-[300px] h-[250px]",
  "mpu-sticky":  "w-[300px] h-[600px]",
  "fluid":       "w-full h-[120px]",
}

const AdBanner = ({ slot }: AdBannerProps) => (
  <div className={`${sizes[slot]} bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center`}>
    <span className="text-xs text-gray-400 uppercase tracking-widest">Advertisement</span>
  </div>
)
```

### Penempatan per Halaman

**Homepage**:
```
Navbar
[ad-leaderboard]        ← bawah navbar
[BrandFilter + SearchBar]
[PhoneGrid]             ← konten utama
  sidebar: [ad-mpu-top]
           [ad-mpu-sticky]  ← sticky saat scroll
Footer
```

**Halaman Detail**:
```
Navbar
[ad-leaderboard]
[Hero Section HP]
[SpecTable]
  sidebar: [ad-mpu-top]
           [ad-mpu-sticky]
[ad-fluid]              ← di antara spek dan komentar
Footer
```

### Catatan untuk Versi Production (Leaf PHP)
- Ganti placeholder `<div>` dengan tag AdSense asli:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto">
</ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```
- AdSense mensyaratkan cookie policy popup ada **sebelum** iklan ditampilkan
- GSMArena menggunakan kombinasi GPT (DoubleClick) + AdSense + CleverWebServer
- Untuk demo: cukup pakai AdSense standar saja

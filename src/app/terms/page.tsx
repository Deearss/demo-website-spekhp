import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Syarat dan ketentuan penggunaan website SpecHive.",
}

export default function TermsPage() {
  const sections = [
    {
      title: "1. Penerimaan Syarat",
      body: `Dengan mengakses dan menggunakan website SpecHive ("Layanan"), Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, Anda tidak diizinkan menggunakan Layanan kami.`,
    },
    {
      title: "2. Penggunaan Layanan",
      body: `SpecHive menyediakan database informasi spesifikasi smartphone untuk tujuan informasional. Anda diizinkan menggunakan Layanan ini untuk keperluan pribadi dan non-komersial. Anda tidak boleh menggunakan Layanan ini untuk tujuan yang melanggar hukum, menyebarkan konten berbahaya, atau mengganggu operasional website.`,
    },
    {
      title: "3. Akurasi Informasi",
      body: `Kami berusaha menyajikan informasi spesifikasi yang akurat, namun tidak menjamin keakuratan, kelengkapan, atau kekinian dari seluruh data. Spesifikasi produk dapat berubah sewaktu-waktu sesuai kebijakan produsen. Selalu verifikasi informasi dengan sumber resmi produsen sebelum membuat keputusan pembelian.`,
    },
    {
      title: "4. Hak Kekayaan Intelektual",
      body: `Seluruh konten pada SpecHive, termasuk namun tidak terbatas pada teks, grafis, logo, dan desain tampilan, adalah milik SpecHive dan dilindungi oleh hukum hak cipta yang berlaku. Dilarang menyalin, mendistribusikan, atau memodifikasi konten tanpa izin tertulis.`,
    },
    {
      title: "5. Iklan Pihak Ketiga",
      body: `SpecHive menampilkan iklan dari pihak ketiga, termasuk Google AdSense. Kami tidak bertanggung jawab atas konten iklan yang ditampilkan. Interaksi Anda dengan pengiklan, termasuk pembayaran dan pengiriman barang/jasa, sepenuhnya antara Anda dan pengiklan terkait.`,
    },
    {
      title: "6. Pembatasan Tanggung Jawab",
      body: `Layanan SpecHive disediakan "sebagaimana adanya" tanpa jaminan apa pun. Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan Layanan ini.`,
    },
    {
      title: "7. Perubahan Syarat",
      body: `Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Penggunaan berkelanjutan atas Layanan setelah perubahan dianggap sebagai penerimaan Anda terhadap syarat yang diperbarui.`,
    },
    {
      title: "8. Hukum yang Berlaku",
      body: `Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa yang timbul dari penggunaan Layanan ini akan diselesaikan melalui pengadilan yang berwenang di Indonesia.`,
    },
  ]

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="mb-10">
            <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
              Terms &amp; Conditions
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-3)" }}>
              Terakhir diperbarui: 30 April 2026
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-base font-semibold mb-2 gold-text">{s.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

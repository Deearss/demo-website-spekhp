import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Kebijakan privasi dan penggunaan data pengguna SpecHive.",
}

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Informasi yang Kami Kumpulkan",
      body: `SpecHive dapat mengumpulkan informasi berikut: (a) Data penggunaan anonim melalui layanan analitik seperti Google Analytics, termasuk halaman yang dikunjungi, durasi kunjungan, dan perangkat yang digunakan; (b) Data cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman pengguna; (c) Informasi yang Anda berikan secara sukarela melalui formulir kontak.`,
    },
    {
      title: "2. Penggunaan Informasi",
      body: `Informasi yang kami kumpulkan digunakan untuk: meningkatkan fungsionalitas dan konten website; menganalisis pola penggunaan untuk pengembangan fitur; menampilkan iklan yang relevan melalui Google AdSense; dan merespons pertanyaan yang Anda kirimkan melalui formulir kontak.`,
    },
    {
      title: "3. Cookie",
      body: `Kami menggunakan cookie untuk menyimpan preferensi pengguna dan memfasilitasi fungsi website. Cookie adalah file teks kecil yang disimpan di perangkat Anda. Anda dapat menonaktifkan cookie melalui pengaturan browser, namun hal ini mungkin mempengaruhi fungsionalitas website. Dengan mengklik "Terima" pada banner cookie, Anda menyetujui penggunaan cookie kami.`,
    },
    {
      title: "4. Google AdSense & Iklan Pihak Ketiga",
      body: `Kami menggunakan Google AdSense untuk menampilkan iklan. Google menggunakan cookie DART untuk menayangkan iklan berdasarkan kunjungan Anda ke website ini dan website lain di internet. Anda dapat memilih untuk tidak menggunakan cookie DART dengan mengunjungi Google Ad and Content Network Privacy Policy. Mitra iklan pihak ketiga dapat menggunakan cookie dan teknologi serupa untuk mengumpulkan data guna menampilkan iklan yang relevan.`,
    },
    {
      title: "5. Berbagi Data dengan Pihak Ketiga",
      body: `Kami tidak menjual, menukar, atau mentransfer informasi pribadi Anda kepada pihak luar tanpa persetujuan Anda, kecuali untuk menyediakan layanan website kami atau jika diwajibkan oleh hukum yang berlaku. Ini tidak termasuk mitra website terpercaya yang membantu kami mengoperasikan website.`,
    },
    {
      title: "6. Keamanan Data",
      body: `Kami menerapkan berbagai langkah keamanan untuk menjaga keamanan informasi pribadi Anda. Namun, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman. Meskipun kami berusaha menggunakan cara yang dapat diterima secara komersial untuk melindungi informasi Anda, kami tidak dapat menjamin keamanan absolutnya.`,
    },
    {
      title: "7. Hak Pengguna",
      body: `Anda memiliki hak untuk: mengakses data pribadi yang kami miliki tentang Anda; meminta koreksi data yang tidak akurat; meminta penghapusan data Anda; menolak pemrosesan data Anda untuk tujuan tertentu. Untuk menggunakan hak-hak ini, hubungi kami melalui halaman Contact Us.`,
    },
    {
      title: "8. Perubahan Kebijakan Privasi",
      body: `Kami berhak memperbarui kebijakan privasi ini sewaktu-waktu. Perubahan akan diberitahukan melalui halaman ini. Kami menyarankan Anda untuk memeriksa halaman ini secara berkala untuk mengetahui adanya pembaruan.`,
    },
    {
      title: "9. Hubungi Kami",
      body: `Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami melalui halaman Contact Us.`,
    },
  ]

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="mb-10">
            <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
              Privacy Policy
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

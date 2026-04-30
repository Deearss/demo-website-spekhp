import type { Metadata } from "next"
import { Mail, MapPin, Clock } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ContactForm from "@/components/contact/ContactForm"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Hubungi tim WebSpec Demo untuk pertanyaan, saran, atau kerjasama.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="mb-10">
            <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
              Contact <span className="gold-text">Us</span>
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-2)" }}>
              Ada pertanyaan atau ingin bekerja sama? Kirimkan pesan kepada kami.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info cards */}
            <div className="flex flex-col gap-4">
              {[
                { icon: <Mail size={18} />, label: "Email", val: "hello@webspecdemo.id" },
                { icon: <MapPin size={18} />, label: "Lokasi", val: "Indonesia" },
                { icon: <Clock size={18} />, label: "Jam Operasional", val: "Sen–Jum, 09.00–17.00 WIB" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-xl p-4"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <span style={{ color: "var(--gold)", marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-3)" }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: "var(--text)" }}>
                      {item.val}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div
              className="lg:col-span-2 rounded-2xl p-6 sm:p-8"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

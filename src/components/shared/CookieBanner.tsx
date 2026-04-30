"use client"

import Link from "next/link"
import { useEffect, useState, startTransition } from "react"
import { Cookie, X } from "lucide-react"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted")
    if (!accepted) startTransition(() => setVisible(true))
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie_accepted", "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(13,27,42,0.98)",
        borderTop: "1px solid var(--border)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">

        {/* Icon + text */}
        <div className="flex items-start gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl mt-0.5"
            style={{ background: "var(--gold-dim)", border: "1px solid var(--border)" }}
          >
            <Cookie size={20} style={{ color: "var(--gold)" }} />
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>
              Kebijakan Cookie
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
              Kami menggunakan cookie untuk meningkatkan pengalaman Anda dan menampilkan iklan yang relevan.
              Dengan melanjutkan, Anda menyetujui{" "}
              <Link href="/privacy" className="underline transall hover:text-gold font-medium">
                Kebijakan Privasi
              </Link>{" "}
              kami.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0 pl-14 sm:pl-0">
          <button
            onClick={handleAccept}
            className="px-6 py-2.5 rounded-xl text-sm font-bold transall hover:opacity-90 whitespace-nowrap"
            style={{ background: "var(--gold)", color: "#0D1B2A" }}
          >
            Terima Semua
          </button>
          <button
            onClick={handleAccept}
            className="p-2 rounded-xl transall hover:opacity-60"
            style={{ color: "var(--text-3)" }}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

      </div>
    </div>
  )
}

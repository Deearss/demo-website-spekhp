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
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 sm:px-6"
      style={{
        background: "rgba(13,27,42,0.97)",
        borderTop: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <div className="flex items-start gap-3">
          <Cookie size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
          <p className="text-sm" style={{ color: "var(--text-2)" }}>
            Kami menggunakan cookie untuk meningkatkan pengalaman Anda dan menampilkan iklan yang relevan.
            Dengan melanjutkan, Anda menyetujui{" "}
            <Link href="/privacy" className="underline transall hover:text-[var(--gold)]">
              Kebijakan Privasi
            </Link>{" "}
            kami.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-lg text-sm font-semibold transall hover:opacity-90"
            style={{ background: "var(--gold)", color: "#0D1B2A" }}
          >
            Terima
          </button>
          <button
            onClick={handleAccept}
            className="p-2 rounded-lg transall hover:opacity-70"
            style={{ color: "var(--text-3)" }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

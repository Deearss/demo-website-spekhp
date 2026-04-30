import Link from "next/link"
import { Cpu } from "lucide-react"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-auto w-full"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg-2)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: "var(--gold)" }}
            >
              <Cpu size={14} className="text-[#0D1B2A]" />
            </div>
            <span className="font-bold">
              Spec<span className="gold-text">Hive</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm" style={{ color: "var(--text-3)" }}>
            {[
              { href: "/terms", label: "Terms & Conditions" },
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/contact", label: "Contact Us" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transall hover:text-[var(--gold)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            © {year} SpecHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Cpu } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(13,27,42,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg transall group-hover:scale-105"
              style={{ background: "var(--gold)", boxShadow: "0 0 16px rgba(201,168,76,0.4)" }}
            >
              <Cpu size={16} className="text-[#0D1B2A]" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Spec<span className="gold-text">Hive</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transall"
                style={{
                  color: pathname === l.href ? "var(--gold)" : "var(--text-2)",
                  background: pathname === l.href ? "var(--gold-dim)" : "transparent",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-lg transall"
            style={{ color: "var(--text-2)" }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="sm:hidden px-4 pb-4 flex flex-col gap-1"
          style={{ borderTop: "1px solid var(--border-2)" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium transall"
              style={{ color: pathname === l.href ? "var(--gold)" : "var(--text-2)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

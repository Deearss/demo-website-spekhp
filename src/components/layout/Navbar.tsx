"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ];

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
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="relative flex h-8 w-8 items-center justify-center rounded-lg transall group-hover:scale-105 overflow-hidden"
              style={{ boxShadow: "0 0 16px rgba(201,168,76,0.2)" }}
            >
              <Image
                src="/images/logo.png"
                alt="WebSpec Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg font-bold tracking-tight">
              WebSpec <span className="gold-text">Demo</span>
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
                  background:
                    pathname === l.href ? "var(--gold-dim)" : "transparent",
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
              style={{
                color: pathname === l.href ? "var(--gold)" : "var(--text-2)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

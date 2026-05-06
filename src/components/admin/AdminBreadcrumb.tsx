"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

// Map segment ke label yang readable
const SEGMENT_LABELS: Record<string, string> = {
  admin: "Dashboard",
  phones: "Daftar HP",
  new: "Tambah HP",
  edit: "Edit",
};

export default function AdminBreadcrumb({ phoneName }: { phoneName?: string }) {
  const pathname = usePathname();

  // Bangun crumbs dari pathname segments
  const segments = pathname.split("/").filter(Boolean);

  const crumbs: { label: string; href: string }[] = [];
  let accPath = "";

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    accPath += `/${seg}`;

    // Skip segment yang merupakan slug HP (panjang & bukan kata kunci dikenal)
    const isSlug = !SEGMENT_LABELS[seg] && i > 0 && segments[i - 1] === "phones";
    if (isSlug) continue;

    const label =
      seg === "edit" && phoneName
        ? `Edit: ${phoneName}`
        : SEGMENT_LABELS[seg] ?? seg;

    crumbs.push({ label, href: accPath });
  }

  if (crumbs.length <= 1) return null; // Cuma Dashboard, nggak perlu breadcrumb

  return (
    <nav className="flex items-center gap-1.5 text-sm text-text-3 mb-6">
      <Home size={14} className="shrink-0" />
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="shrink-0 opacity-50" />
            {isLast ? (
              <span className="text-text font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-gold transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

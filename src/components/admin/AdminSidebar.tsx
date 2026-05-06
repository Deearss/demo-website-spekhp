"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Smartphone } from "lucide-react";
import clsx from "clsx";
import KeyTip from "@/components/shared/KeyTip";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} />, key: "d" },
    {
      href: "/admin/phones",
      label: "Daftar HP",
      icon: <Smartphone size={18} />,
      key: "p",
    },
  ];

  return (
    <aside className="w-64 h-screen bg-bg-2 border-r border-surface-2 flex flex-col fixed left-0 top-0 pt-16 z-40">
      <div className="flex-1 py-6 px-4 flex flex-col gap-2">
        {links.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-surface-2 text-gold"
                  : "text-text-3 hover:text-text hover:bg-surface",
              )}
            >
              <KeyTip label={link.key} />
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

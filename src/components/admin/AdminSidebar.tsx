"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Smartphone, Plus } from "lucide-react";
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
      // Sub-action: Tambah HP
      subAction: {
        href: "/admin/phones/new",
        icon: <Plus size={14} />,
        key: "pn",
        tooltip: "Tambah HP Baru"
      }
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
            <div key={link.href} className="group/item flex items-center gap-1">
              <Link
                href={link.href}
                className={clsx(
                  "relative flex-1 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-surface-2 text-gold"
                    : "text-text-3 hover:text-text hover:bg-surface",
                )}
              >
                <KeyTip label={link.key} />
                {link.icon}
                {link.label}
              </Link>

              {/* Sub-action Button (Muncul pas hover atau pas mode Alt aktif) */}
              {link.subAction && (
                <Link
                  href={link.subAction.href}
                  title={link.subAction.tooltip}
                  className={clsx(
                    "relative p-2 rounded-lg text-text-3 hover:text-gold hover:bg-surface transition-all shrink-0",
                    "opacity-0 group-hover/item:opacity-100 focus:opacity-100", // Muncul pas hover
                    isActive && "text-gold/50"
                  )}
                >
                  <KeyTip label={link.subAction.key} />
                  {link.subAction.icon}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Smartphone, Plus, Keyboard, ExternalLink } from "lucide-react";
import clsx from "clsx";
import KeyTip from "@/components/shared/KeyTip";
import Tooltip from "@/components/shared/Tooltip";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      key: "d",
    },
    {
      href: "/admin/phones",
      label: "Daftar HP",
      icon: <Smartphone size={18} />,
      key: "p",
      subAction: {
        href: "/admin/phones/new",
        icon: <Plus size={14} />,
        key: "pn",
        tooltip: "Tambah HP Baru",
      },
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

              {/* Sub-action Button */}
              {link.subAction && (
                <Tooltip content={link.subAction.tooltip} position="right">
                  <Link
                    href={link.subAction.href}
                    className={clsx(
                      "relative p-2 rounded-lg text-text-3 hover:text-gold hover:bg-surface transition-all shrink-0",
                      "opacity-30 group-hover/item:opacity-100 focus:opacity-100",
                      isActive && "text-gold/50",
                    )}
                  >
                    <KeyTip label={link.subAction.key} />
                    {link.subAction.icon}
                  </Link>
                </Tooltip>
              )}
            </div>
          );
        })}
      </div>

      {/* Shortcut Info Card */}
      <div className="p-4 border-t border-surface-2 bg-bg-2/50 backdrop-blur-sm">
        <div className="bg-surface/50 border border-surface-2 rounded-xl p-3 relative overflow-hidden group">
          {/* Subtle background icon */}
          <Keyboard className="absolute -right-2 -bottom-2 text-gold/5 rotate-12 group-hover:rotate-0 transition-transform duration-500" size={64} />
          
          <div className="flex items-start gap-3 mb-2">
            <div className="p-1.5 rounded-lg bg-gold/10 text-gold shrink-0">
              <Keyboard size={14} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-text mb-0.5">Power User?</p>
              <p className="text-[10px] text-text-3 leading-relaxed">
                Tekan <kbd className="px-1 bg-bg-2 rounded border border-surface-2 text-gold text-[9px] font-bold">Alt</kbd> untuk mengaktifkan atau membatalkan shortcut.
              </p>
            </div>
          </div>
          
          <Link 
            href="/admin/settings"
            className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-bg-2 border border-surface-2 text-[10px] font-bold text-text-2 hover:text-gold hover:border-gold/30 transition-all"
          >
            Lihat Semua Shortcut
            <ExternalLink size={10} />
          </Link>
        </div>
      </div>
    </aside>
  );
}

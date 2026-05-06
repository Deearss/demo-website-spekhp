"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";
import { adminLogout } from "@/lib/admin-api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import KeyTip from "@/components/shared/KeyTip";
import clsx from "clsx";

interface UserInfo {
  email?: string;
  id?: string;
}

export default function AdminProfile({ user }: { user: UserInfo | null }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await adminLogout();
    router.push("/admin/login");
  };

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 p-1.5 pl-3 rounded-full bg-surface hover:bg-surface-2 border border-surface-2 transition-all group"
      >
        <div className="flex-col items-end hidden sm:flex">
          <span className="text-xs font-bold text-text line-clamp-1">Dier</span>
          <span className="text-[10px] text-text-3 line-clamp-1">
            {user?.email}
          </span>
        </div>

        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/30 bg-bg-2 flex items-center justify-center">
          <User size={18} className="text-gold" />
          {/* Label shortcut untuk buka profil/dropdown bisa L */}
          <KeyTip label="l" className="-top-1 -right-1" />
        </div>

        <ChevronDown
          size={14}
          className={clsx(
            "text-text-3 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-bg-2 border border-surface-2 rounded-xl shadow-2xl shadow-black/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-surface-2 mb-1">
            <p className="text-xs text-text-3 mb-0.5">Signed in as</p>
            <p className="text-sm font-bold text-text truncate">
              {user?.email}
            </p>
          </div>

          <Link
            href="/admin/settings"
            onClick={() => setOpen(false)}
            className="relative flex items-center gap-3 px-4 py-2 text-sm text-text-2 hover:text-text hover:bg-surface transition-colors"
          >
            <KeyTip label="," />
            <Settings size={16} />
            Settings & Shortcuts
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors mt-1"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

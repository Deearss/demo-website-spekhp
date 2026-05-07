"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";
import { adminLogout } from "@/lib/admin-api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import KeyTip from "@/components/shared/KeyTip";
import Tooltip from "@/components/shared/Tooltip";
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Tooltip content="Buka Profil & Settings" position="bottom">
        <button
          aria-label="profile-menu"
          onClick={() => setOpen(!open)}
          className={clsx(
            "cursor-pointer relative flex items-center gap-3 p-1 rounded-xl transition-all duration-200 group",
            open ? "bg-surface-2" : "hover:bg-surface",
          )}
        >
          {/* Shortcut label L */}
          <KeyTip label="l" className="-top-1 -right-1" />

          <div className="w-9 h-9 rounded-full bg-bg-2 border border-surface-2 flex items-center justify-center text-gold group-hover:border-gold/50 transition-colors">
            <User size={20} />
          </div>

          <div className="pr-2">
            <ChevronDown
              size={14}
              className={clsx(
                "text-text-3 transition-transform duration-300",
                open && "rotate-180",
              )}
            />
          </div>
        </button>
      </Tooltip>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-60 bg-bg-2 border border-surface-2 rounded-2xl shadow-2xl shadow-black/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-surface-2/50 mb-1">
            <p className="text-[10px] uppercase tracking-wider font-bold text-text-3 mb-1">
              Administrator
            </p>
            <p className="text-sm font-bold text-text truncate">
              {user?.email}
            </p>
          </div>

          <div className="px-2">
            <Link
              href="/admin/settings"
              onClick={() => setOpen(false)}
              className="relative flex items-center gap-3 px-3 py-2 text-sm text-text-2 hover:text-gold hover:bg-surface rounded-lg transition-all"
            >
              <KeyTip label="ls" />
              <Settings size={16} />
              Settings & Shortcuts
            </Link>

            <button
              onClick={handleLogout}
              className="relative w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all mt-1"
            >
              <KeyTip label="ll" />
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

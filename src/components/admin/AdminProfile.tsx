"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  LogOut,
  Settings,
  User,
  ChevronDown,
  AlertTriangle,
  X,
} from "lucide-react";
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
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = useCallback(async () => {
    await adminLogout();
    router.push("/admin/login");
  }, [router]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setShowConfirm(false);
      }
      if (e.key === "Enter" && showConfirm) {
        handleLogout();
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLogout, showConfirm]);

  return (
    <>
      <div className="relative" ref={ref}>
        <Tooltip content="Buka Profil & Settings" position="bottom">
          <button
            aria-label="profile-menu"
            onClick={() => setOpen(!open)}
            className={clsx(
              "cursor-pointer relative flex items-center gap-3 p-1 ps-3 rounded-lg transition-all duration-200 group",
              open ? "bg-surface-2" : "hover:bg-surface",
            )}
          >
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
                onClick={() => {
                  setShowConfirm(true);
                  setOpen(false);
                }}
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

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-100 flexcc p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowConfirm(false)}
          />

          <div className="relative w-full max-w-sm bg-bg-2 border border-surface-2 rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 fade-in duration-200">
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-4 right-4 text-text-3 hover:text-text transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flexcc mb-6 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 flexcc text-red-500 mb-4 border border-red-500/20">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-text">Konfirmasi Logout</h3>
              <p className="text-sm text-text-3 text-center mt-2 px-4">
                Apakah Anda yakin ingin keluar dari panel admin? Sesi Anda akan
                diakhiri.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-surface-2 text-sm font-bold text-text-2 hover:bg-surface hover:text-text transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all flexc gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>

            <div className="mt-4 text-center">
              <span className="text-[10px] text-text-3 uppercase tracking-widest">
                Tekan{" "}
                <kbd className="px-1.5 py-0.5 bg-surface border border-surface-2 rounded text-text mx-1">
                  Enter
                </kbd>{" "}
                untuk logout
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

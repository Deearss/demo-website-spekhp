"use client";

import { adminLogout } from "@/lib/admin-api";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import KeyTip from "@/components/shared/KeyTip";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await adminLogout();
    router.push("/admin/login");
  };

  return (
    <nav className="h-16 bg-bg-2 border-b border-surface-2 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight">
          Admin<span className="gold-text">Panel</span>
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="relative cursor-pointer flex items-center gap-2 text-sm text-text-3 hover:text-red-400 transition-colors"
      >
        <KeyTip label="l" />
        <LogOut size={16} />
        Logout
      </button>
    </nav>
  );
}

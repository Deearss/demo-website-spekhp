"use client";

import AdminProfile from "./AdminProfile";

interface UserInfo {
  email?: string;
  id?: string;
}

export default function AdminNavbar({ user }: { user: UserInfo | null }) {
  return (
    <nav className="h-16 bg-bg-2 border-b border-surface-2 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight">
          Admin<span className="gold-text">Panel</span>
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <AdminProfile user={user} />
      </div>
    </nav>
  );
}

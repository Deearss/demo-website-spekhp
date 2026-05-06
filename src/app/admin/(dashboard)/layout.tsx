import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import ShortcutHandler from "@/components/admin/ShortcutHandler";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bg">
      <ShortcutHandler />
      <AdminNavbar user={session.user} />
      <AdminSidebar />
      <main className="pl-64 pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

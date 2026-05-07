import { adminGetPhones } from "@/lib/admin-api";
import PhoneTable from "@/components/admin/PhoneTable";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { cookies } from "next/headers";

export default async function AdminPhonesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const cookieStore = await cookies();
  
  // Ambil dari URL dulu, kalo gak ada baru ambil dari Cookies
  const brand = (resolvedParams.brand as string) || cookieStore.get("admin-brand")?.value || "All";
  const sort = (resolvedParams.sort as string) || cookieStore.get("admin-sort")?.value || "newest";

  const phones = await adminGetPhones();

  return (
    <div className="flex flex-col gap-6">
      <AdminBreadcrumb />
      <div>
        <h1 className="text-2xl font-bold text-text mb-1">Daftar HP</h1>
        <p className="text-text-3 text-sm">Kelola data smartphone di dalam database</p>
      </div>

      <PhoneTable 
        initialPhones={phones} 
        initialBrand={brand}
        initialSort={sort}
      />
    </div>
  );
}

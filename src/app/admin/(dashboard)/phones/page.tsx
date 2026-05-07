import { adminGetPhones } from "@/lib/admin-api";
import PhoneTable from "@/components/admin/PhoneTable";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export default async function AdminPhonesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
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
        initialBrand={resolvedParams.brand as string}
        initialSort={resolvedParams.sort as string}
      />
    </div>
  );
}

import { adminGetPhones } from "@/lib/admin-api";
import PhoneTable from "@/components/admin/PhoneTable";

export default async function AdminPhonesPage() {
  const phones = await adminGetPhones();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text mb-1">Daftar HP</h1>
        <p className="text-text-3 text-sm">Kelola data smartphone di dalam database</p>
      </div>

      <PhoneTable initialPhones={phones} />
    </div>
  );
}

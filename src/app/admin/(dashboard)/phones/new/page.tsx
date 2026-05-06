"use client";
import type { Phone } from "@/types/phone";

import PhoneForm from "@/components/admin/PhoneForm";
import { adminCreatePhone } from "@/lib/admin-api";
import { useRouter } from "next/navigation";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export default function NewPhonePage() {
  const router = useRouter();

  const handleSubmit = async (data: Partial<Phone>) => {
    await adminCreatePhone(data);
    router.push("/admin/phones");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <AdminBreadcrumb />
      <div>
        <h1 className="text-2xl font-bold text-text mb-1">Tambah HP Baru</h1>
        <p className="text-text-3 text-sm">Masukkan data spesifikasi smartphone dengan lengkap</p>
      </div>

      <PhoneForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}

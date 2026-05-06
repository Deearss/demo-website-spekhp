"use client";

import { useEffect, useState, use } from "react";
import PhoneForm from "@/components/admin/PhoneForm";
import { adminUpdatePhone } from "@/lib/admin-api";
import { getPhoneBySlug } from "@/lib/api";
import { useRouter } from "next/navigation";
import type { Phone } from "@/types/phone";
import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";

export default function EditPhonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPhoneBySlug(slug).then(data => {
      setPhone(data);
      setIsLoading(false);
    });
  }, [slug]);

  const handleSubmit = async (data: Partial<Phone>) => {
    await adminUpdatePhone(slug, data);
    router.push("/admin/phones");
    router.refresh();
  };

  if (isLoading) {
    return <div className="text-text-3">Loading data...</div>;
  }

  if (!phone) {
    return <div className="text-red-400">Data HP tidak ditemukan.</div>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <AdminBreadcrumb phoneName={phone.name} />
      <div>
        <h1 className="text-2xl font-bold text-text mb-1">Edit HP: {phone.name}</h1>
        <p className="text-text-3 text-sm">Perbarui data spesifikasi smartphone</p>
      </div>

      <PhoneForm mode="edit" initialData={phone} onSubmit={handleSubmit} />
    </div>
  );
}

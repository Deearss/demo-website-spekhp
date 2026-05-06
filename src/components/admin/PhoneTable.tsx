"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Edit, Trash2, Plus, AlertTriangle } from "lucide-react";
import { adminDeletePhone } from "@/lib/admin-api";
import { useRouter } from "next/navigation";
import type { Phone } from "@/types/phone";
import { useToastStore } from "@/store/useToastStore";

export default function PhoneTable({
  initialPhones,
}: {
  initialPhones: Phone[];
}) {
  const [phones, setPhones] = useState<Phone[]>(initialPhones);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ slug: string; name: string } | null>(null);
  const router = useRouter();
  const { showToast } = useToastStore();

  const brands = [
    "All",
    ...Array.from(new Set(initialPhones.map((p) => p.brand))).sort(),
  ];

  const filteredPhones = phones.filter((p) => {
    const matchBrand = brand === "All" || p.brand === brand;
    const matchSearch =
      search === "" || p.name.toLowerCase().includes(search.toLowerCase());
    return matchBrand && matchSearch;
  });

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(itemToDelete.slug);
    try {
      await adminDeletePhone(itemToDelete.slug);
      setPhones(phones.filter((p) => p.slug !== itemToDelete.slug));
      router.refresh();
      showToast(`${itemToDelete.name} berhasil dihapus!`, "success");
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Gagal menghapus data", "error");
    } finally {
      setIsDeleting(null);
      setItemToDelete(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3"
              size={16}
            />
            <input
              type="text"
              placeholder="Cari nama HP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-bg-2 border border-surface-2 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-gold transition-colors text-text"
            />
          </div>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="bg-bg-2 border border-surface-2 rounded-lg px-4 py-2 text-sm outline-none focus:border-gold transition-colors text-text"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <Link
          href="/admin/phones/new"
          className="flex items-center gap-2 bg-surface hover:bg-surface-2 border border-surface-2 rounded-lg text-text font-bold px-4 py-2 transition-colors text-sm shrink-0"
        >
          <Plus size={16} />
          Tambah HP
        </Link>
      </div>

      <div className="bg-surface border border-surface-2 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-2 text-text-3">
              <tr>
                <th className="px-6 py-4 font-medium w-16">No</th>
                <th className="px-6 py-4 font-medium">Gambar</th>
                <th className="px-6 py-4 font-medium">Nama HP</th>
                <th className="px-6 py-4 font-medium">Brand</th>
                <th className="px-6 py-4 font-medium">Rilis</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-2">
              {filteredPhones.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-3">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                filteredPhones.map((phone, i) => (
                  <tr
                    key={phone.slug}
                    className="hover:bg-bg-2/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-text-3">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="relative w-10 h-10 bg-bg rounded p-1">
                        <Image
                          src={phone.image || "https://via.placeholder.com/150"}
                          alt={phone.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-text">
                      {phone.name}
                    </td>
                    <td className="px-6 py-4 text-text-3">{phone.brand}</td>
                    <td className="px-6 py-4 text-text-3">
                      {phone.releaseYear}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/phones/${phone.slug}/edit`}
                          className="p-1.5 text-text-3 hover:text-gold hover:bg-gold/10 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => setItemToDelete({ slug: phone.slug, name: phone.name })}
                          disabled={isDeleting === phone.slug}
                          className="p-1.5 text-text-3 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors disabled:opacity-50"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-bg border border-surface-2 rounded-xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <div className="p-2 bg-red-400/10 rounded-full">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold">Hapus Data?</h3>
            </div>
            <p className="text-text-2 mb-6">
              Yakin mau hapus <span className="font-bold text-text">{itemToDelete.name}</span>? Aksi ini tidak bisa dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                disabled={isDeleting !== null}
                className="px-4 py-2 text-sm font-medium text-text bg-surface hover:bg-surface-2 rounded-lg transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting !== null}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

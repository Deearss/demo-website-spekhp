"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";
import { adminDeletePhone } from "@/lib/admin-api";
import { useRouter } from "next/navigation";
import type { Phone } from "@/types/phone";
import { useToastStore } from "@/store/useToastStore";
import DropdownSelect from "@/components/shared/DropdownSelect";

const PAGE_SIZE = 15;
type SortKey = "name" | "brand" | "releaseYear";
type SortDir = "asc" | "desc";

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown size={14} className="opacity-30" />;
  return sortDir === "asc"
    ? <ChevronUp size={14} className="text-gold" />
    : <ChevronDown size={14} className="text-gold" />;
}

function SortTh({
  col,
  label,
  sortKey,
  sortDir,
  onSort,
}: {
  col: SortKey;
  label: string;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (col: SortKey) => void;
}) {
  return (
    <th
      className="px-6 py-4 font-medium cursor-pointer select-none hover:text-text transition-colors"
      onClick={() => onSort(col)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
      </div>
    </th>
  );
}

export default function PhoneTable({ initialPhones }: { initialPhones: Phone[] }) {
  const [phones, setPhones] = useState<Phone[]>(initialPhones);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ slug: string; name: string } | null>(null);

  // Sorting
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Pagination
  const [page, setPage] = useState(1);

  const router = useRouter();
  const { showToast } = useToastStore();

  const brands = [
    "All",
    ...Array.from(new Set(initialPhones.map((p) => p.brand))).sort(),
  ];

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1); // reset ke page 1 ketika sort berubah
  };

  const filteredAndSorted = useMemo(() => {
    const filtered = phones.filter((p) => {
      const matchBrand = brand === "All" || p.brand === brand;
      const matchSearch =
        search === "" || p.name.toLowerCase().includes(search.toLowerCase());
      return matchBrand && matchSearch;
    });

    return filtered.sort((a, b) => {
      const aVal = a[sortKey] ?? "";
      const bVal = b[sortKey] ?? "";
      const cmp = String(aVal).localeCompare(String(bVal), "id", { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [phones, search, brand, sortKey, sortDir]);

  // Reset ke page 1 kalau filter/search berubah (via useEffect-free approach)
  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedPhones = filteredAndSorted.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleBrandChange = (value: string) => {
    setBrand(value);
    setPage(1);
  };

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
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3" size={16} />
            <input
              type="text"
              placeholder="Cari nama HP..."
              value={search}
              onChange={handleSearchChange}
              className="w-full bg-bg-2 border border-surface-2 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-gold transition-colors text-text"
            />
          </div>
          <DropdownSelect
            value={brand}
            onChange={handleBrandChange}
            options={brands.map((b) => ({ value: b, label: b }))}
          />
        </div>

        <Link
          href="/admin/phones/new"
          className="flex items-center gap-2 bg-surface hover:bg-surface-2 border border-surface-2 rounded-lg text-text font-bold px-4 py-2 transition-colors text-sm shrink-0"
        >
          <Plus size={16} />
          Tambah HP
        </Link>
      </div>

      {/* Tabel */}
      <div className="bg-surface border border-surface-2 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-2 text-text-3">
              <tr>
                <th className="px-6 py-4 font-medium w-16">No</th>
                <th className="px-6 py-4 font-medium">Gambar</th>
                <SortTh col="name" label="Nama HP" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <SortTh col="brand" label="Brand" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <SortTh col="releaseYear" label="Rilis" sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-2">
              {paginatedPhones.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-text-3">
                      <Package size={40} className="opacity-30" />
                      <p className="font-medium">Nggak ada HP yang cocok dengan pencarian ini</p>
                      <p className="text-sm opacity-60">Coba ubah filter atau kata kunci pencarian</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedPhones.map((phone, i) => (
                  <tr key={phone.slug} className="hover:bg-bg-2/50 transition-colors">
                    <td className="px-6 py-4 text-text-3">
                      {(safePage - 1) * PAGE_SIZE + i + 1}
                    </td>
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
                    <td className="px-6 py-4 font-medium text-text">{phone.name}</td>
                    <td className="px-6 py-4 text-text-3">{phone.brand}</td>
                    <td className="px-6 py-4 text-text-3">{phone.releaseYear}</td>
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

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-6 py-3 border-t border-surface-2 bg-bg-2/50">
            <p className="text-xs text-text-3">
              {filteredAndSorted.length} HP •{" "}
              halaman {safePage} dari {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="p-1.5 rounded text-text-3 hover:text-text hover:bg-surface-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-text-3 text-xs">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                        safePage === p
                          ? "bg-gold text-bg-2"
                          : "text-text-3 hover:text-text hover:bg-surface-2"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="p-1.5 rounded text-text-3 hover:text-text hover:bg-surface-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
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
              Yakin mau hapus{" "}
              <span className="font-bold text-text">{itemToDelete.name}</span>?{" "}
              Aksi ini tidak bisa dibatalkan.
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

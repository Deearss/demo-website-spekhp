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
import KeyTip from "@/components/shared/KeyTip";
import Tooltip from "@/components/shared/Tooltip";
import clsx from "clsx";

const PAGE_SIZE = 15;
type SortKey = "name" | "brand" | "releaseYear" | "createdAt";
type SortDir = "asc" | "desc";

function SortIcon({
  col,
  sortKey,
  sortDir,
}: {
  col: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
}) {
  if (col !== sortKey)
    return <ChevronsUpDown size={14} className="opacity-30" />;
  return sortDir === "asc" ? (
    <ChevronUp size={14} className="text-gold" />
  ) : (
    <ChevronDown size={14} className="text-gold" />
  );
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
  sortKey: SortKey | null;
  sortDir: SortDir;
  onSort: (col: SortKey) => void;
}) {
  return (
    <th
      className="px-6 py-4 font-medium cursor-pointer select-none hover:text-text transition-colors group/th"
      onClick={() => onSort(col)}
    >
      <div className="flex items-center gap-1.5">
        {label}
        <div className={clsx(
          "transition-opacity",
          sortKey === col ? "opacity-100" : "opacity-0 group-hover/th:opacity-50"
        )}>
          <SortIcon col={col} sortKey={sortKey as SortKey} sortDir={sortDir} />
        </div>
      </div>
    </th>
  );
}

export default function PhoneTable({
  initialPhones,
}: {
  initialPhones: Phone[];
}) {
  const [phones, setPhones] = useState<Phone[]>(initialPhones);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{
    slug: string;
    name: string;
  } | null>(null);

  // Global Sorting
  const [globalSort, setGlobalSort] = useState("newest");

  // Local Sorting (null berarti nurut Global Sort)
  const [localSortKey, setLocalSortKey] = useState<SortKey | null>(null);
  const [localSortDir, setLocalSortDir] = useState<SortDir>("asc");

  // Pagination
  const [page, setPage] = useState(1);

  const router = useRouter();
  const { showToast } = useToastStore();

  const brands = [
    "All",
    ...Array.from(new Set(initialPhones.map((p) => p.brand))).sort(),
  ];

  const globalSortOptions = [
    { value: "newest", label: "Terbaru" },
    { value: "updated", label: "Terakhir Diupdate" },
    { value: "oldest", label: "Terlama" },
    { value: "name-asc", label: "Nama A-Z" },
    { value: "name-desc", label: "Nama Z-A" },
  ];

  const handleLocalSort = (key: SortKey) => {
    if (localSortKey === key) {
      setLocalSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setLocalSortKey(key);
      setLocalSortDir("asc");
    }
  };

  // 1. Filter dan Global Sort
  const globallyFilteredAndSorted = useMemo(() => {
    const result = phones.filter((p) => {
      const matchBrand = brand === "All" || p.brand === brand;
      const matchSearch =
        search === "" || p.name.toLowerCase().includes(search.toLowerCase());
      return matchBrand && matchSearch;
    });

    return result.sort((a, b) => {
      switch (globalSort) {
        case "newest":
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        case "updated":
          return (
            new Date(b.updatedAt || b.createdAt || 0).getTime() -
            new Date(a.updatedAt || a.createdAt || 0).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
          );
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [phones, search, brand, globalSort]);

  // 2. Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(globallyFilteredAndSorted.length / PAGE_SIZE),
  );
  const safePage = Math.min(page, totalPages);
  const rawPaginatedPhones = globallyFilteredAndSorted.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  // 3. Local Sorting (HANYA jalan kalo admin klik header tabel)
  const paginatedPhones = useMemo(() => {
    if (!localSortKey) return rawPaginatedPhones;
    
    return [...rawPaginatedPhones].sort((a, b) => {
      let cmp = 0;
      if (localSortKey === "createdAt") {
        cmp =
          new Date(a.createdAt || 0).getTime() -
          new Date(b.createdAt || 0).getTime();
      } else {
        const aVal = String(a[localSortKey] ?? "");
        const bVal = String(b[localSortKey] ?? "");
        cmp = aVal.localeCompare(bVal, "id", { numeric: true });
      }
      if (cmp === 0 && localSortKey !== "name") {
        cmp = a.name.localeCompare(b.name, "id");
      }
      return localSortDir === "asc" ? cmp : -cmp;
    });
  }, [rawPaginatedPhones, localSortKey, localSortDir]);

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
    <div className="flex flex-col gap-6 pb-20 relative">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <KeyTip label="f" />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3"
              size={16}
            />
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
          <DropdownSelect
            value={globalSort}
            onChange={setGlobalSort}
            options={globalSortOptions}
          />
        </div>

        <Link
          href="/admin/phones/new"
          className="relative flex items-center gap-2 bg-surface hover:bg-surface-2 border border-surface-2 rounded-lg text-text font-bold px-4 py-2 transition-colors text-sm shrink-0"
        >
          <KeyTip label="n" />
          <Plus size={16} />
          Tambah HP
        </Link>
      </div>

      {/* Tabel Container */}
      <div className="bg-surface border border-surface-2 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-2 text-text-3 border-b border-surface-2">
              <tr>
                <th className="px-6 py-4 font-medium w-16">No</th>
                <th className="px-6 py-4 font-medium">Gambar</th>
                <SortTh
                  col="name"
                  label="Nama HP"
                  sortKey={localSortKey}
                  sortDir={localSortDir}
                  onSort={handleLocalSort}
                />
                <SortTh
                  col="brand"
                  label="Brand"
                  sortKey={localSortKey}
                  sortDir={localSortDir}
                  onSort={handleLocalSort}
                />
                <SortTh
                  col="releaseYear"
                  label="Rilis"
                  sortKey={localSortKey}
                  sortDir={localSortDir}
                  onSort={handleLocalSort}
                />
                <SortTh
                  col="createdAt"
                  label="Ditambahkan"
                  sortKey={localSortKey}
                  sortDir={localSortDir}
                  onSort={handleLocalSort}
                />
                <th className="px-6 py-4 font-medium">Update</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-2">
              {paginatedPhones.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-text-3">
                      <Package size={40} className="opacity-30" />
                      <p className="font-medium">Nggak ada HP yang cocok</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedPhones.map((phone, i) => (
                  <tr
                    key={phone.slug}
                    className="hover:bg-bg-2/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-text-3">
                      {(safePage - 1) * PAGE_SIZE + i + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative w-10 h-10 bg-bg rounded p-1">
                        <Image
                          src={phone.image || ""}
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
                    <td className="px-6 py-4 text-text-3 text-xs">
                      {phone.createdAt
                        ? new Date(phone.createdAt).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "short", year: "numeric" },
                          )
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-text-3 text-xs">
                      {phone.updatedAt
                        ? new Date(phone.updatedAt).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "short", year: "numeric" },
                          )
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Tooltip content="Edit Spesifikasi" position="left">
                          <Link
                            href={`/admin/phones/${phone.slug}/edit`}
                            className="p-1.5 text-text-3 hover:text-gold hover:bg-gold/10 rounded transition-colors"
                          >
                            <Edit size={16} />
                          </Link>
                        </Tooltip>

                        <Tooltip content="Hapus Data" position="left">
                          <button
                            onClick={() =>
                              setItemToDelete({
                                slug: phone.slug,
                                name: phone.name,
                              })
                            }
                            disabled={isDeleting === phone.slug}
                            className="p-1.5 text-text-3 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer - REAL Floating Sticky */}
      {totalPages > 1 && (
        <div className="sticky bottom-6 z-30 mt-4 self-center w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-3 bg-bg-2/90 backdrop-blur-xl border border-surface-2 rounded-2xl shadow-2xl shadow-black/50">
            <p className="text-xs text-text-3 font-medium whitespace-nowrap">
              <span className="text-gold">
                {globallyFilteredAndSorted.length}
              </span>
              {" data "}
              HP • hal {safePage} / {totalPages}
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="p-1.5 rounded-lg text-text-3 hover:text-text hover:bg-surface-2 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - safePage) <= 1,
                  )
                  .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && p - (arr[idx - 1] as number) > 1)
                      acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    p === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-1 text-text-3"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p as number)}
                        className={clsx(
                          "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                          safePage === p
                            ? "bg-gold text-bg-2 shadow-lg shadow-gold/20"
                            : "text-text-3 hover:text-text hover:bg-surface-2",
                        )}
                      >
                        {p}
                      </button>
                    ),
                  )}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="p-1.5 rounded-lg text-text-3 hover:text-text hover:bg-surface-2 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-100 flexcc p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setItemToDelete(null)}
          />
          <div className="relative bg-bg border border-surface-2 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold">Hapus Data?</h3>
            </div>
            <p className="text-text-2 mb-6">
              Yakin mau hapus{" "}
              <span className="font-bold text-text">{itemToDelete.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 text-sm font-bold text-text-2 bg-surface hover:bg-surface-2 rounded-xl transition-all"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting !== null}
                className="px-4 py-2 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all flexc gap-2 shadow-lg shadow-red-500/20"
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

import { adminGetStats } from "@/lib/admin-api";
import StatsCard from "@/components/admin/StatsCard";
import { Smartphone, Layers, CalendarPlus, Edit, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = await adminGetStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-text mb-1">Dashboard</h1>
        <p className="text-text-3 text-sm">Ringkasan data spesifikasi smartphone</p>
      </div>

      {/* Stats Cards — 3 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          label="Total HP"
          value={stats.totalPhones}
          icon={<Smartphone size={16} />}
        />
        <StatsCard
          label="Total Brand"
          value={stats.totalBrands}
          icon={<Layers size={16} />}
        />
        <StatsCard
          label="Ditambahkan Bulan Ini"
          value={stats.thisMonth}
          icon={<CalendarPlus size={16} />}
        />
      </div>

      {/* Tabel HP Baru */}
      <div className="bg-surface border border-surface-2 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-2 flex items-center justify-between">
          <h2 className="font-semibold text-text">HP Baru Ditambahkan</h2>
          <Link
            href="/admin/phones"
            className="flex items-center gap-1.5 text-sm text-gold hover:text-gold-light transition-colors font-medium"
          >
            Lihat Semua
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-2 text-text-3">
              <tr>
                <th className="px-6 py-3 font-medium">Gambar</th>
                <th className="px-6 py-3 font-medium">Nama HP</th>
                <th className="px-6 py-3 font-medium">Brand</th>
                <th className="px-6 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-2">
              {stats.latestPhones.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-3">
                    Belum ada data
                  </td>
                </tr>
              ) : (
                stats.latestPhones.map(
                  (phone: { slug: string; name: string; brand: string; image: string }) => (
                    <tr key={phone.slug} className="hover:bg-bg-2/50 transition-colors">
                      <td className="px-6 py-3">
                        <div className="relative w-10 h-10 bg-bg rounded p-1">
                          <Image
                            src={phone.image}
                            alt={phone.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-3 font-medium text-text">{phone.name}</td>
                      <td className="px-6 py-3 text-text-3">{phone.brand}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/admin/phones/${phone.slug}/edit`}
                            className="p-1.5 text-text-3 hover:text-gold hover:bg-gold/10 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </Link>
                          <Link
                            href={`/admin/phones`}
                            className="p-1.5 text-text-3 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                            title="Hapus (via Daftar HP)"
                          >
                            <Trash2 size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

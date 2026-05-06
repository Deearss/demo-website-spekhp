import { adminGetStats } from "@/lib/admin-api";
import StatsCard from "@/components/admin/StatsCard";
import { Smartphone, Layers } from "lucide-react";
import Image from "next/image";

export default async function AdminDashboard() {
  const stats = await adminGetStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-text mb-1">Dashboard</h1>
        <p className="text-text-3 text-sm">Ringkasan data spesifikasi smartphone</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      <div className="bg-surface border border-border-2 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border-2">
          <h2 className="font-semibold text-text">HP Baru Ditambahkan</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-2 text-text-3">
              <tr>
                <th className="px-6 py-3 font-medium">Gambar</th>
                <th className="px-6 py-3 font-medium">Nama HP</th>
                <th className="px-6 py-3 font-medium">Brand</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-2">
              {stats.latestPhones.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-text-3">Belum ada data</td>
                </tr>
              ) : (
                stats.latestPhones.map((phone: any) => (
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

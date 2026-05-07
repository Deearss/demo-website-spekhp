"use client";

import AdminBreadcrumb from "@/components/admin/AdminBreadcrumb";
import { Keyboard, Command, MousePointer2, User } from "lucide-react";

export default function AdminSettingsPage() {
  const shortcuts = [
    { key: "Alt", desc: "Masuk ke Shortcut Mode (Aktifkan Key Tips)" },
    { key: "Alt + D", desc: "Pindah ke Dashboard" },
    { key: "Alt + P", desc: "Pindah ke Daftar Phones" },
    { key: "Alt + P + N", desc: "Tambah HP Baru (Shortcut Berantai)" },
    { key: "Alt + F", desc: "Fokus ke Kolom Pencarian (Filter)" },
    { key: "Alt + S", desc: "Simpan Data (Hanya di Halaman Form)" },
    { key: "Alt + B", desc: "Batal / Kembali ke Halaman Sebelumnya" },
    { key: "Alt + L", desc: "Buka/Tutup Menu Profil Admin" },
    { key: "Alt + L + O", desc: "Logout dari Dashboard" },
    { key: "Alt + L + ,", desc: "Buka Settings (via Menu Profil)" },
    { key: "Alt + ,", desc: "Buka Halaman Settings (Langsung)" },
    { key: "Esc", desc: "Keluar dari Shortcut Mode / Batal" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <AdminBreadcrumb />
      
      <div>
        <h1 className="text-2xl font-bold text-text mb-1">Settings</h1>
        <p className="text-text-3 text-sm">Konfigurasi panel admin dan informasi sistem</p>
      </div>

      <div className="bg-surface border border-surface-2 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-2 bg-bg-2/30 flex items-center gap-3">
          <Keyboard className="text-gold" size={20} />
          <h2 className="font-bold text-text">Keyboard Shortcuts</h2>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-text-3 mb-6">
            Gunakan kombinasi tombol berikut untuk menavigasi panel admin dengan lebih cepat dan efisien.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {shortcuts.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-surface-2/50 last:border-0 group">
                <span className="text-sm text-text-2 group-hover:text-text transition-colors">{s.desc}</span>
                <div className="flex gap-1">
                  {s.key.split(" + ").map((k, ki) => (
                    <span key={ki} className="flex items-center">
                      <kbd className="px-2 py-1 text-[10px] font-mono font-bold bg-bg-2 border border-surface-2 rounded text-gold shadow-sm">
                        {k}
                      </kbd>
                      {ki < s.key.split(" + ").length - 1 && (
                        <span className="mx-1 text-text-3 text-xs">+</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gold/5 border-t border-surface-2 flex items-start gap-3">
          <Command className="text-gold mt-0.5" size={16} />
          <div className="text-xs text-text-3 leading-relaxed">
            <span className="text-gold font-bold">Tips Pro:</span> Kamu tidak perlu menahan tombol <kbd className="px-1 bg-bg-2 rounded">Alt</kbd>. Cukup tekan sekali untuk mengaktifkan mode, lalu tekan tombol berikutnya secara berurutan.
          </div>
        </div>
      </div>

      {/* Placeholder Section Lain */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-surface-2 rounded-2xl p-6 opacity-50 grayscale pointer-events-none">
          <div className="flex items-center gap-3 mb-4">
            <User className="text-text-3" size={20} />
            <h2 className="font-bold text-text">Edit Profile</h2>
          </div>
          <p className="text-xs text-text-3">Fitur ini akan segera hadir di update berikutnya.</p>
        </div>
        
        <div className="bg-surface border border-surface-2 rounded-2xl p-6 opacity-50 grayscale pointer-events-none">
          <div className="flex items-center gap-3 mb-4">
            <MousePointer2 className="text-text-3" size={20} />
            <h2 className="font-bold text-text">Preferences</h2>
          </div>
          <p className="text-xs text-text-3">Konfigurasi tema dan notifikasi sistem.</p>
        </div>
      </div>
    </div>
  );
}

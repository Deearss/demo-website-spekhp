"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useShortcutStore } from "@/store/useShortcutStore";

export default function ShortcutHandler() {
  const { isAltActive, setAltActive } = useShortcutStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Toggle Alt Mode
      if (e.key === "Alt") {
        e.preventDefault();
        setAltActive(!isAltActive);
        return;
      }

      // 2. Escape to exit
      if (e.key === "Escape" && isAltActive) {
        setAltActive(false);
        return;
      }

      // 3. If mode is active, handle shortcut keys
      if (isAltActive) {
        const key = e.key.toLowerCase();
        const handledKeys = ["d", "p", "n", "f", "b", "s", "l"];

        if (handledKeys.includes(key)) {
          e.preventDefault(); // Mencegah karakter masuk ke input (cth: 'f' saat fokus search)
        }
        
        // Mapping Logic
        switch (key) {
          case "d":
            router.push("/admin");
            setAltActive(false);
            break;
          case "p":
            router.push("/admin/phones");
            setAltActive(false);
            break;
          case "n":
            router.push("/admin/phones/new");
            setAltActive(false);
            break;
          case "f":
            // Fokus ke search input kalau ada
            const searchInput = document.querySelector('input[placeholder*="Cari"]') as HTMLInputElement;
            if (searchInput) {
              searchInput.focus();
              setAltActive(false);
            }
            break;
          case "b":
            // Back/Batal: cari tombol batal atau pakai history back
            // Kita prioritaskan tombol yang punya teks "Batal" atau "Kembali"
            const allBtns = Array.from(document.querySelectorAll('button, a'));
            const foundBack = allBtns.find(el => 
              el.textContent?.toLowerCase().includes("batal") || 
              el.textContent?.toLowerCase().includes("kembali")
            ) as HTMLElement;
            
            if (foundBack) {
              foundBack.click();
            } else {
              window.history.back();
            }
            setAltActive(false);
            break;
          case "s":
            // Save: cari tombol simpan
            const saveBtn = Array.from(document.querySelectorAll('button')).find(el => 
              el.textContent?.toLowerCase().includes("simpan")
            );
            if (saveBtn) {
              saveBtn.click();
              setAltActive(false);
            }
            break;
          case "l":
            // Logout: cari tombol logout
            const logoutBtn = Array.from(document.querySelectorAll('button')).find(el => 
              el.textContent?.toLowerCase().includes("logout")
            );
            if (logoutBtn) {
              logoutBtn.click();
              setAltActive(false);
            }
            break;
          default:
            // Key lain yang gak terdaftar bakal matiin mode (biar gak ganggu ngetik biasa)
            if (e.key.length === 1) setAltActive(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAltActive, setAltActive, router, pathname]);

  // Reset alt mode kalau pindah halaman
  useEffect(() => {
    setAltActive(false);
  }, [pathname, setAltActive]);

  return null;
}

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useShortcutStore } from "@/store/useShortcutStore";

export default function ShortcutHandler() {
  const { isAltActive, setAltActive, activePrefix, setPrefix } = useShortcutStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Toggle Alt Mode
      if (e.key === "Alt") {
        e.preventDefault();
        const nextActive = !isAltActive;
        setAltActive(nextActive);
        if (!nextActive) setPrefix(""); // Reset prefix saat dimatikan
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
        
        // List handled keys
        const handledKeys = ["d", "p", "n", "f", "b", "s", "l", "o", ","];
        if (handledKeys.includes(key)) {
          e.preventDefault();
        }

        // --- Logic Chaining ---
        
        // Level 1: Belum ada prefix
        if (activePrefix === "") {
          switch (key) {
            case ",":
              router.push("/admin/settings");
              setAltActive(false);
              break;
            case "p":
              setPrefix("p");
              router.push("/admin/phones");
              break;
            case "l":
              // Grup Profile: set prefix dan buka dropdown
              setPrefix("l");
              // Cari button dropdown profile
              const profileBtn = document.querySelector('button[aria-label="profile-menu"]') as HTMLElement 
                || (Array.from(document.querySelectorAll('button')).find(el => el.querySelector('span')?.innerText === "L") as HTMLElement);
              
              if (profileBtn) profileBtn.click();
              break;
            case "d":
              router.push("/admin");
              setAltActive(false);
              break;
            case "f":
              const searchInput = document.querySelector('input[placeholder*="Cari"]') as HTMLInputElement;
              if (searchInput) searchInput.focus();
              setAltActive(false);
              break;
            case "s":
              const saveBtn = Array.from(document.querySelectorAll('button')).find(el => 
                el.textContent?.toLowerCase().includes("simpan")
              );
              if (saveBtn) saveBtn.click();
              setAltActive(false);
              break;
            case "b":
              const allBtns = Array.from(document.querySelectorAll('button, a'));
              const foundBack = allBtns.find(el => 
                el.textContent?.toLowerCase().includes("batal") || 
                el.textContent?.toLowerCase().includes("kembali")
              ) as HTMLElement;
              if (foundBack) foundBack.click();
              else window.history.back();
              setAltActive(false);
              break;
            case "n":
              router.push("/admin/phones/new");
              setAltActive(false);
              break;
            default:
              if (e.key.length === 1) setAltActive(false);
          }
        } 
        // Level 2: Phones Group ("p")
        else if (activePrefix === "p") {
          switch (key) {
            case "n":
              router.push("/admin/phones/new");
              setAltActive(false);
              break;
            case "p":
              router.push("/admin/phones");
              setAltActive(false);
              break;
            default:
              if (e.key.length === 1) setAltActive(false);
          }
        }
        // Level 2: Profile Group ("l")
        else if (activePrefix === "l") {
          switch (key) {
            case "s": // S for Settings
              router.push("/admin/settings");
              setAltActive(false);
              break;
            case "l": // L for Logout
              const logoutBtn = Array.from(document.querySelectorAll('button')).find(el => 
                el.textContent?.toLowerCase().includes("logout")
              );
              if (logoutBtn) logoutBtn.click();
              setAltActive(false);
              break;
            default:
              if (e.key.length === 1) setAltActive(false);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAltActive, activePrefix, setAltActive, setPrefix, router, pathname]);

  return null;
}

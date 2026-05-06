import { create } from "zustand";

interface ShortcutState {
  isAltActive: boolean;
  activePrefix: string; // Misal: "p" untuk grup Phones
  setAltActive: (active: boolean) => void;
  setPrefix: (prefix: string) => void;
}

export const useShortcutStore = create<ShortcutState>((set) => ({
  isAltActive: false,
  activePrefix: "",
  setAltActive: (active) => set({ isAltActive: active, activePrefix: "" }), // Reset prefix saat mode mati
  setPrefix: (prefix) => set({ activePrefix: prefix }),
}));

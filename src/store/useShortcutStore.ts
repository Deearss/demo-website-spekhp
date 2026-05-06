import { create } from "zustand";

interface ShortcutState {
  isAltActive: boolean;
  setAltActive: (active: boolean) => void;
}

export const useShortcutStore = create<ShortcutState>((set) => ({
  isAltActive: false,
  setAltActive: (active) => set({ isAltActive: active }),
}));

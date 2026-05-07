import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PhoneFilterState {
  brand: string;
  globalSort: string;
  setBrand: (brand: string) => void;
  setGlobalSort: (sort: string) => void;
}

export const usePhoneFilterStore = create<PhoneFilterState>()(
  persist(
    (set) => ({
      brand: "All",
      globalSort: "newest",
      setBrand: (brand) => set({ brand }),
      setGlobalSort: (globalSort) => set({ globalSort }),
    }),
    {
      name: "phone-filters", // Nama key di localStorage
    }
  )
);

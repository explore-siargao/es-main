import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WholePlaceState = {
  selectedWholePlaceType: string | null;
  setSelectedWholePlaceType: (type: string | null) => void;
};

const useWholePlaceStore = create<WholePlaceState>()(
  persist(
    (set) => ({
      selectedWholePlaceType: null,
      setSelectedWholePlaceType: (type) => set({ selectedWholePlaceType: type }),
    }),
    {
      name: "selected-whole-place-type", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useWholePlaceStore;

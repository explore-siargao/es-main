import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { E_WholePlace_Property_Type } from "@repo/contract"

type UnitTypeState = {
  selectedUnitType: E_WholePlace_Property_Type | null
  setSelectedUnitType: (unitType: E_WholePlace_Property_Type | null) => void
}

const useUnitTypeStore = create<UnitTypeState>()(
  persist(
    (set) => ({
      selectedUnitType: null,
      setSelectedUnitType: (unitType) => set({ selectedUnitType: unitType }),
    }),
    {
      name: "selected-unit-type",
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useUnitTypeStore

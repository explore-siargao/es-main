import { create } from "zustand"

type T_MarkerHover = {
  isHover: boolean
  selectedItem: number | null
  setIsHover: (value: boolean) => void
  setSelectedItem: (value: number | null) => void
}

const useMarkerHoverStore = create<T_MarkerHover>((set) => ({
  isHover: false,
  selectedItem: null,
  setIsHover: (value) => set(() => ({ isHover: value })),
  setSelectedItem: (value) => set(() => ({ selectedItem: value })),
}))

export default useMarkerHoverStore

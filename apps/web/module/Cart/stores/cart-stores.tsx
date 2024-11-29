import { create } from "zustand"
import { T_Cart_Item } from "@repo/contract-2/cart"

interface CartState {
  selectedItems: T_Cart_Item[]
  addSelectedItem: (item: T_Cart_Item) => void
  setSelectedItems: (items: T_Cart_Item[]) => void
  clearSelectedItems: () => void
}

export const useCartStore = create<CartState>((set) => ({
  selectedItems: [],
  addSelectedItem: (item) =>
    set((state) => ({ selectedItems: [...state.selectedItems, item] })),
  setSelectedItems: (items) => set({ selectedItems: items }),
  clearSelectedItems: () => set({ selectedItems: [] }),
}))

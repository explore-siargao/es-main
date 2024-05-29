import create from "zustand"

type InclusionCategory = "whatToBring" | "notAllowed" | "policies"
interface ItemStore {
  whatToBring: string[]
  notAllowed: string[]
  policies: string[]

  addItem: (name: string, category: InclusionCategory) => void
  removeItem: (name: string, category: InclusionCategory) => void
  setWhatToBring: (items: string[]) => void
  setNotAllowed: (items: string[]) => void
  setPolicies: (items: string[]) => void
}

export const useItemStore = create<ItemStore>((set) => ({
  whatToBring: [],
  notAllowed: [],
  policies: [],

  addItem: (name: string, category: InclusionCategory) =>
    set((state) => ({
      ...state,
      [category]: [...state[category], name],
    })),
  removeItem: (name: string, category: InclusionCategory) =>
    set((state) => ({
      ...state,
      [category]: state[category].filter((item) => item !== name),
    })),
  setWhatToBring: (items: string[]) => set({ whatToBring: items }),
  setNotAllowed: (items: string[]) => set({ notAllowed: items }),
  setPolicies: (items: string[]) => set({ policies: items }),
}))

interface RadioStore {
  cancellationDays: number | null
  setCancellationDays: (value: number) => void
}

export const useRadioStore = create<RadioStore>((set) => ({
  cancellationDays: null,
  setCancellationDays: (value: number) => set({ cancellationDays: value }),
}))

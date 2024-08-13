import { create } from "zustand"

type T_Filter = {
  category: string
  type: string
  filterCount: number
}

type T_FilterStore = {
  filterData: T_Filter[]
  setFilter: (values: T_Filter[]) => void
  increaseFilterCount: (category: string, type: string) => void
  decreaseFilterCount: (category: string, type: string) => void
}

const useFilterStore = create<T_FilterStore>()((set) => ({
  filterData: [],
  setFilter: (values) => set({ filterData: values }),
  increaseFilterCount: (category, type) =>
    set((state) => {
      const filterExists = state.filterData.some(
        (filter) => filter.category === category && filter.type === type
      )
      if (filterExists) {
        return {
          filterData: state.filterData.map((filter) =>
            filter.category === category && filter.type === type
              ? { ...filter, filterCount: filter.filterCount + 1 }
              : filter
          ),
        }
      } else {
        return {
          filterData: [...state.filterData, { category, type, filterCount: 1 }],
        }
      }
    }),
  decreaseFilterCount: (category, type) =>
    set((state) => {
      const filterExists = state.filterData.some(
        (filter) => filter.category === category && filter.type === type
      )
      if (filterExists) {
        return {
          filterData: state.filterData
            .map((filter) =>
              filter.category === category && filter.type === type
                ? { ...filter, filterCount: filter.filterCount - 1 }
                : filter
            )
            .filter((filter) => filter.filterCount > 0),
        }
      }
      return state
    }),
}))

export default useFilterStore

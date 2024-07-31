import { create } from "zustand"

type T_Filter = {
  category: string
  type: string
}

type T_FilterStore = {
  filterData: T_Filter[]
  setFilter: (value: T_Filter[]) => void
}

const useFilterStore = create<T_FilterStore>()((set) => ({
  filterData: [],
  setFilter: (values) =>
    set((state) => {
      const existingValues = state.filterData.filter((value) =>
        values.some(
          (newValue) =>
            newValue.category === value.category && newValue.type === value.type
        )
      )
      const newValues = values.filter(
        (value) =>
          !existingValues.some(
            (existingValue) =>
              existingValue.category === value.category &&
              existingValue.type === value.type
          )
      )
      return {
        filterData: [...existingValues, ...newValues],
      }
    }),
}))

export default useFilterStore

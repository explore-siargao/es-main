import { create } from "zustand"

type T_Filter = {
  category: string
  type: string
}

type T_FilterStore = {
  filterData: T_Filter[]
  setFilter: (value: T_Filter[]) => void
}

const filterExistingValues = (state: T_FilterStore, values: T_Filter[]) => {
  return state.filterData.filter((value) =>
    values.some(
      (newValue) =>
        newValue.category === value.category && newValue.type === value.type
    )
  )
}

const filterNewValues = (existingValues: T_Filter[], values: T_Filter[]) => {
  return values.filter(
    (value) =>
      !existingValues.some(
        (existingValue) =>
          existingValue.category === value.category &&
          existingValue.type === value.type
      )
  )
}

const useFilterStore = create<T_FilterStore>()((set) => ({
  filterData: [],
  setFilter: (values) =>
    set((state) => {
      const existingValues = filterExistingValues(state, values)
      const newValues = filterNewValues(existingValues, values)
      return {
        filterData: [...existingValues, ...newValues],
      }
    }),
}))

export default useFilterStore

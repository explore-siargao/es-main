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

const updateFilterCount = (state: T_FilterStore, values: T_Filter[]) => {
  return state.filterData.map((value) => {
    const matchingValue = values.find(
      (newValue) =>
        newValue.category === value.category && newValue.type === value.type
    )
    if (matchingValue) {
      return { ...value, filterCount: matchingValue.filterCount }
    }
    return value
  })
}

const useFilterStore = create<T_FilterStore>()((set) => ({
  filterData: [],
  setFilter: (values) =>
    set((state) => {
      const existingValues = filterExistingValues(state, values)
      const newValues = filterNewValues(existingValues, values)
      const updatedFilterData = updateFilterCount(state, values)
      return {
        filterData: [...updatedFilterData, ...newValues],
      }
    }),
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
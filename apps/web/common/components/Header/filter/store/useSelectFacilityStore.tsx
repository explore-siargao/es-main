import { create } from "zustand"
import { T_Property_Facility } from "@repo/contract"
import { NEW_FACILITIES } from "@/module/Admin/Listings/ForReview/Property/Facilities/constants"

type T_FacilityStoreState = {
  facilities: T_Property_Facility[]
  updateFacility: (value: T_Property_Facility) => void
  setDefaultFacilities: (value: T_Property_Facility[]) => void
}

const useSelectFacilityStore = create<T_FacilityStoreState>((set) => ({
  facilities: [...NEW_FACILITIES],
  updateFacility: (value) =>
    set((state) => {
      let facilityCurrStateCopy = [...state.facilities]
      facilityCurrStateCopy[value.index]!.isSelected = value.isSelected
      return {
        facilities: facilityCurrStateCopy,
      }
    }),
  setDefaultFacilities: (value) => {
    set((state) => {
      let stateCopy = [...state.facilities]
      value?.forEach((facility) => {
        stateCopy[facility.index] = facility
      })
      return {
        facilities: [...stateCopy],
      }
    })
  },
}))

export default useSelectFacilityStore

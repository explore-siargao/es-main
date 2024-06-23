import { create } from "zustand"
import { T_Property_Amenity } from "@repo/contract"
import { AMENITIES } from "../constants"

type T_AmenityStoreState = {
  amenities: T_Property_Amenity[]
  updateAmenity: (value: T_Property_Amenity) => void
  setDefaultAmenities: (value: T_Property_Amenity[]) => void
}

const useSelectAmenityStore = create<T_AmenityStoreState>((set) => ({
  amenities: [...AMENITIES],
  updateAmenity: (value) =>
    set((state) => {
      let facilityCurrStateCopy = [...state.amenities]
      facilityCurrStateCopy[value.index]!.isSelected = value.isSelected
      return {
        amenities: facilityCurrStateCopy,
      }
    }),
  setDefaultAmenities: (value) => {
    set((state) => {
      let stateCopy = [...state.amenities]
      value?.forEach((facility) => {
        stateCopy[facility.index] = facility
      })
      return {
        amenities: [...stateCopy],
      }
    })
  },
}))

export default useSelectAmenityStore

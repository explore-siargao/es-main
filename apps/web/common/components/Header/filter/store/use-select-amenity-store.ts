import { create } from "zustand"
import { T_Property_Amenity } from "@repo/contract"
import { AMENITIES } from "@/module/Hosting/Listings/Properties/Property/Units/constants"

type T_AmenityStoreState = {
  amenities: T_Property_Amenity[]
  updateAmenity: (value: T_Property_Amenity) => void
  setDefaultAmenities: (value: T_Property_Amenity[]) => void
  resetAmenities: () => void;
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
      value?.forEach((amenity) => {
        stateCopy[amenity.index] = amenity
      })
      return {
        amenities: [...stateCopy],
      }
      
    })
  },
  resetAmenities: () => set(() => {
    const newAmenities = AMENITIES.map(amenity => ({
      ...amenity,
      isSelected: false
    }));
    return { amenities: newAmenities };
  }),
}))

export default useSelectAmenityStore

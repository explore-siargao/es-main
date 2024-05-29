import { create } from "zustand"

type T_Amenity = {
  category: string
  amenity: string
  bookableUnitTypeId?: number
  propertyId?: number
}

type T_AmenityStoreState = {
  amenities: T_Amenity[]
  setAmenities: (value: T_Amenity) => void
  setCurrentAmenities: (value: T_Amenity) => void
}

const useAmenitySelectStore = create<T_AmenityStoreState>((set) => ({
  amenities: [
    {
      category: "Most Popular",
      amenity: "Garden",
    },
    {
      category: "Most Popular",
      amenity: "Terrace",
    },
    {
      category: "Most Popular",
      amenity: "Hot tub/Jacuzzi",
    },
  ],
  setAmenities: (value) =>
    set((state) => ({
      amenities: state.amenities.some(
        (item) =>
          item.category === value.category &&
          item.amenity === value.amenity &&
          item.bookableUnitTypeId === value.bookableUnitTypeId &&
          item.propertyId === value.propertyId
      )
        ? state.amenities.filter(
            (item) =>
              item.category !== value.category ||
              item.amenity !== value.amenity ||
              item.bookableUnitTypeId !== value.bookableUnitTypeId ||
              item.propertyId !== value.propertyId
          )
        : [...state.amenities, value],
    })),
  setCurrentAmenities: (value) => {
    set((state) => {
      const exists = state.amenities.some(
        (item) =>
          item.category === value.category &&
          item.amenity === value.amenity &&
          item.bookableUnitTypeId === value.bookableUnitTypeId &&
          item.propertyId === value.propertyId
      )

      if (!exists) {
        return {
          amenities: [...state.amenities, value],
        }
      }
      return state
    })
  },
}))

export default useAmenitySelectStore

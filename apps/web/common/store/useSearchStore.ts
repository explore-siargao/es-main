import { create } from "zustand"

export type T_Search = {
  location?: string | null
  search?: string | null
  checkIn?: string | null
  checkOut?: string | null
  date?: string | null
  vehicleType?: string | null
  pickUpDate?: string | null
  dropOffDate?: string | null
  numberOfGuest?: string | null
  pathCategory?: string | null
}

type T_Search_Setter = {
  setPathCategory: (path: string) => void
  setSearchValues: (props: T_Search) => void
  clearSearchValues: () => void
}

export const useSearchStore = create<T_Search & T_Search_Setter>((set) => ({
  location: "",
  search: "",
  checkIn: "",
  checkOut: "",
  date: "",
  numberOfGuest: null,
  vehicleType: "",
  pickUpDate: "",
  dropOffDate: "",
  setPathCategory: (pathCategory: string) => set({ pathCategory }),
  setSearchValues: ({location, search, checkIn, checkOut, date, numberOfGuest, pickUpDate, dropOffDate, vehicleType}) =>
    set({
      location: location,
      search: search,
      checkIn: checkIn,
      checkOut: checkOut,
      date: date,
      numberOfGuest: numberOfGuest,
      pickUpDate: pickUpDate,
      dropOffDate: dropOffDate,
      vehicleType: vehicleType,
    }),
  clearSearchValues: () =>
    set({
      location: "",
      search: "",
      checkIn: "",
      checkOut: "",
      date: "",
      numberOfGuest: null,
      vehicleType: "",
      pickUpDate: "",
      dropOffDate: "",
    }),
}))

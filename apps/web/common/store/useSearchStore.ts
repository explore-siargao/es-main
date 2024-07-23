import { create } from "zustand"

type T_Search = {
  search?: string | null
  checkIn?: string | null
  checkOut?: string | null
  date?: string | null
  numberOfGuest: number | null
  setSearchValues: (
    search: string,
    checkIn: string,
    checkOut: string,
    date: string,
    numberOfGuest: number
  ) => void
  clearSearchValues: () => void
}

export const useSearchStore = create<T_Search>((set) => ({
  search: "",
  checkIn: "",
  checkOut: "",
  date: "",
  numberOfGuest: null,
  setSearchValues: (search, checkIn, checkOut, date, numberOfGuest) =>
    set({
      search: search,
      checkIn: checkIn,
      checkOut: checkOut,
      date: date,
      numberOfGuest: numberOfGuest,
    }),
  clearSearchValues: () =>
    set({
      search: "",
      checkIn: "",
      checkOut: "",
      date: "",
      numberOfGuest: null,
    }),
}))

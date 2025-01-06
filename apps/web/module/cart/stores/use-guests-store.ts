import { create } from "zustand"

type T_Guest = {
  adults: number
  children: number
  infants: number
}

type T_GuestState = {
  guest: T_Guest
  updateGuest: (updatedGuest: Partial<T_Guest>) => void
  incrementGuest: (type: keyof T_Guest) => void
  decrementGuest: (type: keyof T_Guest) => void
  updateAdults: (adults: number) => void
}

const useGuestsStore = create<T_GuestState>((set) => ({
  guest: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  updateGuest: (updatedGuest) =>
    set((state) => ({
      guest: { ...state.guest, ...updatedGuest },
    })),
  incrementGuest: (type) =>
    set((state) => ({
      guest: {
        ...state.guest,
        [type]: state.guest[type] + 1,
      },
    })),
  decrementGuest: (type) =>
    set((state) => ({
      guest: {
        ...state.guest,
        [type]: state.guest[type] - 1,
      },
    })),
  updateAdults: (adults) =>
    set((state) => ({
      guest: { ...state.guest, adults },
    })),
}))

export default useGuestsStore

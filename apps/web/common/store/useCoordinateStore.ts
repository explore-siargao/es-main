import { create } from "zustand"

type T_Coordinates = {
  latitude: number | null
  longitude: number | null
  setCoordinates: (lat: number, lng: number) => void
}

export const useCoordinatesStore = create<T_Coordinates>((set) => ({
  latitude: 9.913431,
  longitude: 126.049483,
  setCoordinates: (lat, lng) => set({ latitude: lat, longitude: lng }),
}))

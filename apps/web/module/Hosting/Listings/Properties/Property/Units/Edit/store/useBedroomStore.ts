import { create } from "zustand"
import { IBedroom } from "../../types"

type BedroomStore = {
  bedrooms: IBedroom[]
  setInitialBedrooms: (bedrooms: IBedroom[]) => void
  updateBedrooms: (newBedrooms: IBedroom[]) => void
  deleteBedroom: (index: number) => void
}

export const useBedroomStore = create<BedroomStore>((set) => ({
  bedrooms: [],
  setInitialBedrooms: (bedrooms: IBedroom[]) =>
    set({ bedrooms: deepCopyBedrooms(bedrooms) }),
  updateBedrooms: (newBedrooms: IBedroom[]) =>
    set({ bedrooms: deepCopyBedrooms(newBedrooms) }),
  deleteBedroom: (index: number) =>
    set((state) => ({
      bedrooms: state.bedrooms.filter((_, idx) => idx !== index),
    })),
}))

function deepCopyBedrooms(bedrooms: IBedroom[]): IBedroom[] {
  return bedrooms.map((bedroom) => ({
    roomName: bedroom.roomName,
    beds: bedroom.beds.map((bed) => ({ ...bed })),
  }))
}

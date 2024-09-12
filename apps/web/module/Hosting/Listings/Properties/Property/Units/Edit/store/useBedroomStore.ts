import { create } from "zustand"
import { IBedroom } from "../../types"

type BedroomStore = {
  bedrooms: IBedroom[]
  setInitialBedrooms: (bedrooms: IBedroom[]) => void
  updateBedrooms: (newBedrooms: IBedroom[]) => void
  deleteBedroom: (index: number) => void
  resetBedroom: () => void
}
type BedroomStudioStore = {
  bedroomsStudio: IBedroom[]
  setInitialBedroomsStudio: (bedroomsStudio: IBedroom[]) => void
  updateBedroomsStudio: (newBedroomsStudio: IBedroom[]) => void
  deleteBedroomStudio: (index: number) => void
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
  resetBedroom: () => set({ bedrooms: [] }),
}))

function deepCopyBedrooms(bedrooms: IBedroom[]): IBedroom[] {
  if (!bedrooms) return []
  return bedrooms.map((bedroom) => ({
    roomName: bedroom.roomName,
    beds: bedroom.beds.map((bed) => ({ ...bed })),
  }))
}
export const useBedroomStudioStore = create<BedroomStudioStore>((set) => ({
  bedroomsStudio: [],

  setInitialBedroomsStudio: (bedroomsStudio: IBedroom[]) => {
    const copiedBedroomsStudio = deepCopyBedroomsStudio(bedroomsStudio)
    console.log("Initial bedroomsStudio set:", copiedBedroomsStudio)
    set({ bedroomsStudio: copiedBedroomsStudio })
  },

  updateBedroomsStudio: (newBedroomsStudio: IBedroom[]) => {
    const copiedBedroomsStudio = deepCopyBedroomsStudio(newBedroomsStudio)
    console.log("Updated bedroomsStudio:", copiedBedroomsStudio)
    set({ bedroomsStudio: copiedBedroomsStudio })
  },

  deleteBedroomStudio: (index: number) => {
    set((state) => {
      const updatedBedroomsStudio = state.bedroomsStudio.filter(
        (_, idx) => idx !== index
      )
      console.log(
        "Deleted bedroomStudio at index:",
        index,
        "Updated bedroomsStudio:",
        updatedBedroomsStudio
      )
      return { bedroomsStudio: updatedBedroomsStudio }
    })
  },
}))

function deepCopyBedroomsStudio(bedroomsStudio: IBedroom[]): IBedroom[] {
  return bedroomsStudio.map((bedroom) => ({
    roomName: bedroom.roomName,
    beds: bedroom.beds.map((bed) => ({ ...bed })),
  }))
}

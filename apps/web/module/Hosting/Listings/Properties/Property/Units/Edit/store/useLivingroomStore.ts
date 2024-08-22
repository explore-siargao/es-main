import { create } from "zustand"
import { IBedroom } from "../../types"

type BedroomStore = {
  livingroom: IBedroom[]
  setInitialLivingrooms: (livingroom: IBedroom[]) => void
  updateLivingrooms: (newBedrooms: IBedroom[]) => void
  deleteLivingroom: (index: number) => void
  resetLivingroom: () => void
}

export const useLivingroomStore = create<BedroomStore>((set) => ({
  livingroom: [],
  setInitialLivingrooms: (livingroom: IBedroom[]) =>
    set({ livingroom: deepCopyLivingroom(livingroom) }),
  updateLivingrooms: (newLivingroom: IBedroom[]) =>
    set({ livingroom: deepCopyLivingroom(newLivingroom) }),
  deleteLivingroom: (index: number) =>
    set((state) => ({
      livingroom: state.livingroom.filter((_, idx) => idx !== index),
    })),
  resetLivingroom: () => set({ livingroom: [] }),
}))

function deepCopyLivingroom(livingroom: IBedroom[]): IBedroom[] {
  return livingroom.map((livingroom) => ({
    roomName: livingroom.roomName,
    beds: livingroom.beds.map((bed) => ({ ...bed })),
  }))
}

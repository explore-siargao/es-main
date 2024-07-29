import { create } from "zustand";
import { I_Bedroom } from "../../types";

type BedroomStore = {
  bedrooms: I_Bedroom[];
  setInitialBedrooms: (bedrooms: I_Bedroom[]) => void;
  updateBedrooms: (newBedrooms: I_Bedroom[]) => void;
  deleteBedroom: (index: number) => void;
};

export const useBedroomStore = create<BedroomStore>((set) => ({
  bedrooms: [],
  setInitialBedrooms: (bedrooms: I_Bedroom[]) =>
    set({ bedrooms: deepCopyBedrooms(bedrooms) }),
  updateBedrooms: (newBedrooms: I_Bedroom[]) =>
    set({ bedrooms: deepCopyBedrooms(newBedrooms) }),
  deleteBedroom: (index: number) =>
    set((state) => {
      if (index < 0 || index >= state.bedrooms.length) {
        return state; 
      }
      return {
        bedrooms: state.bedrooms.filter((_, idx) => idx !== index),
      };
    }),
}));

function deepCopyBedrooms(bedrooms: I_Bedroom[]): I_Bedroom[] {
  return bedrooms.map((bedroom) => ({
    bedRoomName: bedroom.bedRoomName,
    beds: bedroom.beds.map((bed) => ({ ...bed })),
  }));
}


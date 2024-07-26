import { create } from "zustand";
import { T_Bedroom } from "../../types";

type BedroomStore = {
  bedrooms: T_Bedroom[];
  setInitialBedrooms: (bedrooms: T_Bedroom[]) => void;
  updateBedrooms: (newBedrooms: T_Bedroom[]) => void;
  deleteBedroom: (index: number) => void;
};

export const useBedroomStore = create<BedroomStore>((set) => ({
  bedrooms: [],
  setInitialBedrooms: (bedrooms: T_Bedroom[]) =>
    set({ bedrooms: deepCopyBedrooms(bedrooms) }),
  updateBedrooms: (newBedrooms: T_Bedroom[]) =>
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

function deepCopyBedrooms(bedrooms: T_Bedroom[]): T_Bedroom[] {
  return bedrooms.map((bedroom) => ({
    bedRoomName: bedroom.bedRoomName,
    beds: bedroom.beds.map((bed) => ({ ...bed })),
  }));
}


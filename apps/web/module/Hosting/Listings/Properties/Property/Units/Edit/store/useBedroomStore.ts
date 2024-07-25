import { create } from "zustand";

type T_Bedroom = {
  bedrooms: any[][];
  initialBedrooms: (bedrooms: any[][]) => void;
  updateBedrooms: (newBedrooms: any[][]) => void;
  deleteBedroom: (index: number) => void;
};

export const useBedroomStore = create<T_Bedroom>((set) => ({
  bedrooms: [],

  initialBedrooms: (bedrooms: any[][]) =>
    set(() => ({
      bedrooms: deepCopyBedrooms(bedrooms),
    })),

  updateBedrooms: (newBedrooms: any[][]) =>
    set((state) => ({
      bedrooms: [...state.bedrooms, ...deepCopyBedrooms(newBedrooms)], 
    })),

  deleteBedroom: (index: number) =>
    set((state) => ({
      bedrooms: state.bedrooms.filter((_, idx) => idx !== index),
    })),
}));

function deepCopyBedrooms(bedrooms: any[][]): any[][] {
  return bedrooms.map((insideArray) => [...insideArray.map(item => Array.isArray(item) ? deepCopyBedrooms(item) : {...item})]);
}

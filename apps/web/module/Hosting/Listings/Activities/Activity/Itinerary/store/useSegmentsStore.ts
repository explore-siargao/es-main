import { T_Activity_Segment } from "@repo/contract"
import { create } from "zustand"

type T_Segments = {
  segments: T_Activity_Segment[]
  initialSegments: (segment: T_Activity_Segment[]) => void
  updateSegments: (segment: T_Activity_Segment) => void
  deleteSegment: (index: number) => void
}

export const useSegmentsStore = create<T_Segments>((set) => ({
  segments: [],
  initialSegments: (segments) =>
    set(() => ({
      segments: [...segments],
    })),
  updateSegments: (segment) =>
    set((state) => ({
      segments: [
        ...state.segments,
        { index: state.segments.length + 1, ...segment },
      ],
    })),
  deleteSegment: (index: number) =>
    set((state) => {
      const newStateSegments = [...state.segments]
      const updatedSegments = newStateSegments.filter(
        (segment) => segment.index !== index
      )
      return {
        segments: updatedSegments,
      }
    }),
}))

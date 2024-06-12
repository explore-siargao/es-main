import { create } from "zustand"

type T_Segment = {
  index?: number
  transfer?: string
  activities?: string[]
  location?: string
  durationHour: number
  durationMinute: number
  optional: boolean
  fee: boolean
  coordinates?: {
    latitude: number,
    longitude: number,
  }
}

type T_Segments = {
  segments: T_Segment[]
  updateSegments: (segment: T_Segment) => void
  deleteSegment: (index: number) => void
}

export const useSegmentsStore = create<T_Segments>((set) => ({
  segments: [],
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

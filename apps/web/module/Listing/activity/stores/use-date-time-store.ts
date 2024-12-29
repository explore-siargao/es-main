import { create } from "zustand"

type T_Date_Time = { date: Date; timeSlotId: string }

type T_Date_Action = {
  updateDate: (date: Date) => void
  updateTime: (time: string) => void
}

const useDateTimeStore = create<T_Date_Time & T_Date_Action>((set) => ({
  date: new Date(),
  timeSlotId: "",
  updateDate: (date: Date) =>
    set((state: T_Date_Time) => ({
      ...state,
      date,
    })),
  updateTime: (timeSlotId: string) =>
    set((state: T_Date_Time) => ({
      ...state,
      timeSlotId,
    })),
}))

export default useDateTimeStore

import { create } from "zustand"
import { DateRange } from "react-day-picker"

type T_Date_Time = { date: Date, time: string }

type T_Date_Action = {
  updateDate: (date: Date) => void
  updateTime: (time: string) => void
}

const useDateTimeStore = create<T_Date_Time & T_Date_Action>(
  (set) => ({
    date: new Date(),
    time: "",
    updateDate: (date: Date) =>
      set((state: T_Date_Time) => ({
        ...state,
        date,
      })),
    updateTime: (time: string) =>
      set((state: T_Date_Time) => ({
        ...state,
        time,
      })),
  })
)

export default useDateTimeStore

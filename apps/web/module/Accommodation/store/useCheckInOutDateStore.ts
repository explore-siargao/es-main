import { create } from "zustand"
import { DateRange } from "react-day-picker"

type T_DateRange = { dateRange: DateRange }

type T_DateRange_Action = {
  updateDateRange: (dateRange: DateRange) => void
}

const today = new Date()
const futureDate = new Date(today.setDate(today.getDate() + 5))

const useCheckInOutDateStore = create<T_DateRange & T_DateRange_Action>(
  (set) => ({
    dateRange: {
      from: new Date(),
      to: futureDate,
    },
    updateDateRange: (dateRange: DateRange) =>
      set((state: T_DateRange & T_DateRange_Action) => ({
        ...state,
        dateRange: { ...dateRange },
      })),
  })
)

export default useCheckInOutDateStore

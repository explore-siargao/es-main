import { create } from "zustand"
import { DateRange } from "react-day-picker"
import { addHours } from "date-fns"

type T_DateRange = { dateRange: DateRange; fromTime: string; toTime: string }

type T_DateRange_Action = {
  updateDateRange: (dateRange: DateRange) => void
  updateFromTime: (fromTime: string) => void
  updateToTime: (toTime: string) => void
}

const today = addHours(new Date(), 1)
const futureDate = new Date(today.setDate(today.getDate() + 5))

const usePickupDropoffStore = create<T_DateRange & T_DateRange_Action>(
  (set) => ({
    dateRange: {
      from: addHours(new Date(), 1),
      to: futureDate,
    },
    fromTime: "6:00 AM",
    toTime: "6:00 PM",
    updateDateRange: (dateRange: DateRange) =>
      set((state: T_DateRange & T_DateRange_Action) => ({
        ...state,
        dateRange: { ...dateRange },
      })),
    updateFromTime: (fromTime: string) => {
      set((state: T_DateRange & T_DateRange_Action) => ({
        ...state,
        fromTime,
      }))
    },
    updateToTime: (toTime: string) => {
      set((state: T_DateRange & T_DateRange_Action) => ({
        ...state,
        toTime,
      }))
    },
  })
)

export default usePickupDropoffStore

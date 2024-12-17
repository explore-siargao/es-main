import { create } from "zustand"
import { DateRange } from "react-day-picker"
import { addHours } from "date-fns"

type T_DateRange = { dateRange: DateRange }

type T_DateRange_Action = {
  updateDateRange: (dateRange: DateRange) => void
}

const today = addHours(new Date(), 1)
const futureDate = new Date(today.setDate(today.getDate() + 5))

const usePickupDropoffStore = create<T_DateRange & T_DateRange_Action>(
  (set) => ({
    dateRange: {
      from: addHours(new Date(), 1),
      to: futureDate,
    },
    updateDateRange: (dateRange: DateRange) =>
      set((state: T_DateRange & T_DateRange_Action) => ({
        ...state,
        dateRange: { ...dateRange },
      })),
  })
)

export default usePickupDropoffStore

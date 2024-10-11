import formatDateTZ from "@/common/helpers/formatDateTZ"
import { T_Calendar_Private_Activity } from "@repo/contract"
import { endOfDay, isWithinInterval, startOfDay } from "date-fns"

export const pricePerDates = ({
  activity,
  date,
}: {
  activity: T_Calendar_Private_Activity
  date: string
}) => {
  let result

  if (activity.pricePerDates?.length === 0) {
    if (!parseFloat(`${activity.price}`).toFixed(2)) {
      result = parseFloat(`${activity.price}`).toFixed(2)
    } else {
      result = 0
    }
  } else {
    const matchedItem = activity.pricePerDates?.find((item) => {
      const itemFromDate = formatDateTZ(startOfDay(item.fromDate))
      const itemToDate = formatDateTZ(endOfDay(item.toDate))
      const currentDate = formatDateTZ(startOfDay(date))

      return isWithinInterval(currentDate, {
        start: itemFromDate,
        end: itemToDate,
      })
    })

    if (matchedItem?.price) {
      result = parseFloat(String(matchedItem.price)).toFixed(2)
    } else {
      result = parseFloat(`${activity.price}`).toFixed(2)
    }
  }
  return result
}

import formatDateTZ from "@/common/helpers/formatDateTZ"
import { T_Calendar_Bike_Rental, T_Calendar_Private_Activity, T_Joiner_Activity } from "@repo/contract"
import { endOfDay, isWithinInterval, startOfDay } from "date-fns"

export const pricePerDatesBicycle = ({
  rental,
  date,
}: {
  rental: T_Calendar_Bike_Rental
  date: string
}) => {
  let result

  if (rental.pricePerDates?.length === 0) {
    if (!parseFloat(`${rental.price}`).toFixed(2)) {
      result = parseFloat(`${rental.price}`).toFixed(2)
    } else {
      result = 0
    }
  } else {
    const matchedItem = rental.pricePerDates?.find((item) => {
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
      result = parseFloat(`${rental.price}`).toFixed(2)
    }
  }
  return result
}

export const pricePerDatesJoiner = ({
  joinerActivity,
  date,
}: {
  joinerActivity: T_Joiner_Activity
  date: string
}) => {
  let result

  if (joinerActivity.pricePerDates?.length === 0) {
    if (!parseFloat(`${joinerActivity.price}`).toFixed(2)) {
      result = parseFloat(`${joinerActivity.price}`).toFixed(2)
    } else {
      result = 0
    }
  } else {
    const matchedItem = joinerActivity?.pricePerDates?.find((item) => {
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
      result = parseFloat(`${joinerActivity.price}`).toFixed(2)
    }
  }
  return result
}

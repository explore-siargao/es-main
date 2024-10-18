import formatDateTZ from "@/common/helpers/formatDateTZ"
import { T_Calendar_Bike_Rental, T_Calendar_Car_Rental, T_Calendar_Motor_Rental } from "@repo/contract"
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

    if (matchedItem?.price.dayRate) {
      result = parseFloat(String(matchedItem?.price?.dayRate)).toFixed(2)
    } else {
      result = parseFloat(`${rental.price}`).toFixed(2)
    }
  }
  return result
}

export const pricePerDatesCar = ({
  rental,
  date,
}: {
  rental: T_Calendar_Car_Rental
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

    if (matchedItem?.price.dayRate) {
      result = parseFloat(String(matchedItem?.price?.dayRate)).toFixed(2)
    } else {
      result = parseFloat(`${rental.price}`).toFixed(2)
    }
  }
  return result
}

export const pricePerDatesMotor = ({
  rental,
  date,
}: {
  rental: T_Calendar_Motor_Rental
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

    if (matchedItem?.price.dayRate) {
      result = parseFloat(String(matchedItem?.price?.dayRate)).toFixed(2)
    } else {
      result = parseFloat(`${rental.price}`).toFixed(2)
    }
  }
  return result
}
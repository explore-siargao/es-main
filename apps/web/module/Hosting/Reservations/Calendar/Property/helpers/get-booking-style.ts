import { addDays, differenceInDays, isAfter, isBefore } from "date-fns"
import { Reservation } from "../../../types/CalendarTable"

const getBookingStyle = (
  startDate: Date,
  daysPerPage: number,
  booking: Reservation
) => {
  const bookingStart = new Date(booking.startDate)
  const bookingEnd = new Date(booking.endDate)
  const calendarEnd = addDays(startDate, daysPerPage - 1)

  if (
    isAfter(bookingStart, calendarEnd) ||
    isBefore(bookingEnd, addDays(startDate, -1))
  ) {
    return null
  }

  const startOffset = isBefore(bookingStart, addDays(startDate, -1))
    ? differenceInDays(bookingStart, addDays(startDate, -1)) - 0.5
    : differenceInDays(bookingStart, addDays(startDate, -1))
  const endOffset = differenceInDays(bookingEnd, addDays(startDate, -1))
  const startCol = Math.max(startOffset, -0.5)
  const endCol = Math.min(endOffset, daysPerPage - 0.5)

  const colSpan = endCol - startCol + 1
  return { startCol, colSpan }
}

export default getBookingStyle

import { setHours, setMinutes } from "date-fns"

function combineDateTime(date: Date, timeString: string): Date {
  // Extract hours, minutes, and the period (AM/PM) from the time string
  const [time, period] = timeString.split(" ") // "6:30 AM" -> ["6:30", "AM"]
  const [hours, minutes] = time ? time.split(":").map(Number) : [6, 30] // Default to "6:30" if time is undefined

  // Convert hours to 24-hour format based on period
  const adjustedHours =
    period === "PM" && hours !== 12 ? (hours || 6) + 12 : (hours || 6) % 12

  // Set the time on the date object
  return setMinutes(setHours(new Date(date), adjustedHours), minutes || 30)
}

export default combineDateTime

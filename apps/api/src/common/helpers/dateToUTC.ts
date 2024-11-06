import { parse, format, addHours } from 'date-fns'

export const parseToUTCDate = (inputDate: string) => {
  // Parse the date and adjust to UTC (MongoDB expects dates in UTC for comparisons)
  const parsedDate = parse(inputDate, 'MM/dd/yyyy', new Date())
  return addHours(parsedDate, -parsedDate.getTimezoneOffset() / 60) // Adjust to UTC
}

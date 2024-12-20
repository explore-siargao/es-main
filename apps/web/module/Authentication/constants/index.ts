import { format, getYear } from "date-fns"
import { enUS } from "date-fns/locale"

const currentYear = getYear(new Date())
export const CALENDAR_MONTHS_STR = Array.from({ length: 12 }, (_, i) =>
  format(new Date(2024, i), "MMMM", { locale: enUS })
)
export const CALENDAR_MONTHS_NUM = [
  ...[...Array(12)].map((_, i) => String(i < 9 ? `0${i + 1}` : i + 1)),
]
export const CALENDAR_DAYS = [
  ...[...Array(31)].map((_, i) => String(i < 9 ? `0${i + 1}` : i + 1)),
]
export const CALENDAR_YEARS = Array.from({ length: 123 }, (_, i) =>
  String(currentYear - 123 + (i + 1))
).reverse()

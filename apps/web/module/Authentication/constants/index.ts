import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
dayjs.extend(localeData)

export const CALENDAR_MONTHS_STR = dayjs.months()
export const CALENDAR_MONTHS_NUM = [
  ...[...Array(12)].map((_, i) => String(i < 9 ? `0${i + 1}` : i + 1)),
]
export const CALENDAR_DAYS = [
  ...[...Array(31)].map((_, i) => String(i < 9 ? `0${i + 1}` : i + 1)),
]
export const CALENDAR_YEARS = [
  ...[...Array(123)].map((_, i) => String(dayjs().year() - 123 + (i + 1))),
].reverse()

import { addDays, format, getMonth, isSameDay } from "date-fns"

export const generateDays = ({
  daysPerPage,
  startDate,
}: {
  daysPerPage: number
  startDate: Date
}) => {
  const headers = []
  const today = new Date()

  for (let i = 0; i < daysPerPage; i++) {
    const date = addDays(startDate, i)
    const isToday = isSameDay(date, today)

    headers.push(
      <th
        key={i}
        className={`border p-2 w-24 ${isToday && "bg-primary-100"} ${i + 1 === daysPerPage && "border-r-0"
          }`}
      >
        {format(date, "EEE dd")}
      </th>
    )
  }
  return headers
}

export const generateMonth = ({
  daysPerPage,
  startDate,
}: {
  daysPerPage: number
  startDate: Date
}) => {
  const headers = []
  let currentMonth = getMonth(startDate)
  let colspan = 0

  for (let i = 0; i < daysPerPage; i++) {
    const date = addDays(startDate, i)
    const month = getMonth(date)
    if (month === currentMonth) {
      colspan++
    } else {
      headers.push(
        <td
          key={i}
          colSpan={colspan}
          className="border border-t-0 border-r-0 text-lg py-2 font-bold text-center"
        >
          {format(addDays(startDate, i - colspan), "MMM yyyy")}
        </td>
      )
      currentMonth = month
      colspan = 1
    }
  }
  headers.push(
    <td
      key="last"
      colSpan={colspan}
      className="border border-t-0 border-r-0 text-lg py-2 font-bold text-center"
    >
      {format(addDays(startDate, daysPerPage - colspan), "MMM yyyy")}
    </td>
  )

  return headers
}

export const generateRowBorder = ({
  daysPerPage,
  startDate,
}: {
  daysPerPage: number
  startDate: Date
}) => {
  const borders = []
  const today = new Date()
  for (let i = 0; i < daysPerPage; i++) {
    const date = addDays(startDate, i)
    const isToday = isSameDay(date, today)
    borders.push(
      <th
        key={i}
        className={`${i + 1 !== daysPerPage && "border-r"} p-2 w-full max-w-24 ${isToday && "bg-primary-100"}`}
      ></th>
    )
  }
  return borders
}
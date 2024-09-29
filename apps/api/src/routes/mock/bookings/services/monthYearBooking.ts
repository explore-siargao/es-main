import { Request, Response } from 'express'
import { earnings } from './jsons/earnings'
import { ResponseService } from '@/common/service/response'
import { USER_NOT_AUTHORIZED } from '@/common/constants'

const response = new ResponseService()

export const getMonthYearBookings = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const monthYear = String(req.params.monthYear)
  const [monthName, year] = monthYear.split('-')

  const monthMap: { [key: string]: number } = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  }

  let month: number | undefined
  if (monthName !== undefined) {
    month = monthMap[monthName]
  }

  const daysInMonth = new Date(
    parseInt(year as string),
    month as number,
    0
  ).getDate()

  const allDates = Array.from({ length: daysInMonth }, (_, index) => index + 1)

  const listing: { [date: string]: object[] } = {}
  const earningsByDate: { [date: string]: number[] } = {}
  const dateFrom: { [date: string]: string[] } = {}
  const dateTo: { [date: string]: string[] } = {}
  const user: { [date: string]: object[] } = {}
  const status: { [date: string]: string[] } = {}
  earnings.forEach((item) => {
    const itemDate = new Date(item.date)
    const year = itemDate.getFullYear()
    const month = (itemDate.getMonth() + 1).toString().padStart(2, '0')
    const day = itemDate.getDate().toString().padStart(2, '0')
    const dateString = `${year}-${month}-${day}`

    if (!earningsByDate[dateString]) {
      earningsByDate[dateString] = []
      listing[dateString] = []
      user[dateString] = []
      dateFrom[dateString] = []
      dateTo[dateString] = []
      status[dateString] = []
    }

    earningsByDate[dateString]?.push(item.earning)
    listing[dateString]?.push(item.listing)
    user[dateString]?.push(item.user)
    dateFrom[dateString]?.push(item.dateFrom)
    dateTo[dateString]?.push(item.dateTo)
    status[dateString]?.push(item.status)
  })

  if (!isHost || !earnings.some((item) => item.user.id === userId)) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  let consolidatedEarnings: any[] = []
  allDates.forEach((date) => {
    const dateString = `${year}-${(month as number).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`
    const earningsForDate = earningsByDate[dateString] || []
    const listingsForDate = listing[dateString] || []
    const userForDate = user[dateString] || []
    const dateFromForDate = dateFrom[dateString] || []
    const statusForDate = status[dateString] || []
    const dateToForDate = dateTo[dateString] || []

    const entriesForDate = earningsForDate.map((earning, index) => ({
      date: dateString + ' 00:00:00',
      dateFrom: dateFromForDate[index] || null,
      dateTo: dateToForDate[index] || null,
      listing: listingsForDate[index] || null,
      user: userForDate[index] || null,
      status: statusForDate[index] || null,
      earning: earning,
    }))

    if (entriesForDate.length === 0) {
      consolidatedEarnings.push({
        date: dateString + ' 00:00:00',
        dateFrom: null,
        dateTo: null,
        listing: null,
        user: null,
        status: null,
        earning: 0,
      })
    } else {
      consolidatedEarnings = consolidatedEarnings.concat(entriesForDate)
    }
  })

  const totalEarnings = consolidatedEarnings.reduce(
    (sum, item) => sum + (item?.earning as number),
    0
  )
  const adjustment = 1000
  const tax = 1000
  const service = 10000

  res.json(
    response.success({
      item: {
        bookings: consolidatedEarnings,
        summary: {
          gross: totalEarnings,
          adjustments: adjustment,
          service: service,
          tax: tax,
          totalEarnings: totalEarnings + tax + adjustment + service,
        },
      },
    })
  )
}

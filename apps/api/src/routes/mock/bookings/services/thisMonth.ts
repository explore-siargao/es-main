import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { earnings } from './jsons/earnings'
import { USER_NOT_AUTHORIZED } from '@/common/constants'

const response = new ResponseService()

export const getThisMonthEarnings = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const earningsByDate: { [key: string]: number } = {}

  // Iterate over each day of the current month
  for (let day = 1; day <= now.getDate(); day++) {
    const currentDate = new Date(currentYear, currentMonth, day)
    currentDate.setDate(currentDate.getDate() + 1)
    const dateString = currentDate.toISOString().split('T')[0]
    // Initialize earnings for the current date as 0
    earningsByDate[dateString as string] = 0
  }

  // Populate earnings from the JSON data
  earnings.forEach((earning) => {
    const earningDate = new Date(earning.date)
    earningDate.setDate(earningDate.getDate() + 1)
    const dateString = earningDate.toISOString().split('T')[0]
    if (
      earningDate.getFullYear() === currentYear &&
      earningDate.getMonth() === currentMonth &&
      (dateString as string) in earningsByDate
    ) {
      //@ts-ignore
      earningsByDate[dateString as string] += Number(earning.earning)
    }
  })

  if (!isHost || !earnings.some((item) => item.user.id === userId)) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  const filterThisMonthEarnings = Object.keys(earningsByDate).map((date) => ({
    date: date + ' 00:00:00',
    earning: earningsByDate[date],
  }))

  filterThisMonthEarnings.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  })

  const totalEarnings = filterThisMonthEarnings.reduce(
    (sum, item) => sum + (item?.earning as number),
    0
  )
  const adjustment = 1000
  const tax = 1000
  const service = 10000
  res.json(
    response.success({
      item: {
        days: filterThisMonthEarnings,
        summary: {
          gross: parseFloat(totalEarnings.toFixed(2)),
          adjustments: adjustment,
          service: service,
          tax: tax,
          totalEarnings:
            parseFloat(totalEarnings.toFixed(2)) + tax + adjustment + service,
        },
      },
    })
  )
}

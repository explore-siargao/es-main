import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { earnings } from './jsons/earnings'
import { USER_NOT_AUTHORIZED } from '@/common/constants'

const response = new ResponseService()

export const getPaidEarnings = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const now = new Date()
  const utcNow = new Date(now.toISOString().split('T')[0] as string)

  const earningsByDate: { [key: string]: number } = {}

  earnings.forEach((earning) => {
    const earningDate = new Date(earning.date)
    earningDate.setDate(earningDate.getDate() + 1)
    const utcEarningDate = new Date(
      earningDate.toISOString().split('T')[0] as string
    )
    if (
      (earningDate.getFullYear() < utcNow.getFullYear() ||
        (earningDate.getFullYear() === utcNow.getFullYear() &&
          earningDate.getMonth() <= utcNow.getMonth())) &&
      (earningDate.getFullYear() !== utcNow.getFullYear() ||
        earningDate.getMonth() !== utcNow.getMonth() ||
        earningDate.getDate() - 1 <= utcNow.getDate())
    ) {
      const dateString = utcEarningDate.toISOString().split('T')[0]
      if ((dateString as string) in earningsByDate) {
        //@ts-ignore
        earningsByDate[dateString as string] += Number(earning.earning)
      } else {
        earningsByDate[dateString as string] = Number(earning.earning)
      }
    }
  })

  if (!isHost || !earnings.some((item) => item.user.id === userId)) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
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
        months: filterThisMonthEarnings,
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

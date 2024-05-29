import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { earnings } from './jsons/earnings'
import { USER_NOT_AUTHORIZED } from '@/common/constants'

const response = new ResponseService()

export const getUpcomingBookings = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const currentDate = new Date()

  const filteredBookings = earnings.filter((earning) => {
    const earningDate = new Date(earning.date)
    return (
      earningDate.getFullYear() > currentDate.getFullYear() ||
      (earningDate.getFullYear() === currentDate.getFullYear() &&
        earningDate.getMonth() > currentDate.getMonth())
    )
  })

  if (!isHost || !earnings.some((item) => item.user.id === userId)) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  filteredBookings.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  const totalEarnings = filteredBookings.reduce(
    (sum, item) => sum + (item?.earning as number),
    0
  )
  const adjustment = 1000
  const tax = 1000
  const service = 10000

  res.json(
    response.success({
      item: {
        bookings: filteredBookings,
        pageItemCount: 1,
        allItemCount: filteredBookings.length,
        summary: {
          gross: parseFloat(totalEarnings.toFixed(2)),
          adjustments: adjustment,
          service: service,
          taxes: tax,
          totalEarnings:
            parseFloat(totalEarnings.toFixed(2)) + tax + adjustment + service,
        },
      },
    })
  )
}

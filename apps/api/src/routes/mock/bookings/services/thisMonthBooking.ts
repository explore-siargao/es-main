import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { earnings } from './jsons/earnings'
import { USER_NOT_AUTHORIZED } from '@/common/constants'

const response = new ResponseService()

export const getThisMonthBookings = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const currentDate = new Date()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )

  const filteredBooking = earnings.filter((earning) => {
    const earningDate = new Date(earning.date)

    return (
      earningDate >= firstDayOfMonth &&
      earningDate.getDate() <= currentDate.getDate() &&
      earningDate.getMonth() === currentDate.getMonth() &&
      earningDate.getFullYear() === currentDate.getFullYear()
    )
  })

  filteredBooking.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  if (!isHost || !earnings.some((item) => item.user.id === userId)) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }

  const totalEarnings = filteredBooking.reduce(
    (sum, item) => sum + (item?.earning as number),
    0
  )
  const adjustment = 1000
  const tax = 1000
  const service = 10000

  res.json(
    response.success({
      item: {
        bookings: filteredBooking,
        pageItemCount: 1,
        allItemCount: filteredBooking.length,
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

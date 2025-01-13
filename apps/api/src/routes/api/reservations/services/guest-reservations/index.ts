import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import {
  E_ReservationStatus,
  Z_Reservations,
} from '@repo/contract-2/reservations'
import { dbReservations } from '@repo/database'
import { Request, Response } from 'express'
import { buildCancelledReservationsPipeline } from './pipelines/cancelled-reservation'
import { toZonedTime } from 'date-fns-tz'
import { buildFinishReservationsPipeline } from './pipelines/finish-reservation'
import { buildActiveReservationsPipeline } from './pipelines/active-reservation'

const response = new ResponseService()
export const guestGroupReservations = async (req: Request, res: Response) => {
  const status = req.query.status
  const user = res.locals.user.id
  const timeZone = req.header('time-zone')
  const { page = 1, limit = 15 } = req.query

  if (!timeZone) {
    res.json(response.error({ message: 'time-zone header is required' }))
  } else {
    try {
      const dateNow = toZonedTime(new Date(), timeZone as string)
      if (status === E_ReservationStatus.Cancelled) {
        const pipeline = buildCancelledReservationsPipeline(
          user,
          page as number,
          limit as number
        )
        const cancelledReservations = await dbReservations.aggregate(pipeline)
        const totalCounts = await dbReservations
          .find({ status: 'Cancelled', guest: user })
          .countDocuments()
        const validReservations = Z_Reservations.safeParse(
          cancelledReservations
        )
        if (validReservations.success) {
          res.json(
            response.success({
              items: cancelledReservations,
              pageItemCount: cancelledReservations.length,
              allItemCount: totalCounts,
              message: 'Cancelled reservations successfully fetched',
            })
          )
        } else {
          console.error(validReservations.error.message)
          res.json(response.error({ message: 'Invalid reservation data' }))
        }
      } else if (status === 'Done') {
        const pipeline = buildFinishReservationsPipeline(
          user,
          dateNow,
          page as number,
          limit as number
        )
        const finishReservations = await dbReservations.aggregate(pipeline)
        const totalCounts = await dbReservations
          .find({ status: 'Confirmed', guest: user, endDate: { $lt: dateNow } })
          .countDocuments()
        const validReservations = Z_Reservations.safeParse(finishReservations)
        if (validReservations.success) {
          res.json(
            response.success({
              items: finishReservations,
              pageItemCount: finishReservations.length,
              allItemCount: totalCounts,
              message: 'Finish reservations successfully fetched',
            })
          )
        } else {
          console.error(validReservations.error.message)
          res.json(response.error({ message: 'Invalid reservation data' }))
        }
      } else if (status === 'Active') {
        const pipeline = buildActiveReservationsPipeline(
          user,
          dateNow,
          page as number,
          limit as number
        )
        const activeReservations = await dbReservations.aggregate(pipeline)
        const totalCounts = await dbReservations
          .find({
            status: 'Confirmed',
            guest: user,
            endDate: { $gte: dateNow },
          })
          .countDocuments()
        const validReservations = Z_Reservations.safeParse(activeReservations)
        if (validReservations.success) {
          res.json(
            response.success({
              items: activeReservations,
              pageItemCount: activeReservations.length,
              allItemCount: totalCounts,
              message: 'Finish reservations successfully fetched',
            })
          )
        } else {
          console.error(validReservations.error.message)
          res.json(response.error({ message: 'Invalid reservation data' }))
        }
      } else {
        res.json(response.error({ message: 'status is required' }))
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  }
}

import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { toZonedTime } from 'date-fns-tz'
import { Types } from 'mongoose'
import { E_ReservationStatus, Z_Grouped_Reservations } from '@repo/contract-2/reservations'
import { dbReservations } from '@repo/database'
import { pipeline } from 'stream'
import { getGroupedReservationPipeline } from './pipelines/groupedReservationPipeline'

const response = new ResponseService()
export const getReservationsGroupedByReferenceId = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.user.id
  const timeZone = req.header('time-zone')
  const { page = 1, limit = 15 } = req.query
  if (!timeZone) {
    res.json(response.error({ message: 'time-zone header is required' }))
  } else {
    try {
      const dateNow = toZonedTime(new Date(), timeZone as string)
      const pipelines = getGroupedReservationPipeline(userId, dateNow, page as number, limit as number)
      const reservations = await dbReservations.aggregate(pipelines)
      const validGroupedReservations = Z_Grouped_Reservations.safeParse(reservations)
      const totalCounts = await dbReservations
        .find({ status: 'Confirmed', guest: userId, endDate: { $lt: dateNow } })
        const groupedByReferenceId = totalCounts.reduce((acc:any, item:any) => {
            const referenceId = item.xendItPaymentReferenceId;
            if (!acc[referenceId]) {
              acc[referenceId] = [];
            }
            acc[referenceId].push(item);
            return acc;
          }, {});
          
          // Convert the grouped object back into an array format (optional)
          const groupedArray = Object.entries(groupedByReferenceId).map(([referenceId, reservations]) => ({
            referenceId,
            reservations,
          }));
          if(validGroupedReservations.success){
      res.json(
        response.success({
          items: reservations,
          pageItemCount: reservations.length,
         allItemCount: groupedArray.length,
          message: 'Reservations successfully fetched',
        })
      )
    }else{
        console.error(validGroupedReservations.error.message)
        res.json(response.error({ message: 'Invalid reservation data' }))
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

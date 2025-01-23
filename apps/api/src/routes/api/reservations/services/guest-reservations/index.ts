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
import { API_URL } from '@/common/constants/ev'

const response = new ResponseService()

const fetchPaymentMethodDetails = async (xendItPaymentRequestId: string) => {
  const paymentRequestResponse = await fetch(
    `${API_URL}/api/v1/xendit/payment-request?id=${xendItPaymentRequestId}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const paymentRequestData = await paymentRequestResponse.json();
  return {
    type: paymentRequestData.item.payment_method.type,
    ewallet: {
      channelCode: paymentRequestData.item.payment_method.ewallet?.channel_code,
    },
    cardDetails: {
      maskedCardNumber:
        paymentRequestData.item.payment_method.card?.card_information?.masked_card_number,
      cardType: paymentRequestData.item.payment_method.card?.card_information?.type,
      network: paymentRequestData.item.payment_method.card?.card_information?.network,
    },
  };
};

export const guestGroupReservations = async (req: Request, res: Response) => {
  const status = req.query.status
  const user = res.locals.user.id
  const timeZone = "Asia/Manila"
  const { page = 1, limit = 15, referenceId } = req.query
  if (!timeZone) {
    res.json(response.error({ message: 'time-zone header is required' }))
  } else {
    try {
      const dateNow = toZonedTime(new Date(), timeZone as string)

      const enrichSingleReservationWithPayment = async (reservation: any) => {
        if (referenceId !== "undefined" && referenceId) {
          const paymentDetails = await fetchPaymentMethodDetails(reservation.xendItPaymentRequestId as string);
          return {
            ...reservation,
            paymentDetails,
          };
        }
        return reservation;
      };

      if (status === E_ReservationStatus.Cancelled) {
        const pipeline = buildCancelledReservationsPipeline(
          user,
          page as number,
          limit as number,
           referenceId as string | undefined
        )
        const cancelledReservations = await dbReservations.aggregate(pipeline)
        const totalCounts = await dbReservations
          .find({ status: 'Cancelled', guest: user })
          .countDocuments()
        const validReservations = Z_Reservations.safeParse(
          cancelledReservations
        )
        if (validReservations.success) {
          if(referenceId === "undefined"){  
            
          res.json(
            response.success({
              items: cancelledReservations,
              pageItemCount: cancelledReservations.length,
              allItemCount: totalCounts,
              message: 'Cancelled reservations successfully fetched',
            })
          )
        }else {
          const detailedReservation = await enrichSingleReservationWithPayment(cancelledReservations[0]);
          res.json(
            response.success({
              item: detailedReservation,
              message: 'Reservation successfully fetched',
            })
          )
        }
        } else {
          console.error(validReservations.error.message)
          res.json(response.error({ message: 'Invalid reservation data' }))
        }
      } else if (status === 'Done') {
        const pipeline = buildFinishReservationsPipeline(
          user,
          dateNow,
          page as number,
          limit as number,
          referenceId as string | undefined
        )
        const finishReservations = await dbReservations.aggregate(pipeline)
        const totalCounts = await dbReservations
          .find({ status: 'Confirmed', guest: user, endDate: { $lt: dateNow } })
          .countDocuments()
        const validReservations = Z_Reservations.safeParse(finishReservations)
        if (validReservations.success) {
          if(referenceId === "undefined"){  
            res.json(
            response.success({
              items: finishReservations,
              pageItemCount: finishReservations.length,
              allItemCount: totalCounts,
              message: 'Finish reservations successfully fetched',
            })
          )} else {
            const detailedReservation = await enrichSingleReservationWithPayment(finishReservations[0]);
            res.json(
              response.success({
                item: detailedReservation,
                message: 'Reservation successfully fetched',
              })
            )
          }
        
        } else {
          console.error(validReservations.error.message)
          res.json(response.error({ message: 'Invalid reservation data' }))
        }
      } else if (status === 'Active') {
        const pipeline = buildActiveReservationsPipeline(
          user,
          dateNow,
          page as number,
          limit as number,
          referenceId as string | undefined
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
          if(referenceId === "undefined"){  
          res.json(
            response.success({
              items: activeReservations,
              pageItemCount: activeReservations.length,
              allItemCount: totalCounts,
              message: 'Finish reservations successfully fetched',
            })
          )
        }
        else{ 
          const detailedReservation = await enrichSingleReservationWithPayment(activeReservations[0]);
          res.json(
          response.success({
            item: detailedReservation,
            message: 'Reservation successfully fetched',
          })
        )}
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

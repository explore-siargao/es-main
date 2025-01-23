import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { toZonedTime } from 'date-fns-tz'
import { Types } from 'mongoose'
import {
  E_ReservationStatus,
  Z_Grouped_Reservations,
} from '@repo/contract-2/reservations'
import { dbReservations } from '@repo/database'
import { pipeline } from 'stream'
import { getGroupedReservationPipeline } from './pipelines/groupedReservationPipeline'
import { API_URL } from '@/common/constants/ev'

const response = new ResponseService()

export const getReservationsGroupedByReferenceId = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.user.id
  const timeZone = 'Asia/Manila'
  const { page = 1, limit = 15, referenceId } = req.query

  if (!timeZone) {
    res.json(response.error({ message: 'time-zone header is required' }))
  }

  try {
    const dateNow = toZonedTime(new Date(), timeZone as string)
    const pipelines = getGroupedReservationPipeline(
      userId,
      dateNow,
      page as number,
      limit as number,
      referenceId as string | undefined
    )

    const reservations = await dbReservations.aggregate(pipelines)

    // Validate reservations
    const validGroupedReservations =
      Z_Grouped_Reservations.safeParse(reservations)

    const fetchPaymentMethodDetails = async (
      xendItPaymentRequestId: string
    ) => {
      const paymentRequestResponse = await fetch(
        `${API_URL}/api/v1/xendit/payment-request?id=${xendItPaymentRequestId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const paymentRequestData = await paymentRequestResponse.json()
      return {
        type: paymentRequestData.item.payment_method.type,
        ewallet: {
          channelCode:
            paymentRequestData.item.payment_method.ewallet?.channel_code,
        },
        cardDetails: {
          maskedCardNumber:
            paymentRequestData.item.payment_method.card?.card_information
              ?.masked_card_number,
          cardType:
            paymentRequestData.item.payment_method.card?.card_information?.type,
          network:
            paymentRequestData.item.payment_method.card?.card_information
              ?.network,
        },
      }
    }

    if (validGroupedReservations.success) {
      if (reservations.length === 1) {
        const paymentDetails = await fetchPaymentMethodDetails(
          reservations[0].reservations[0].xendItPaymentRequestId
        )
        res.json(
          response.success({
            item: { ...reservations[0], paymentDetails },
            message: 'Reservation successfully fetched',
          })
        )
      } else {
        const enrichedItems = await Promise.all(
          reservations.map(async (reservationGroup) => {
            const paymentDetails = await fetchPaymentMethodDetails(
              reservationGroup.xendItPaymentReferenceId
            )
            return { ...reservationGroup, ...paymentDetails }
          })
        )

        res.json(
          response.success({
            items: enrichedItems,
            pageItemCount: enrichedItems.length,
            allItemCount: reservations.length,
            message: 'Reservations successfully fetched',
          })
        )
      }
    } else {
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

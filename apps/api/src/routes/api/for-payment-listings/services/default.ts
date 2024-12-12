import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import {
  Z_Add_For_Payment,
  Z_Update_For_Payment,
} from '@repo/contract-2/for-payment-listings'
import { dbForPaymentListing } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const bookListing = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const {
    propertyIds = null,
    rentalIds = null,
    activityIds = null,
    price,
    guestCount,
    startDate,
    endDate,
  } = req.body
  try {
    if (
      (!propertyIds && !rentalIds && !activityIds) ||
      !price ||
      !guestCount ||
      !startDate ||
      !endDate
    ) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const validForPaymentInput = Z_Add_For_Payment.safeParse({
        userId: userId,
        propertyIds,
        rentalIds,
        activityIds,
        price,
        guestCount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      })
      if (validForPaymentInput.success) {
        const newForPayments = new dbForPaymentListing(
          validForPaymentInput.data
        )
        const saveForPayment = await newForPayments.save()
        res.json(
          response.success({
            item: saveForPayment,
            message: 'Listing successfully added to for payment',
          })
        )
      } else {
        console.error(JSON.parse(validForPaymentInput.error.message))
        res.json(response.error({ message: 'Invalid payloads' }))
      }
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateForPayment = async (req: Request, res: Response) => {
  const forPaymentId = req.params.forPaymentId
  const { guestCount, price, startDate, endDate, contacts } = req.body

  const validForPaymentUpdate = Z_Update_For_Payment.safeParse({
    _id: String(forPaymentId),
    guestCount,
    price,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
    contacts,
  })

  try {
    if (!price && !guestCount && !contacts && !startDate && !endDate) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      if (validForPaymentUpdate.success) {
        const updateForPayment = await dbForPaymentListing.findByIdAndUpdate(
          forPaymentId,
          {
            $set: validForPaymentUpdate.data,
          }
        )
        res.json(
          response.success({
            item: validForPaymentUpdate.data,
            message: 'Successfullu updated payment details',
          })
        )
      } else {
        console.log(JSON.parse(validForPaymentUpdate.error.message))
        res.json(response.error({ message: 'Invalid payload' }))
      }
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

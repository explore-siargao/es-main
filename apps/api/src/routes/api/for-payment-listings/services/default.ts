import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import {
  ACTIVITY_HOST_COMMISSION_PERCENT,
  GUEST_COMMISSION_PERCENT,
  PROPERTY_HOST_COMMISSION_PERCENT,
  RENTAL_HOST_COMMISSION_PERCENT,
} from '@repo/constants'
import {
  Z_Add_For_Payment,
  Z_Update_For_Payment,
} from '@repo/contract-2/for-payment-listings'
import {
  dbActivities,
  dbBookableUnitTypes,
  dbForPaymentListing,
  dbRentals,
} from '@repo/database'
import { differenceInCalendarDays } from 'date-fns'
import { Request, Response } from 'express'

const response = new ResponseService()
export const bookListing = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  let totalPrice, hostCommission
  const {
    propertyIds = null,
    rentalIds = null,
    activityIds = null,
    guestCount,
    startDate,
    endDate,
  } = req.body
  try {
    if (
      (!propertyIds && !rentalIds && !activityIds) ||
      !guestCount ||
      !startDate ||
      !endDate
    ) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      if (propertyIds) {
        const unit: any = await dbBookableUnitTypes
          .findOne({ qtyIds: { $elemMatch: { _id: propertyIds.unitId } } })
          .populate('unitPrice')
        const startDay = new Date(startDate)
        const endDay = new Date(endDate)
        const countDays = differenceInCalendarDays(endDay, startDay)
        totalPrice = unit?.unitPrice.baseRate * guestCount * countDays
        hostCommission = PROPERTY_HOST_COMMISSION_PERCENT * totalPrice
      } else if (rentalIds) {
        const rental: any = await dbRentals
          .findOne({
            _id: rentalIds.rentalId,
            qtyIds: { $elemMatch: { _id: rentalIds.qtyIdsId } },
          })
          .populate('pricing')
        const startDay = new Date(startDate)
        const endDay = new Date(endDate)
        const countDays = differenceInCalendarDays(endDay, startDay)
        totalPrice = rental?.pricing.dayRate * guestCount * countDays
        hostCommission = RENTAL_HOST_COMMISSION_PERCENT * totalPrice
      } else if (activityIds) {
        const activity = await dbActivities.findOne({
          _id: activityIds.activityId,
        })
        const price = activity?.pricePerPerson || activity?.pricePerSlot || 0
        if (activity?.pricePerPerson) {
          totalPrice = price * guestCount
          hostCommission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
        } else if (activity?.pricePerSlot) {
          totalPrice = price
          hostCommission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
        } else {
          res.json(
            response.error({ message: 'Price is not set on this activity' })
          )
        }
      }
      const guestCommission = (totalPrice || 0) * GUEST_COMMISSION_PERCENT
      const validForPaymentInput = Z_Add_For_Payment.safeParse({
        userId: userId,
        propertyIds,
        rentalIds,
        activityIds,
        price: (totalPrice || 0) + guestCommission,
        guestCount,
        // key wrong spelling
        guestComission: guestCommission,
        // key wrong spelling
        hostComission: hostCommission,
        status: 'Active',
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
  let { guestCount, startDate, endDate, contacts } = req.body
  let totalPrice, hostCommission

  try {
    if (!guestCount && !contacts && !startDate && !endDate) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const forPayment = await dbForPaymentListing.findOne({
        status: 'Active',
        _id: forPaymentId,
      })
      if (!forPayment) {
        res.json(response.error({ message: 'No for payment found' }))
      } else {
        if (!startDate) {
          startDate = forPayment?.startDate
        }
        if (!endDate) {
          endDate = forPayment?.endDate
        }
        if (!guestCount) {
          guestCount = forPayment?.guestCount
        }
        if (forPayment.propertyIds) {
          const unit: any = await dbBookableUnitTypes
            .findOne({
              qtyIds: { $elemMatch: { _id: forPayment.propertyIds.unitId } },
            })
            .populate('unitPrice')
          const startDay = new Date(startDate)
          const endDay = new Date(endDate)
          const countDays = differenceInCalendarDays(endDay, startDay)
          totalPrice = unit?.unitPrice.baseRate * guestCount * countDays
          hostCommission = PROPERTY_HOST_COMMISSION_PERCENT * totalPrice
        } else if (forPayment.rentalIds) {
          const rental: any = await dbRentals
            .findOne({
              _id: forPayment.rentalIds.rentalId,
              qtyIds: { $elemMatch: { _id: forPayment.rentalIds.qtyIdsId } },
            })
            .populate('pricing')
          const startDay = new Date(startDate)
          const endDay = new Date(endDate)
          const countDays = differenceInCalendarDays(endDay, startDay)
          totalPrice = rental?.pricing.dayRate * guestCount * countDays
          hostCommission = RENTAL_HOST_COMMISSION_PERCENT * totalPrice
        } else if (forPayment.activityIds) {
          const activity = await dbActivities.findOne({
            _id: forPayment.activityIds.activityId,
          })
          const price = activity?.pricePerPerson || activity?.pricePerSlot || 0
          if (activity?.pricePerPerson) {
            totalPrice = price * guestCount
            hostCommission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
          } else if (activity?.pricePerSlot) {
            totalPrice = price
            hostCommission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
          } else {
            res.json(
              response.error({ message: 'Price is not set on this activity' })
            )
          }
        }
        const guestCommission = (totalPrice || 0) * GUEST_COMMISSION_PERCENT
        const validForPaymentUpdate = Z_Update_For_Payment.safeParse({
          _id: String(forPaymentId),
          guestCount,
          price: (totalPrice || 0) + guestCommission,
          // key wrong spelling
          hostComission: hostCommission,
          // key wrong spelling
          guestComission: guestCommission,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          contacts,
        })
        if (validForPaymentUpdate.success) {
          const updateForPayment = await dbForPaymentListing.findByIdAndUpdate(
            forPaymentId,
            {
              $set: validForPaymentUpdate.data,
            }
          )
          res.json(
            response.success({
              item: updateForPayment,
              message: 'Successfullu updated payment details',
            })
          )
        } else {
          console.log(JSON.parse(validForPaymentUpdate.error.message))
          res.json(response.error({ message: 'Invalid payload' }))
        }
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

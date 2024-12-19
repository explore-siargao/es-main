import { T_Add_To_Cart } from '@repo/contract-2/cart'
import { T_Add_For_Payment } from '@repo/contract-2/for-payment-listings'
import { dbActivities, dbBookableUnitTypes, dbRentals } from '@repo/database'
import { differenceInCalendarDays } from 'date-fns'

export const totalPrice = async (cartItems: T_Add_To_Cart[]) => {
  let unitPrice = 0,
    activityPrice = 0,
    rentalPrice = 0
  for (const item of cartItems) {
    const countDays = differenceInCalendarDays(item.endDate, item.startDate)
    if (item.propertyIds) {
      const findUnit: any = await dbBookableUnitTypes
        .findOne({
          qtyIds: { $elemMatch: { _id: item.propertyIds.unitId } },
        })
        .populate('unitPrice')
      const unit = findUnit.toObject()
      unitPrice =
        unitPrice + unit.unitPrice.baseRate * countDays * item.guestCount
    } else if (item.rentalIds) {
      const findRental: any = await dbRentals
        .findOne({ _id: item.rentalIds.rentalId })
        .populate('pricing')
      const rental = findRental?.toObject()
      rentalPrice =
        rentalPrice + rental?.pricing.dayRate * item.guestCount * countDays
    } else if (item.activityIds) {
      const findActivity: any = await dbActivities.findOne({
        _id: item.activityIds.activityId,
      })
      const activity = findActivity?.toObject()
      if (activity.pricePerPerson) {
        activityPrice =
          activityPrice + activity.pricePerPerson * item.guestCount
      } else if (activity.pricePerSlot) {
        activityPrice = activityPrice + activity.pricePerSlot
      }
    }
  }
  const amount = unitPrice + rentalPrice + activityPrice || 0
  return amount
}

export const totalPayment = async (item: T_Add_For_Payment) => {
  let unitPrice = 0,
    activityPrice = 0,
    rentalPrice = 0
  const countDays = differenceInCalendarDays(item.endDate, item.startDate)
  if (item.propertyIds) {
    const findUnit: any = await dbBookableUnitTypes
      .findOne({
        qtyIds: { $elemMatch: { _id: item.propertyIds.unitId } },
      })
      .populate('unitPrice')
    const unit = findUnit.toObject()
    unitPrice =
      unitPrice + unit.unitPrice.baseRate * countDays * item.guestCount
  } else if (item.rentalIds) {
    const findRental: any = await dbRentals
      .findOne({ _id: item.rentalIds.rentalId })
      .populate('pricing')
    const rental = findRental?.toObject()
    rentalPrice =
      rentalPrice + rental?.pricing.dayRate * item.guestCount * countDays
  } else if (item.activityIds) {
    const findActivity: any = await dbActivities.findOne({
      _id: item.activityIds.activityId,
    })
    const activity = findActivity?.toObject()
    if (activity.pricePerPerson) {
      activityPrice = activityPrice + activity.pricePerPerson * item.guestCount
    } else if (activity.pricePerSlot) {
      activityPrice = activityPrice + activity.pricePerSlot
    }
  }
  const amount = unitPrice + rentalPrice + activityPrice || 0
  return amount
}

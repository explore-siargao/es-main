import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbRentalRates, dbRentals } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const getRentalRates = async (req: Request, res: Response) => {
  const rentalId = req.params.rentalId
  try {
    const getRental = await dbRentalRates.findOne({ _id: rentalId })
    if (!getRental) {
      return res.json(response.error({ message: 'rental not found' }))
    }

    res.json(response.success({ item: getRental }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateRentalRate = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const rentalId = req.params.rentalId
  const { dayRate, requiredDeposit, adminBookingCharge } = req.body
  if (!dayRate && !requiredDeposit && !adminBookingCharge) {
    return res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  }
  try {
    const rental = await dbRentals.findById({ _id: rentalId })
    if (!rental) {
      return res.json(
        response.error({
          message: 'Rental not found!',
        })
      )
    }
    if (rental.host?.toString() !== userId) {
      return res.json(
        response.error({
          message: USER_NOT_AUTHORIZED,
        })
      )
    }
    const rates = await dbRentalRates.findById(rental.pricing)
    if (rates) {
      rates.dayRate = dayRate || rates.dayRate
      rates.requiredDeposit = requiredDeposit || rates.requiredDeposit
      rates.adminBookingCharge = adminBookingCharge || rates.adminBookingCharge
      rates.updatedAt = new Date()
    }
    await rates?.save()
    rental.finishedSections = [
      'basicInfo',
      'details',
      'addOns',
      'photos',
      'pricing',
    ]
    rental.updatedAt = new Date()
    await rental.save()
    res.json(
      response.success({
        item: rates,
        message: 'Rental rates successfully updated!',
      })
    )
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

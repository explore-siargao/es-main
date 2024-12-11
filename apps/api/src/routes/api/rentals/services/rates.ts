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
    const getRental = await dbRentals.findOne({ _id: rentalId })
    if (!getRental) {
      res.json(response.error({ message: 'rental not found' }))
    } else {
      const getRentalRate = await dbRentalRates.findOne({
        _id: getRental?.pricing,
      })
      res.json(response.success({ item: getRentalRate }))
    }
  } catch (err: any) {
    res.json(
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
    res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  } else {
    try {
      const rental = await dbRentals.findById({ _id: rentalId })
      if (!rental) {
        res.json(
          response.error({
            message: 'Rental not found!',
          })
        )
      } else {
        if (rental?.host?.toString() !== userId) {
          res.json(
            response.error({
              message: USER_NOT_AUTHORIZED,
            })
          )
        } else {
          const rates = await dbRentalRates.findById(rental?.pricing)
          if (rates) {
            rates.dayRate = dayRate || rates.dayRate
            rates.requiredDeposit = requiredDeposit || rates.requiredDeposit
            rates.adminBookingCharge =
              adminBookingCharge || rates.adminBookingCharge
            rates.updatedAt = new Date()
          }
          await rates?.save()
          if (rental) {
            rental.updatedAt = new Date()
          }
          await rental?.save()
          await dbRentals.findByIdAndUpdate(rental._id, {
            $addToSet: {
              finishedSections: 'pricing',
            },
          })
          res.json(
            response.success({
              item: rates,
              message: 'Rental rates successfully updated!',
            })
          )
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
}

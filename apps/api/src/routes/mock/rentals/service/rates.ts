import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { rentals } from './jsons/rentals'

const response = new ResponseService()
export const getRentalRates = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const id = Number(req.params.rentalId)
  try {
    const getRental = rentals.find(
      (item) => item.id === id && item.hostId === hostId
    )
    if (!getRental) {
      return res.json(response.error({ message: 'rental not found' }))
    }
    const rentalRate = getRental?.Pricing
    if (!rentalRate) {
      return res.json(response.error({ message: 'Rental rates not avilable' }))
    }
    res.json(response.success({ item: rentalRate }))
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
  const id = Number(req.params.rentalId)
  const { dayRate, requiredDeposit, adminBookingCharge } = req.body
  if (!dayRate && !requiredDeposit && !adminBookingCharge) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  try {
    const getRental = rentals.find((item) => item.id === id)
    if (!getRental) {
      return res.json(response.error({ message: 'Rental not found' }))
    }
    if (getRental.hostId !== userId) {
      return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }
    const rate = getRental.Pricing
    rate.dayRate = dayRate || rate.dayRate
    rate.requiredDeposit = requiredDeposit || rate.requiredDeposit
    getRental.finishedSections =
      '["basicInfo", "details", "addOns", "photos", "pricing"]'
    res.json(
      response.success({
        item: rate,
        message: 'rental rates successfully updated',
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

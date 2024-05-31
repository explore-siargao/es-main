import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_UpdateRentalLocation } from '@repo/contract'
import { dbAddresses, dbRentals } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getRentalLocation = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const id = req.params.rentalId
  try {
    const getRental = await dbRentals
      .findOne({
        host: hostId,
        _id: id,
      })
      .populate('location')
    if (!getRental) {
      return res.json(response.error({ message: 'Rental location not found!' }))
    }
    const rentalLocation = getRental?.location
    res.json(response.success({ item: rentalLocation }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateRentalLocation = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const rentalId = req.params.rentalId
  const {
    streetAddress,
    city,
    barangay,
    latitude,
    longitude,
    howToGetThere,
  }: T_UpdateRentalLocation = req.body
  if (!streetAddress && !city && !barangay) {
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
    if (rental.host?.toString() !== hostId) {
      return res.json(
        response.error({
          message: USER_NOT_AUTHORIZED,
        })
      )
    }
    const location = await dbAddresses.findById(rental.location)
    if (location) {
      location.streetAddress = streetAddress || location.streetAddress
      location.city = city || location.city
      location.barangay = barangay || location.barangay
      location.longitude = longitude || location.longitude
      location.latitude = latitude || location.latitude
      location.howToGetThere = howToGetThere || location.howToGetThere
      location.updatedAt = new Date()
    }
    await location?.save()
    rental.finishedSections = ["basicInfo", "details", "addOns", "photos", "pricing", "location"]
    rental.updatedAt = new Date()
    await rental.save()
    res.json(
      response.success({
        item: location,
        message: 'Rental location successfully updated!',
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

import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_UpdateRentalLocation } from '@repo/contract'
import { dbLocations, dbRentals } from '@repo/database'
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
      res.json(response.error({ message: 'Rental location not found!' }))
    } else {
      const rentalLocation = getRental?.location
      res.json(response.success({ item: rentalLocation }))
    }
  } catch (err: any) {
    res.json(
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
      }
      if (rental?.host?.toString() !== hostId) {
        res.json(
          response.error({
            message: USER_NOT_AUTHORIZED,
          })
        )
      } else {
        const location = await dbLocations.findById(rental?.location)
        if (location) {
          location.streetAddress = streetAddress || location.streetAddress
          location.city = city || location.city
          location.barangay = barangay || location.barangay
          location.longitude = longitude || location.longitude
          location.latitude = latitude || location.latitude
          location.howToGetThere = howToGetThere || location.howToGetThere
          location.updatedAt = new Date()
          await location?.save()
        }
        if (rental) {
          rental.updatedAt = new Date()
          await rental?.save()
          await dbRentals.findByIdAndUpdate(rental._id, {
            $addToSet: {
              finishedSections: 'location',
            },
          })
        }
        res.json(
          response.success({
            item: location,
            message: 'Rental location successfully updated!',
          })
        )
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

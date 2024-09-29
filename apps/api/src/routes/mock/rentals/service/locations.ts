import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { rentals } from './jsons/rentals'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'

const response = new ResponseService()

export const getRentalLocation = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const id = Number(req.params.rentalId)
  try {
    const getRental = rentals.find(
      (item) => item.id === id && item.hostId === hostId
    )
    if (!getRental) {
      res.json(response.error({ message: 'Rental location not found!' }))
    }
    const rentalLocation = getRental?.Location
    res.json(response.success({ item: rentalLocation }))
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
  const id = Number(req.params.rentalId)
  const { street, city, barangay, latitude, longitude, howToGetThere } =
    req.body
  if (!street && !city && !barangay) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
  try {
    const getRental = rentals.find(
      (item) => item.id === id && item.hostId === hostId
    )
    if (getRental?.hostId !== hostId) {
      res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }
    const getLocation = getRental?.Location
    if (getLocation) {
      getLocation.street = street || getLocation.street
      getLocation.city = city || getLocation.city
      getLocation.barangay = barangay || getLocation.barangay
      getLocation.howToGetThere = howToGetThere || getLocation.howToGetThere
      getLocation.latitude = latitude || getLocation.latitude
      getLocation.longitude = longitude || getLocation.longitude
      if (getRental) {
        getRental.finishedSections =
          '["basicInfo", "details", "addOns", "photos", "pricing", "location"]'
      }
    }
    res.json(
      response.success({
        item: getLocation,
        message: 'Rental location successfully updated!',
      })
    )
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

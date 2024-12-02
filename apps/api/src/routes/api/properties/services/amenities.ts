import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_Property_Amenity } from '@repo/contract'
import { dbBookableUnitTypes, dbProperties } from '@repo/database'
import { Request, Response } from 'express'
import mongoose from 'mongoose'

const response = new ResponseService()

interface IAmenity {
  _id: string
  index: number
  category: string
  amenity: string
  isSelected: boolean
}

export const updateBookableUnitTypeAmenities = async (
  req: Request,
  res: Response
) => {
  const hostId = res.locals.user?.id
  const bookableUnitTypeId = req.params.bookableUnitTypeId
  const propertyId = req.params.propertyId
  const amenities: IAmenity[] = req.body.amenities
  const getProperty = await dbProperties.findOne({
    _id: propertyId,
    offerBy: hostId,
    deletedAt: null,
  })
  if (!getProperty) {
    res.json(response.error({ message: 'Property not found' }))
  } else {
    if (!getProperty?.bookableUnits.includes(bookableUnitTypeId as any)) {
      res.json(
        response.error({ message: 'Bookable unit not exists on this property' })
      )
    } else {
      if (!amenities || !Array.isArray(amenities)) {
        res.json(
          response.error({ message: REQUIRED_VALUE_EMPTY + ' or invalid data' })
        )
      } else {
        try {
          const trueAmenities = amenities.filter(
            (amenity) => amenity.isSelected === true
          )
          const newAmenities = await dbBookableUnitTypes.findByIdAndUpdate(
            bookableUnitTypeId,
            {
              $set: {
                amenities: trueAmenities,
              },
            }
          )
          res.json(
            response.success({
              item: newAmenities,
              message: 'Amenities successfully updated',
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
    }
  }
}

//get amenities by bookable unit type id
export const getAmenitiesByBookableUnitTypeId = async (
  req: Request,
  res: Response
) => {
  const hostId = res.locals.user?.id
  const bookableUnitTypeId = req.params.bookableUnitTypeId
  const propertyId = req.params.propertyId

  // Convert bookableUnitTypeId to ObjectId
  const bookableUnitTypeObjectId = new mongoose.Types.ObjectId(
    bookableUnitTypeId
  )

  try {
    const getProperty = await dbProperties
      .findOne({
        _id: propertyId,
        offerBy: hostId,
        deletedAt: null,
      })
      .populate({
        path: 'bookableUnits',
        populate: {
          path: 'amenities',
          model: 'Amenities',
        },
      })

    if (!getProperty) {
      res.json(response.error({ message: 'Property not found' }))
    } else {
      const getBookableUnits = getProperty?.bookableUnits || []

      // Use .some() to find the matching bookable unit by ObjectId comparison
      const getBookableUnit: any = getBookableUnits.find((item: any) =>
        item?._id.equals(bookableUnitTypeObjectId)
      )

      const amenities = getBookableUnit?.amenities

      res.json(response.success({ item: amenities }))
    }
  } catch (err: any) {
    res.status(500).json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

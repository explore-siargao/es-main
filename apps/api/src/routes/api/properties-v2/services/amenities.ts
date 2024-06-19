import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbAmenities, dbBookableUnitTypes, dbProperties } from '@repo/database'
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
//update bookable unit type
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
    return res.json(response.error({ message: 'Property not found' }))
  }
  if (!getProperty.bookableUnits.includes(bookableUnitTypeId as any)) {
    return res.json(
      response.error({ message: 'Bookable unit not exists on this property' })
    )
  }
  if (!amenities || !Array.isArray(amenities)) {
    return res.json(
      response.error({ message: REQUIRED_VALUE_EMPTY + ' or invalid data' })
    )
  }

  const amenitiesWithOutId = amenities.filter((item) => !('_id' in item))
  const amenitiesWithId = amenities.filter((item) => '_id' in item)
  if (amenitiesWithOutId.length > 0) {
    amenitiesWithOutId.forEach(async (item) => {
      const newAmenities = new dbAmenities({
        index: item.index,
        category: item.category,
        amenity: item.amenity,
        isSelected: item.isSelected,
        createdAt: Date.now(),
      })
      await newAmenities.save()
      await dbBookableUnitTypes.findByIdAndUpdate(
        bookableUnitTypeId,
        {
          $push: {
            amenities: newAmenities._id,
          },
        },
        { new: true }
      )
    })
  }

  if (amenitiesWithId.length > 0) {
    amenitiesWithId.forEach(async (item) => {
      await dbAmenities.findByIdAndUpdate(
        item._id,
        {
          $set: {
            index: item.index,
            category: item.category,
            amenity: item.amenity,
            isSelected: item.isSelected,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
    })
  }
  if (amenitiesWithId.length > 0) {
    return res.json(
      response.success({
        items: amenitiesWithOutId,
        message: 'Bookable unit amenities successfully updated',
      })
    )
  }
  if (amenitiesWithOutId.length > 0) {
    return res.json(
      response.success({
        items: amenitiesWithOutId,
        message: 'Bookable unit amenities successfully updated',
      })
    )
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
      return res.json(response.error({ message: 'Property not found' }))
    }

    const getBookableUnits = getProperty.bookableUnits

    // Use .some() to find the matching bookable unit by ObjectId comparison
    const getBookableUnit: any = getBookableUnits.find((item: any) =>
      item?._id.equals(bookableUnitTypeObjectId)
    )

    const amenities = getBookableUnit?.amenities

    return res.json(response.success({ item: amenities }))
  } catch (err: any) {
    return res.status(500).json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

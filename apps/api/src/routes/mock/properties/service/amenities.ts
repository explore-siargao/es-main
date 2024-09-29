import { Request, Response } from 'express'
import { properties } from './jsons/property'
import { ResponseService } from '@/common/service/response'

const response = new ResponseService()

//get amenities by bookable unit type id
export const getAmenitiesByBookableUnitTypeId = async (
  req: Request,
  res: Response
) => {
  const hostId = res.locals.user?.id
  const bookableUnitTypeId = Number(req.params.bookableUnitTypeId)
  const propertyId = Number(req.params.propertyId)
  const getProperty = properties.find(
    (item) => item.id === propertyId && item.hostId === hostId
  )
  if (!getProperty) {
    res.json(response.error({ message: 'Property not found' }))
  }
  const getBookableUnits = getProperty?.BookableUnit || []
  const getBookableUnit = getBookableUnits.find(
    (item) => item.BookableUnitType.id === bookableUnitTypeId
  )

  const getBookableUnitType = getBookableUnit?.BookableUnitType

  //@ts-ignore
  const amenities = getBookableUnitType?.Amenities
  res.json(
    response.success({ items: amenities, allItemCount: amenities.length })
  )
}

//update bookable unit type
export const addBookableUnitTypeAmenities = async (
  req: Request,
  res: Response
) => {
  const hostId = res.locals.user?.id
  const bookableUnitTypeId = Number(req.params.bookableUnitTypeId)
  const propertyId = Number(req.params.propertyId)
  const { amenities } = req.body
  const getProperty = properties.find(
    (item) => item.id === propertyId && item.hostId === hostId
  )
  if (!getProperty) {
    res.json(response.error({ message: 'Property not found' }))
  }
  const getBookableUnits = getProperty?.BookableUnit || []
  const getBookableUnit = getBookableUnits.find(
    (item) => item.BookableUnitType.id === bookableUnitTypeId
  )

  const getBookableUnitType = getBookableUnit?.BookableUnitType

  //@ts-ignore
  const amenitiesData = getBookableUnitType.Amenities
  amenities.forEach((amenity: any) => {
    const index = amenitiesData.findIndex((a: any) => a.id === amenity.id)
    if (index !== -1) {
      amenitiesData[index] = { ...amenitiesData[index], ...amenity }
    } else {
      amenitiesData.push(amenity)
    }
  })
  res.json(
    response.success({
      item: amenitiesData,
      message: 'Bookable unit type amenities successfully saved',
    })
  )
}

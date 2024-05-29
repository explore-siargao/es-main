import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { properties } from './jsons/property'
import { T_Property_Facility } from '@repo/contract'
const response = new ResponseService()

export const getPropertyFacilities = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = Number(req.params.propertyId)
  const property = properties.find(
    (property) => property.id === propertyId && hostId === property.hostId
  )
  if (!property) {
    return res.json(
      response.error({
        message: 'No facilities found for the given property id!',
      })
    )
  }
  const facilities = property.Facilities.filter(
    (item) => item.propertyId === propertyId
  )
  res.json(response.success({ items: facilities }))
}

export const updatePropertyFacilities = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = Number(req.params.propertyId)
  const { facilities } = req.body
  const getProperty = properties.find(
    (item) => item.id === propertyId && item.hostId === hostId
  )
  if (!getProperty) {
    return res.json(response.error({ message: 'Property not found' }))
  }
  const updatedAddedFacilities = facilities.filter(
    (facilty: T_Property_Facility) => facilty.id || facilty.isSelected
  )
  getProperty.Facilities = updatedAddedFacilities
  getProperty.finishedSections =
    '["type", "basicInfo", "location", "facilities"]'
  res.json(
    response.success({
      items: getProperty.Facilities,
      message: 'Property facilities successfully updated',
    })
  )
}

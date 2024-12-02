import { REQUIRED_VALUE_EMPTY } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_Property_Facility } from '@repo/contract'
import {  dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getPropertyFacilities = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = req.params.propertyId
  const property = await dbProperties.findOne({
    _id: propertyId,
    offerBy: hostId,
    deletedAt: null,
  })
  if (!property) {
    res.json(
      response.error({
        message: 'No facilities found for the given property id!',
      })
    )
  } else {
    const facilities = property?.facilities
    res.json(response.success({ items: facilities }))
  }
}

export const updatePropertyFacilities = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = req.params.propertyId
  const facilities: T_Property_Facility[] = req.body.facilities
  const getProperty = await dbProperties.findOne({
    _id: propertyId,
    offerBy: hostId,
    deletedAt: null,
  })
  if (!getProperty) {
    res.json(response.error({ message: 'Property not found' }))
  } else {
    if (!facilities || !Array.isArray(facilities)) {
      res.json(
        response.error({
          message: REQUIRED_VALUE_EMPTY + ' or data format is not valid',
        })
      )
    } else {
        const trueFacilities = facilities.filter((facility)=> facility.isSelected === true)
        const newFacilities = await dbProperties.findByIdAndUpdate(propertyId,{
          $set:{
            facilities:trueFacilities
          }
        })
        res.json(response.success({item:newFacilities, message:"Property Facilities successfully updated"}))
    }
  }
}

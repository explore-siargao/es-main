import { REQUIRED_VALUE_EMPTY } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_Property_Facility } from '@repo/contract'
import { dbFacilities, dbProperties } from '@repo/database'
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
      const facilitiesWithoutId = facilities.filter((item) => !('_id' in item))
      const facilitiesWithId = facilities.filter((item) => '_id' in item)

      if (facilitiesWithoutId.length > 0) {
        facilities.forEach(async (item) => {
          if (!item._id) {
            const newFacilities = new dbFacilities({
              index: item.index,
              category: item.category,
              facility: item.facility,
              isSelected: item.isSelected,
              createdAt: Date.now(),
              updatedAt: null,
              deletedAt: null,
            })

            await newFacilities.save()
            await dbProperties.findByIdAndUpdate(
              propertyId,
              {
                $push: {
                  facilities: newFacilities._id,
                },
              },
              { new: true }
            )
          }
        })
      }

      if (facilitiesWithId.length > 0) {
        facilitiesWithId.forEach(async (item) => {
          if (item._id) {
            await dbFacilities.findByIdAndUpdate(
              item._id,
              {
                $set: {
                  index: item.index,
                  category: item.category,
                  facility: item.facility,
                  isSelected: item.isSelected,
                  updatedAt: Date.now(),
                },
              },
              { new: true }
            )
          }
        })
      }
      await dbProperties.findByIdAndUpdate(
        propertyId,
        {
          $set: {
            finishedSections: [
              'type',
              'wholePlaceType',
              'basicInfo',
              'location',
              'facilities',
            ],
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )

      res.json(
        response.success({
          items: facilities,
          message: 'Property facilities successfully updated',
        })
      )
    }
  }
}

import { ResponseService } from '@/common/service/response'
import { dbProperties } from '@repo/database'
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
    return res.json(
      response.error({
        message: 'No facilities found for the given property id!',
      })
    )
  }
  const facilities = property.facilities
  res.json(response.success({ items: facilities }))
}

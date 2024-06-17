import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getPoliciesByProperty = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const propertyId = req.params.propertyId
  try {
    const property = await dbProperties.findOne({
      _id: propertyId,
      offerBy: userId,
      deletedAt: null,
    })

    if (!property) {
      return res.json(response.error({ message: 'Property not found!' }))
    }
    const policies = property.policies

    return res.json(response.success({ items: policies }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

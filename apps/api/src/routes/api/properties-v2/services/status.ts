import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_Property_Status, Z_Property_Status } from '@repo/contract'
import { dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const updateStatus = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = req.params.propertyId
  const { status }: T_Property_Status = req.body
  const isValidInput = Z_Property_Status.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const getProperty = await dbProperties.findOne({
        _id: propertyId,
        offerBy: hostId,
        deletedAt: null,
      })
      if (!getProperty) {
        return res.json(response.error({ message: 'Property not found' }))
      }

      const updateStatus = await dbProperties.findByIdAndUpdate(
        propertyId,
        {
          $set: {
            status: status,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
      res.json(
        response.success({
          item: updateStatus,
          message: 'Property is now ' + status,
        })
      )
    } catch (err: any) {
      return res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    return res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }
}

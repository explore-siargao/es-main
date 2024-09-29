import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { properties } from './jsons/property'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { T_Property_Status, Z_Property_Status } from '@repo/contract'

const response = new ResponseService()
export const updateStatus = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = Number(req.params.propertyId)
  const { status }: T_Property_Status = req.body
  const isValidInput = Z_Property_Status.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const getProperty = properties.find(
        (item) => item.id === propertyId && item.hostId === hostId
      )
      if (!getProperty) {
        res.json(response.error({ message: 'Property not found' }))
      } else {
        getProperty.status = status || getProperty.status
        res.json(
          response.success({
            item: { status: status },
            message: 'Property is now ' + status,
          })
        )
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }
}

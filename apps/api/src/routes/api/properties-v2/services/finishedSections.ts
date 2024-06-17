import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getFinishedSections = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = req.params.propertyId
  try {
    const getProperty = await dbProperties.findOne({
      _id: propertyId,
      offerBy: hostId,
      deletedAt: null,
    })
    const finishedSections = getProperty?.finishedSections
    res.json(response.success({ item: { finishedSections } }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

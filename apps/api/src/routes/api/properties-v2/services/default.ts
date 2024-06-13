import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { dbProperties } from '@repo/database'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

const response = new ResponseService()

export const getPropertiesByHostId = async (req: Request, res: Response) => {
  try {
    const hostId = req.params.activityId
    const properties = await dbProperties.find({ host: hostId })

    const filteredProperties = properties.reverse()
    console.log('properties', filteredProperties)
    res.json(
      response.success({
        items: filteredProperties,
      })
    )
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

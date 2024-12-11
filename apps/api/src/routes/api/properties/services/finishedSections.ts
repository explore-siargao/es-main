import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
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
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateFinishedSections = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = req.params.propertyId
  const finishedSections = req.body.newFinishedSection
  if (!finishedSections) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  } else {
    try {
      const getProperty = await dbProperties.findOne({
        _id: propertyId,
        offerBy: hostId,
        deletedAt: null,
      })
      const section = getProperty?.finishedSections
      if (section?.includes(finishedSections)) {
        res.json(
          response.success({
            item: getProperty,
            message: 'Finished sections saved',
          })
        )
      } else {
        const updateFinishedSection = await dbProperties.findByIdAndUpdate(
          propertyId,
          {
            $addToSet: {
              finishedSections: finishedSections,
            },
            $set: {
              updatedAt: Date.now(),
            },
          },
          { new: true }
        )
        res.json(
          response.success({
            item: updateFinishedSection,
            message: 'Finished sections saved',
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
  }
}

import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updateFinishedSections = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const userId = res.locals.user?.id
  const finishedSections = req.body.finishedSections
  try {
    const updatedFinishedSections = await dbActivities.findOneAndUpdate(
      { _id: activityId, host: userId },
      {
        $set: {
          finishedSections: finishedSections,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    )
    res.json(
      response.success({
        item: {
          finishedSections: updatedFinishedSections?.finishedSections,
        },
        message: 'Finished sections saved!',
      })
    )
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

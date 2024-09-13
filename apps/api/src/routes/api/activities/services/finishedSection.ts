import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { dbActivities } from '@repo/database'

const response = new ResponseService()
export const getFinishedSections = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const hostId = res.locals.user?.host

  try {
    const activity = await dbActivities.findById({
      _id: activityId,
      host: hostId,
    })

    const finishedSections = activity?.finishedSections
      ? (activity?.finishedSections as unknown as string)
      : []
    res.json(response.success({ item: { finishedSections } }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateFinishedSections = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const userId = res.locals.user?.id
  const newFinishedSection = req.body.newFinishedSection
  try {
    const updatedFinishedSections = await dbActivities.findOneAndUpdate(
      { _id: activityId, host: userId },
      {
        $push: {
          finishedSections: newFinishedSection,
        },
        $set: {
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
        message: 'Updated activity',
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

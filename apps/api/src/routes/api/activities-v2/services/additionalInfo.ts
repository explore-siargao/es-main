import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_UpdateActivityAdditionalInfo } from '@repo/contract'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updateAdditionalInfo = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const activityId = req.params.activityId
  const { whatToBring, notAllowed, policies, cancellationDays } = req.body
  const isValidInput = Z_UpdateActivityAdditionalInfo.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const updatedActivity = await dbActivities.findOneAndUpdate(
        { _id: activityId, host: userId },
        {
          $set: {
            whatToBring: whatToBring,
            notAllowed: notAllowed,
            policies: policies,
            cancellationDays: cancellationDays,
            updatedAt: Date.now(),
            finishedSections: [
              'basicInfo',
              'itinerary',
              'inclusions',
              'additionalInfo',
            ],
          },
        },
        { new: true }
      )
      if (!updatedActivity) {
        return res.json(
          response.error({
            message: 'Activity not found!',
          })
        )
      }
      res.json(
        response.success({
          item: {
            whatToBring: updatedActivity.whatToBring,
            notAllowed: updatedActivity.notAllowed,
            policies: updatedActivity.policies,
            cancellationDays: updatedActivity.cancellationDays,
          },
          message: 'Activity additional info successfully updated!',
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
      response.error({
        message: isValidInput.error.message,
      })
    )
  }
}

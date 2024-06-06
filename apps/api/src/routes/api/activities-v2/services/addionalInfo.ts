import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getAdditionalInfo = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const activityId = req.params.activityId
  try {
    const getActivity = await dbActivities
      .findOne({ _id: activityId, deletedAt: null })
      .populate('host')
    if (!getActivity) {
      return res.json(response.error({ message: 'Activity not found' }))
    }

    if (!getActivity.host === userId) {
      return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }

    const additionalInfo = {
      whatToBring: getActivity.whatToBring,
      notAllowed: getActivity.notAllowed,
      policies: getActivity.policies,
      cancellationDays: getActivity.cancellationDays,
    }

    res.json(response.success({ item: additionalInfo }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

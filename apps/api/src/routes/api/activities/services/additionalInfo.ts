import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_Update_Activity_Additional_Info } from '@repo/contract'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updateAdditionalInfo = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const activityId = req.params.activityId
  const { whatToBring, notAllowed, policies, cancellationDays } = req.body
  const isValidInput = Z_Update_Activity_Additional_Info.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const updatedActivity = await dbActivities.findOneAndUpdate(
        { _id: activityId, host: userId },
        {
          $set: {
            whatToBring: whatToBring,
            notAllowed: notAllowed,
            policies: policies,
            daysCanCancel: cancellationDays,
            updatedAt: Date.now(),
          },
          $addToSet:{
            finishedSections:'additionalInfo'
          }
        },
        { new: true }
      )
      if (!updatedActivity) {
        res.json(
          response.error({
            message: 'Activity not found!',
          })
        )
      } else {
        res.json(
          response.success({
            item: {
              whatToBring: updatedActivity?.whatToBring,
              notAllowed: updatedActivity?.notAllowed,
              policies: updatedActivity?.policies,
              cancellationDays: updatedActivity?.daysCanCancel,
            },
            message: 'Activity updated',
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
      response.error({
        message: isValidInput.error.message,
      })
    )
  }
}

export const getAdditionalInfo = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const activityId = req.params.activityId
  try {
    const getActivity = await dbActivities
      .findOne({ _id: activityId })
      .populate('host')
    if (!getActivity) {
      res.json(response.error({ message: 'Activity not found' }))
    } else {
      if (!getActivity?.host === userId) {
        res.json(response.error({ message: USER_NOT_AUTHORIZED }))
      } else {
        const additionalInfo = {
          whatToBring: getActivity?.whatToBring,
          notAllowed: getActivity?.notAllowed,
          policies: getActivity?.policies,
          cancellationDays: getActivity?.daysCanCancel,
        }

        res.json(response.success({ item: additionalInfo }))
      }
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

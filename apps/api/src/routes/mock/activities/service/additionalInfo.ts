import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { activities } from './jsons/activities'
import { Z_Update_Activity_Additional_Info } from '@repo/contract'

const response = new ResponseService()

export const updateAdditionalInfo = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const activityId = Number(req.params.activityId)
  const { whatToBring, notAllowed, policies, cancellationDays } = req.body
  const isValidInput = Z_Update_Activity_Additional_Info.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const getActivity = activities.find((item) => item.id === activityId)
      if (!getActivity) {
        res.json(response.error({ message: 'Activity not found' }))
      } else {
        if (!getActivity.hostId === userId) {
          res.json(response.error({ message: USER_NOT_AUTHORIZED }))
        }

        getActivity.whatToBring = JSON.stringify(whatToBring)
        getActivity.notAllowed = JSON.stringify(notAllowed)
        getActivity.policies = JSON.stringify(policies)
        getActivity.cancellationDays = cancellationDays
        getActivity.finishedSections =
          '["basicInfo","itinerary","inclusions","additionalInfo"]'
        res.json(
          response.success({
            item: {
              whatToBring: getActivity.whatToBring,
              notAllowed: getActivity.notAllowed,
              policies: getActivity.policies,
              cancellationDays: getActivity.cancellationDays,
            },
            message: 'Activity additonal informational successfully saved',
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

export const getAdditionalInfo = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const activityId = Number(req.params.activityId)
  try {
    const getActivity = activities.find((item) => item.id === activityId)
    if (!getActivity) {
      res.json(response.error({ message: 'Activity not found' }))
    } else {
      if (!getActivity.hostId === userId) {
        res.json(response.error({ message: USER_NOT_AUTHORIZED }))
      }

      const additionalInfo = {
        whatToBring: JSON.parse(getActivity.whatToBring),
        notAllowed: JSON.parse(getActivity.notAllowed),
        policies: JSON.parse(getActivity.policies),
        cancellationDays: getActivity.cancellationDays,
      }

      res.json(response.success({ item: additionalInfo }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import {
  T_Update_Activity_Basic_Info,
  Z_Update_Activity_Basic_Info,
} from '@repo/contract'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updateActivities = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const activityId = req.params.activityId
  const {
    title,
    highLights,
    description,
    durationHour,
    durationMinute,
    languages,
  }: T_Update_Activity_Basic_Info = req.body
  const isValidInput = Z_Update_Activity_Basic_Info.safeParse(req.body)
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (isValidInput.success) {
    try {
      const getActivity = await dbActivities.findOne({
        _id: activityId,
        deletedAt: null,
      })
      if (!getActivity) {
        return res.json(response.error({ message: 'Activity not found' }))
      }
      const updateBasicInfo = await dbActivities.findByIdAndUpdate(
        getActivity._id,
        {
          $set: {
            title: title,
            description: description,
            highLights: highLights,
            durationHour: durationHour,
            durationMinute: durationMinute,
            languages: languages,
            finishedSections: ['basicInfo'],
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
      res.json(
        response.success({
          item: updateBasicInfo,
          message: 'Activity basic information saved',
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
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }
}

export const getActivities = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const id = req.params.activityId
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  try {
    const activitiesData = await dbActivities.findOne({ _id: id })

    if (!activitiesData) {
      return res.json(
        response.error({
          message: 'Activities with the given ID not found!',
        })
      )
    }

    const data = {
      id: activitiesData._id,
      title: activitiesData.title,
      description: activitiesData.description,
      highLights: activitiesData.highLights,
      durationHour: activitiesData.durationHour,
      durationMinute: activitiesData.durationMinute,
      languages: activitiesData.languages,
    }

    return res.json(
      response.success({
        item: data,
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

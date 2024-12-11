import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
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
    activityType,
    experienceType,
    highLights,
    description,
    durationHour,
    durationMinute,
    languages,
  }: T_Update_Activity_Basic_Info = req.body
  const isValidInput = Z_Update_Activity_Basic_Info.safeParse(req.body)
  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  } else {
    if (isValidInput.success) {
      try {
        const getActivity = await dbActivities.findOne({
          _id: activityId,
          deletedAt: null,
        })
        if (!getActivity) {
          res.json(response.error({ message: 'Activity not found' }))
        } else {
          const updateBasicInfo = await dbActivities.findByIdAndUpdate(
            getActivity?._id,
            {
              $set: {
                title: title,
                activityType: activityType,
                experienceType: experienceType,
                description: description,
                highLights: highLights,
                durationHour: durationHour,
                durationMinute: durationMinute,
                languages: languages,
                updatedAt: Date.now(),
              },
              $addToSet:{
                finishedSections:'basicInfo'
              }
            },
            { new: true, runValidators: true }
          )
          res.json(
            response.success({
              item: updateBasicInfo,
              message: 'Activity basic information saved',
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
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
  }
}

export const getActivities = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const id = req.params.activityId
  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  } else {
    try {
      const activitiesData = await dbActivities.findOne({ _id: id })

      if (!activitiesData) {
        res.json(
          response.error({
            message: 'Activities with the given ID not found!',
          })
        )
      } else {
        const data = {
          id: activitiesData?._id,
          title: activitiesData?.title,
          activityType: activitiesData?.activityType,
          experienceType: activitiesData?.experienceType,
          description: activitiesData?.description,
          highLights: activitiesData?.highLights,
          durationHour: activitiesData?.durationHour,
          durationMinute: activitiesData?.durationMinute,
          languages: activitiesData?.languages,
        }

        res.json(
          response.success({
            item: data,
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

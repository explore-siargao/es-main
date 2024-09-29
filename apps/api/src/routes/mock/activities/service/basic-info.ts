import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { activities } from './jsons/activities'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import {
  T_Update_Activity_Basic_Info,
  Z_Update_Activity_Basic_Info,
} from '@repo/contract'

const response = new ResponseService()

export const getActivities = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const id = Number(req.params.activityId)
  if (!isHost) {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  try {
    const activitiesData = activities.find((activity) => activity.id === id)

    if (!activitiesData) {
      res.json(
        response.error({
          message: 'Activities with the given ID not found!',
        })
      )
    } else {
      const data = {
        id: activitiesData.id,
        title: activitiesData.title,
        description: activitiesData.description,
        highLights: JSON.parse(activitiesData.highLights),
        durationHour: activitiesData.durationHour,
        durationMinute: activitiesData.durationMinute,
        languages: JSON.parse(activitiesData.languages),
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

export const updateActivities = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const id = Number(req.params.activityId)
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
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (isValidInput.success) {
    try {
      const getActivity = activities.find(
        (item) => item.id === id && item.hostId === hostId
      )
      if (!getActivity) {
        res.json(response.error({ message: 'Activity not found' }))
      } else {
        getActivity.title = title || getActivity.title
        getActivity.description = description || getActivity.description
        getActivity.highLights =
          JSON.stringify(highLights) || getActivity.highLights
        getActivity.durationHour = durationHour || getActivity.durationHour
        getActivity.durationMinute =
          durationMinute || getActivity.durationMinute
        getActivity.languages =
          JSON.stringify(languages) || getActivity.languages
        const basicInfoData = {
          title: getActivity.title,
          description: getActivity.description,
          highLights: JSON.parse(getActivity.highLights),
          durationHour: getActivity.durationHour,
          durationMinute: getActivity.durationMinute,
          languages: JSON.parse(getActivity.languages),
        }
        getActivity.finishedSections = '["basicInfo"]'
        res.json(
          response.success({
            item: basicInfoData,
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
    res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }
}

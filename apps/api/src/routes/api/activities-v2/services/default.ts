import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { dbActivities } from '@repo/database'

const response = new ResponseService()
export const addActivity = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id

  try {
    const value = {
      host: userId,
      title: '',
      description: '',
      highLights: [],
      durationHour: null,
      durationMinute: null,
      language: [],
      isFoodIncluded: false,
      isNonAlcoholicDrinkIncluded: false,
      isAlcoholicDrinkIncluded: false,
      otherInclusion: [],
      notIncluded: [],
      whatToBrings: [],
      cancellationDays: 0,
      notAllowed: [],
      activityPolicies: [],
      cancellationPolicies: [],
      activityPhotos: [],
    }

    const newActivity = new dbActivities(value)
    await newActivity.save()

    res.json(
      response.success({
        item: newActivity,
        message: 'Activity successfully added',
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

export const getActivity = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  try {
    const getActivity = await dbActivities
      .findOne({ _id: activityId, deletedAt: null })
      .populate('host')
      .populate('address')
      .populate('itineraries')
      .populate('activityPhotos')
    res.json(response.success({ item: getActivity }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getAllActivitiesByHostId = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  if (!isHost) {
    return res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
  try {
    const filteredActivities = await dbActivities
      .find({ host: hostId })
      .populate('host', 'email isHost')
      .populate({ path: 'activityPhotos', options: { limit: 1, skip: 0 } })
      .select('title description status')
    res.json(
      response.success({
        items: filteredActivities,
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

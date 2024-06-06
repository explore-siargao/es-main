import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { dbActivities } from '@repo/database'

const response = new ResponseService()
export const addActivity = async (req: Request, res: Response) => {
  try {
    const value = {
      id: 4,
      title: '',
      description: '',
      highLights: '[]',
      durationHour: '',
      durationMinute: '',
      language: '',
      isFoodIncluded: false,
      isNonAlcoholicDrinkIncluded: false,
      isAlcoholicDrinkIncluded: false,
      otherInclusion: '[]',
      notIncluded: '',
      whatToBrings: '',
      notAllowed: '[]',
      activityPolicies: '[]',
      cancellationPolicies: '[]',
      activityPhotos: [],
    }

    const newActivity = new dbActivities(value)
    await newActivity.save()

    res.json(
      response.success({ item: value, message: 'Activity successfully added' })
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

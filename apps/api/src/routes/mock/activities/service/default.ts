import { Request, Response } from 'express'
import { activities } from './jsons/activities'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

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
      languages: '',
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
    activities.push()
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

export const deleteActivity = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const getActivityIndex = activities.findIndex((item) => item.id === id)
    if (getActivityIndex === -1) {
      return res.json(response.error({ message: 'No activity found' }))
    }
    const deleteActivity = activities.splice(getActivityIndex, 1)[0]
    res.json(
      response.success({
        message: 'Activity deleted successfully',
        item: deleteActivity,
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

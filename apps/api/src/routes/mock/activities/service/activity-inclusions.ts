import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { activities } from './jsons/activities'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import {
  T_Update_Activity_Inclusions,
  Z_Update_Activity_Inclusions,
} from '@repo/contract'

const response = new ResponseService()

export const getActivityInclusions = (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  try {
    const id = Number(req.params.activityId)

    const activityInclusionData = activities.find(
      (inclusions) => inclusions.id === id
    )

    if (!isHost) {
      return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    }

    if (!activityInclusionData) {
      return res.json(
        response.error({
          message: 'Activity inclusions with the given ID not found!',
        })
      )
    }

    const data = {
      id: activityInclusionData.id,
      isFoodIncluded: activityInclusionData.isFoodIncluded,
      selectedFoodOptions: JSON.parse(
        activityInclusionData.selectedFoodOptions
      ),
      isNonAlcoholicDrinkIncluded:
        activityInclusionData.isNonAlcoholicDrinkIncluded,
      isAlcoholicDrinkIncluded: activityInclusionData.isAlcoholicDrinkIncluded,
      selectedAlcoholicDrinkOptions: JSON.parse(
        activityInclusionData.selectedAlcoholicDrinkOptions
      ),
      otherInclusion: JSON.parse(activityInclusionData.otherInclusion),
      notIncluded: JSON.parse(activityInclusionData.notIncluded),
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

export const updateActivityInclusions = (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const id = Number(req.params.activityId)
  const hostId = res.locals.user?.id
  const {
    isFoodIncluded,
    selectedFoodOptions,
    isNonAlcoholicDrinkIncluded,
    isAlcoholicDrinkIncluded,
    selectedAlcoholicDrinkOptions,
    notIncluded,
    otherInclusion,
  }: T_Update_Activity_Inclusions = req.body
  const isInputValid = Z_Update_Activity_Inclusions.safeParse(req.body)
  if (!isHost) {
    return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
  if (isInputValid.success) {
    try {
      const getActivity = activities.find(
        (item) => item.id === id && item.hostId === hostId
      )
      if (!getActivity) {
        return res.json(response.error({ message: 'Activity not found' }))
      }
      getActivity.isFoodIncluded = isFoodIncluded
      isFoodIncluded === true
        ? (getActivity.selectedFoodOptions =
            JSON.stringify(selectedFoodOptions) ||
            getActivity.selectedFoodOptions)
        : (getActivity.selectedFoodOptions = '[]')
      getActivity.isNonAlcoholicDrinkIncluded =
        isNonAlcoholicDrinkIncluded || getActivity.isNonAlcoholicDrinkIncluded
      getActivity.isAlcoholicDrinkIncluded = isAlcoholicDrinkIncluded
      isAlcoholicDrinkIncluded === true
        ? (getActivity.selectedAlcoholicDrinkOptions =
            JSON.stringify(selectedAlcoholicDrinkOptions) ||
            getActivity.selectedAlcoholicDrinkOptions)
        : (getActivity.selectedAlcoholicDrinkOptions = '[]')
      getActivity.otherInclusion =
        JSON.stringify(otherInclusion) || getActivity.otherInclusion
      getActivity.notIncluded =
        JSON.stringify(notIncluded) || getActivity.notIncluded
      const updatedData = {
        isFoodIncluded: getActivity.isFoodIncluded,
        selectedFoodOptions: getActivity.selectedFoodOptions,
        isNonAlcoholicDrinkIncluded: getActivity.isNonAlcoholicDrinkIncluded,
        isAlcoholicDrinkIncluded: getActivity.isAlcoholicDrinkIncluded,
        selectedAlcoholicDrinkOptions:
          getActivity.selectedAlcoholicDrinkOptions,
        otherInclusion: getActivity.otherInclusion,
        notIncluded: getActivity.notIncluded,
      }
      getActivity.finishedSections = '["basicInfo","itinerary","inclusions"]'
      res.json(
        response.success({
          item: updatedData,
          message: 'Activity inclussion successfully saved',
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
      response.error({ message: JSON.parse(isInputValid.error.message) })
    )
  }
}

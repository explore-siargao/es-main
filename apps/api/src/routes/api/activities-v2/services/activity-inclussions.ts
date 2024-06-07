import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { dbActivities } from '@repo/database'
import { Z_Update_Activity_Inclusions } from '@repo/contract'

const response = new ResponseService()

export const getActivityInclusions = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  try {
    const activityId = req.params.activityId

    const activityInclusionData = await dbActivities.findById(activityId)

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
      _id: activityInclusionData._id,
      isFoodIncluded: activityInclusionData.isFoodIncluded,
      selectedFoodOptions: activityInclusionData.selectedFoodOptions || [],
      isNonAlcoholicDrinkIncluded:
        activityInclusionData.isNonAlcoholicDrinkIncluded,
      isAlcoholicDrinkIncluded: activityInclusionData.isAlcoholicDrinkIncluded,
      selectedAlcoholicDrinkOptions:
        activityInclusionData.selectedAlcoholicDrinkOptions || [],
      otherInclusion: activityInclusionData.otherInclusion || [],
      notIncluded: activityInclusionData.notIncluded || [],
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

export const updateActivityInclusions = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const userId = res.locals.user?.id
  const {
    isFoodIncluded,
    selectedFoodOptions,
    isNonAlcoholicDrinkIncluded,
    isAlcoholicDrinkIncluded,
    selectedAlcoholicDrinkOptions,
    notIncluded,
    otherInclusion,
  } = req.body
  const isValidInput = Z_Update_Activity_Inclusions.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const updatedActivityInclusions = await dbActivities.findOneAndUpdate(
        { _id: activityId, host: userId },
        {
          $set: {
            isFoodIncluded: isFoodIncluded,
            selectedFoodOptions: isFoodIncluded ? selectedFoodOptions : [],
            isNonAlcoholicDrinkIncluded: isNonAlcoholicDrinkIncluded,
            isAlcoholicDrinkIncluded: isAlcoholicDrinkIncluded,
            selectedAlcoholicDrinkOptions: isAlcoholicDrinkIncluded
              ? selectedAlcoholicDrinkOptions
              : [],
            notIncluded: notIncluded,
            otherInclusion: otherInclusion,
            updatedAt: Date.now(),
            finishedSections: ['basicInfo', 'itinerary', 'inclusions'],
          },
        },
        { new: true }
      )
      if (!updatedActivityInclusions) {
        return res.json(
          response.error({
            message: 'Activity not found!',
          })
        )
      }
      res.json(
        response.success({
          item: {
            isFoodIncluded: updatedActivityInclusions.isFoodIncluded,
            selectedFoodOptions: updatedActivityInclusions.selectedFoodOptions,
            isNonAlcoholicDrinkIncluded:
              updatedActivityInclusions.isNonAlcoholicDrinkIncluded,
            isAlcoholicDrinkIncluded:
              updatedActivityInclusions.isAlcoholicDrinkIncluded,
            selectedAlcoholicDrinkOptions:
              updatedActivityInclusions.selectedAlcoholicDrinkOptions,
            otherInclusion: updatedActivityInclusions.otherInclusion,
            notIncluded: updatedActivityInclusions.notIncluded,
          },
          message: 'Activity inclusions successfully updated!',
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
      response.error({
        message: isValidInput.error.message,
      })
    )
  }
}

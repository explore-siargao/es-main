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
      res.json(response.error({ message: USER_NOT_AUTHORIZED }))
    } else {
      if (!activityInclusionData) {
        res.json(
          response.error({
            message: 'Activity inclusions with the given ID not found!',
          })
        )
      } else {
        const data = {
          _id: activityInclusionData?._id,
          isFoodIncluded: activityInclusionData?.isFoodIncluded,
          includedFoods: activityInclusionData?.includedFoods || [],
          isNonAlcoholicDrinkIncluded:
            activityInclusionData?.isNonAlcoholicDrinkIncluded,
          isAlcoholicDrinkIncluded:
            activityInclusionData?.isAlcoholicDrinkIncluded,
          includedAlcoholicDrinks:
            activityInclusionData?.includedAlcoholicDrinks || [],
          otherInclusion: activityInclusionData?.otherInclusion || [],
          notIncluded: activityInclusionData?.notIncluded || [],
        }

        res.json(
          response.success({
            item: data,
          })
        )
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

export const updateActivityInclusions = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const userId = res.locals.user?.id
  const {
    isFoodIncluded,
    includedFoods,
    isNonAlcoholicDrinkIncluded,
    isAlcoholicDrinkIncluded,
    includedAlcoholicDrinks,
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
            includedFoods: isFoodIncluded ? includedFoods : [],
            isNonAlcoholicDrinkIncluded: isNonAlcoholicDrinkIncluded,
            isAlcoholicDrinkIncluded: isAlcoholicDrinkIncluded,
            includedAlcoholicDrinks: isAlcoholicDrinkIncluded
              ? includedAlcoholicDrinks
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
        res.json(
          response.error({
            message: 'Activity not found!',
          })
        )
      } else {
        res.json(
          response.success({
            item: {
              isFoodIncluded: updatedActivityInclusions?.isFoodIncluded,
              includedFoods: updatedActivityInclusions?.includedFoods,
              isNonAlcoholicDrinkIncluded:
                updatedActivityInclusions?.isNonAlcoholicDrinkIncluded,
              isAlcoholicDrinkIncluded:
                updatedActivityInclusions?.isAlcoholicDrinkIncluded,
              includedAlcoholicDrinks:
                updatedActivityInclusions?.includedAlcoholicDrinks,
              otherInclusion: updatedActivityInclusions?.otherInclusion,
              notIncluded: updatedActivityInclusions?.notIncluded,
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

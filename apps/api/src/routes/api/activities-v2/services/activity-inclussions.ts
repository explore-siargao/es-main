import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { dbActivities } from '@repo/database'

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
        isNonAlcoholicDrinkIncluded: activityInclusionData.isNonAlcoholicDrinkIncluded,
        isAlcoholicDrinkIncluded: activityInclusionData.isAlcoholicDrinkIncluded,
        selectedAlcoholicDrinkOptions: activityInclusionData.selectedAlcoholicDrinkOptions || [],
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
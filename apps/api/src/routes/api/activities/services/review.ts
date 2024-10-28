import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities, dbReviews } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()
export const addActivityReview = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id
    const activityId = req.params.activityId
    let {
      cleanlinessRates,
      accuracyRates,
      checkInRates,
      communicationRates,
      valueRates,
      comment,
    } = req.body
    const getActivity = await dbActivities.findOne({
      _id: activityId,
      deletedAt: null,
    })
    if (!getActivity) {
      res.json(
        response.error({
          message: 'This activity not exists or already deleted',
        })
      )
    } else {
      if (
        !cleanlinessRates ||
        !accuracyRates ||
        !checkInRates ||
        !valueRates ||
        !communicationRates
      ) {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      } else {
        const ratings = [
          cleanlinessRates,
          accuracyRates,
          checkInRates,
          communicationRates,
          valueRates,
        ]
        const averageRating =
          ratings.reduce((sum, rate) => sum + rate, 0) / ratings.length
        let message = ''
        if (!comment) {
          comment = message
        }
        const newActivityReview = new dbReviews({
          reviewerId: userId,
          activity: activityId,
          cleanlinessRates,
          accuracyRates,
          checkInRates,
          communicationRates,
          valueRates,
          comment,
          totalRates: averageRating,
        })
        const review = await newActivityReview.save()
        await dbActivities.findByIdAndUpdate(activityId, {
          $push: {
            reviews: review._id,
          },
        })
        res.json(
          response.success({
            item: newActivityReview,
            message: 'Your review successfully added',
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

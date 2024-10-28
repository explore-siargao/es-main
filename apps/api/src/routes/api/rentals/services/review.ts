import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbRentals, dbReviews } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()
export const addRentalReview = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id
    const rentalId = req.params.rentalId
    let {
      cleanlinessRates,
      accuracyRates,
      checkInRates,
      communicationRates,
      valueRates,
      comment,
    } = req.body
    const getRental = await dbRentals.findOne({
      _id: rentalId,
      deletedAt: null,
    })
    if (!getRental) {
      res.json(
        response.error({ message: 'This rental not exists or already deleted' })
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
        const newRentalReview = new dbReviews({
          reviewerId: userId,
          rental: rentalId,
          cleanlinessRates,
          accuracyRates,
          checkInRates,
          communicationRates,
          valueRates,
          comment,
          totalRates: averageRating,
        })
        const review = await newRentalReview.save()
        await dbRentals.findByIdAndUpdate(rentalId, {
          $push: {
            reviews: review._id,
          },
        })
        res.json(
          response.success({
            item: newRentalReview,
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

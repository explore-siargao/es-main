import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbBookableUnitTypes, dbProperties, dbReviews } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()
export const addUnitReview = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id
    const propertyId = req.params.propertyId
    let {
      cleanlinessRates,
      accuracyRates,
      checkInRates,
      communicationRates,
      valueRates,
      comment,
      bookableUnitId,
    } = req.body
    const getProperty = await dbProperties.findOne({
      _id: propertyId,
      deletedAt: null,
    })
    if (!getProperty) {
      res.json(
        response.error({
          message: 'This property not exists or already deleted',
        })
      )
    } else {
      if (
        !cleanlinessRates ||
        !accuracyRates ||
        !checkInRates ||
        !valueRates ||
        !communicationRates ||
        !bookableUnitId
      ) {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      } else {
        const getUnit = await dbBookableUnitTypes.findOne({
          _id: bookableUnitId,
          deletedAt: null,
        })
        if (!getUnit) {
          res.json(
            response.error({
              message: 'This bookable unit not exists or already deleted',
            })
          )
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
          const newBookableUnitReview = new dbReviews({
            reviewerId: userId,
            property: {
              propertyId: propertyId,
              bookableUnitId: bookableUnitId,
            },
            cleanlinessRates,
            accuracyRates,
            checkInRates,
            communicationRates,
            valueRates,
            comment,
            totalRates: averageRating,
          })
          const review = await newBookableUnitReview.save()
          await dbBookableUnitTypes.findByIdAndUpdate(bookableUnitId, {
            $push: {
              reviews: review._id,
            },
          })
          res.json(
            response.success({
              item: newBookableUnitReview,
              message: 'Your review successfully added',
            })
          )
        }
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

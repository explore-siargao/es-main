import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { dbActivities } from '@repo/database'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'

const response = new ResponseService()


export const addActivityPricePerDates = async (req: Request, res: Response) => {
    const activityId = req.params.activityId
    const { fromDate, toDate, price } = req.body
    try {
      const getActivity = await dbActivities
        .findOne({
          _id: activityId,
          deletedAt: null,
        })
      if (!getActivity) {
        res.json(response.error({ message: 'Activity not found on our system' }))
      } else {
        if (!fromDate || !toDate || !price) {
          res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
        } else {
          const newFromDate = new Date(fromDate)
          const newToDate = new Date(toDate)
  
          const isConflict = getActivity?.pricePerDates.some((dateRange: any) => {
            const existingFromDate = new Date(dateRange.fromDate)
            const existingToDate = new Date(dateRange.toDate)
            return newFromDate <= existingToDate && newToDate >= existingFromDate
          })
  
          if (isConflict) {
            res.json(
              response.error({
                message: 'The date range conflicts with existing price periods.',
              })
            )
          } else {
            const newPricePerDates = {
              fromDate: newFromDate,
              toDate: newToDate,
              price: price,
            }
  
            await dbActivities.findByIdAndUpdate(
                activityId,
              {
                $push: {
                  pricePerDates: newPricePerDates,
                },
              },
              { new: true }
            )
  
            res.json(
              response.success({
                item: newPricePerDates,
                message: 'Price for specific dates successfully set',
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
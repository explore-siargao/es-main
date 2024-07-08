import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import {
  T_Update_Activity_Price_Slots,
  Z_Update_Activity_Pice_Slots,
} from '@repo/contract'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const getPriceAndSlotsById = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const isHost = res.locals.user?.isHost
  if (!isHost) {
    return res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
  try {
    const activity = await dbActivities.findOne({
      _id: activityId,
      deletedAt: null,
    })
    if (!activity) {
      return res.json(
        response.error({
          message: 'Activity not found!',
        })
      )
    }

    const data = {
      activityId: activity._id,
      price: activity.price,
      slots: activity.slots,
    }

    res.json(
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

export const updatePriceAndSlots = async (req: Request, res: Response) => {
  const { price, slots }: T_Update_Activity_Price_Slots = req.body
  const isHost = res.locals.user?.isHost
  const activityId = req.params.activityId
  const isValidInput = Z_Update_Activity_Pice_Slots.safeParse(req.body)
  if (isValidInput.success) {
    if (!isHost) {
      return res.json(
        response.error({
          message: USER_NOT_AUTHORIZED,
        })
      )
    }
    try {
      const activity = await dbActivities.findOne({
        _id: activityId,
        deletedAt: null,
      })
      if (!activity) {
        return res.json(
          response.error({
            message: 'Activity not found!',
          })
        )
      }
      const updatedPriceAndSlots = await dbActivities.findByIdAndUpdate(
        activity._id,
        {
          $set: {
            price: price,
            slots: slots,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
      res.json(
        response.success({
          item: updatedPriceAndSlots,
          message: 'Price and slots successfully updated!',
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
        message: JSON.parse(isValidInput.error.message),
      })
    )
  }
}

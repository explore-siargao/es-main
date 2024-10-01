import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import {
  T_Update_Activity_Price_Slots,
  Z_Update_Activity_Pice_Slots,
} from '@repo/contract'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updatePriceAndSlots = async (req: Request, res: Response) => {
  const { price, slots }: T_Update_Activity_Price_Slots = req.body
  const isHost = res.locals.user?.isHost
  const activityId = req.params.activityId
  const isValidInput = Z_Update_Activity_Pice_Slots.safeParse(req.body)
  if (isValidInput.success) {
    if (!isHost) {
      res.json(
        response.error({
          message: USER_NOT_AUTHORIZED,
        })
      )
    } else {
      try {
        const activity = await dbActivities.findOne({
          _id: activityId,
          deletedAt: null,
        })
        if (!activity) {
          res.json(
            response.error({
              message: 'Activity not found!',
            })
          )
        } else {
          const updatedPriceAndSlots = await dbActivities.findByIdAndUpdate(
            activity?._id,
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
        }
      } catch (err: any) {
        res.json(
          response.error({
            message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
          })
        )
      }
    }
  } else {
    res.json(
      response.error({
        message: JSON.parse(isValidInput.error.message),
      })
    )
  }
}

import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbCarts } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const removeMultipleItemsOnCarts = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.user?.id
  const { cartIds = [] } = req.body
  try {
    if (cartIds.length === 0) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const removeManyItems = await dbCarts.updateMany(
        {
          deletedAt: null,
          status: { $ne: 'Removed' },
          userId: userId,
          _id: { $in: cartIds },
        },
        {
          $set: {
            updatedAt: Date.now(),
            deletedAt: Date.now(),
            status: 'Removed',
          },
        }
      )
      if (removeManyItems.modifiedCount > 1) {
        res.json(
          response.success({
            item: removeManyItems,
            message: 'Multiple items successfully removed from cart',
          })
        )
      } else if (removeManyItems.modifiedCount === 1) {
        res.json(
          response.success({
            item: removeManyItems,
            message: 'Single item successfully removed from cart',
          })
        )
      } else {
        res.json(
          response.error({ message: 'No items has been removed from cart' })
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

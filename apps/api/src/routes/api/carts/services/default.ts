import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbCarts } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user?.id
    const {
      propertyIds = null,
      rentalIds = null,
      activityIds = null,
      price,
      startDate,
      endDate,
    } = req.body
    if (
      (!propertyIds && !rentalIds && !activityIds) ||
      !price ||
      !startDate ||
      !endDate
    ) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const existingCart = await dbCarts.findOne({
        userId: userId,
        status: 'Active',
        $or: [
          ...(propertyIds
            ? [
                {
                  $and: [
                    { 'propertyIds.propertyId': propertyIds.propertyId },
                    { 'propertyIds.unitId': propertyIds.unitId },
                    { rentalIds: null },
                    { activityIds: null },
                  ],
                },
              ]
            : []),
          ...(rentalIds
            ? [
                {
                  $and: [
                    { 'rentalIds.rentalId': rentalIds.rentalId },
                    { 'rentalIds.qtyIdsId': rentalIds.qtyIdsId },
                    { propertyIds: null },
                    { activityIds: null },
                  ],
                },
              ]
            : []),
          ...(activityIds
            ? [
                {
                  $and: [
                    { 'activityIds.activityId': activityIds.activityId },
                    { 'activityIds.timeSlotId': activityIds.timeSlotId },
                    { 'activityIds.slotIdsId': { $exists: false } },
                    { propertyIds: null },
                    { rentalIds: null },
                  ],
                },
                {
                  $and: [
                    {
                      'activityIds.activityId': activityIds.activityId || null,
                    },
                    {
                      'activityIds.timeSlotId': activityIds.timeSlotId || null,
                    },
                    { 'activityIds.slotIdsId': activityIds.slotIdsId || null },
                    { propertyIds: null },
                    { rentalIds: null },
                  ],
                },
              ]
            : []),
        ],
      })
      if (existingCart) {
        existingCart.price = price
        existingCart.updatedAt = new Date()
        existingCart.startDate = new Date(startDate)
        existingCart.endDate = new Date(endDate)

        await existingCart.save()
        res.json(
          response.success({
            item: existingCart,
            message: 'Cart list  updated successfully',
          })
        )
      } else {
        const newCart = new dbCarts({
          userId,
          price,
          propertyIds,
          rentalIds,
          activityIds,
          status: 'Active',
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          createdAt: Date.now(),
          updatedAt: null,
          deletedAt: null,
        })
        const saveCart = await newCart.save()
        res.json(
          response.success({
            item: saveCart,
            message: 'Cart list  updated successfully',
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

export const removeToCart = async (req: Request, res: Response) => {
  try {
    const cartId = req.params.cartId
    const userId = res.locals.user?.id
    const cart = await dbCarts.findOne({
      _id: cartId,
      userId: userId,
      status: 'Active',
    })
    if (!cart) {
      res.json(
        response.error({
          message: 'This item is not on your cart lists or its already deleted',
        })
      )
    } else {
      const deleteCart = await dbCarts.findByIdAndUpdate(
        cartId,
        {
          $set: {
            status: 'Removed',
            updatedAt: Date.now(),
            deletedAt: Date.now(),
          },
        },
        { new: true }
      )
      if (!deleteCart) {
        res.json(response.error({ message: 'Failed to remove item from cart' }))
      } else {
        res.json(
          response.success({
            item: deleteCart,
            message: 'Item successfully removed from carts',
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

export const getAllReservationOrCarts = async (req: Request, res: Response) => {
  try {
    const type = ((req.query.type as string) || 'cart').toLowerCase()
    if (type === 'cart') {
      //do something here
    } else if (type === 'reservation') {
      //do something here
    } else {
      res.json(response.error({ message: 'Invalid type' }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

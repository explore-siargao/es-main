import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { parseToUTCDate } from '@/common/helpers/dateToUTC'
import { ResponseService } from '@/common/service/response'
import {
  ACTIVITY_HOST_COMMISSION_PERCENT,
  GUEST_COMMISSION_PERCENT,
  PROPERTY_HOST_COMMISSION_PERCENT,
  RENTAL_HOST_COMMISSION_PERCENT,
} from '@repo/constants'
import { Z_AddCart } from '@repo/contract-2/cart'
import {
  dbActivities,
  dbBookableUnitTypes,
  dbCarts,
  dbRentals,
  dbReservations,
} from '@repo/database'
import { differenceInCalendarDays } from 'date-fns'
import { Request, Response } from 'express'
import { Types } from 'mongoose'

const response = new ResponseService()
export const addToCart = async (req: Request, res: Response) => {
  let totalPrice, hostComission
  try {
    const userId = res.locals.user?.id
    const {
      propertyIds = null,
      rentalIds = null,
      activityIds = null,
      guestCount,
      startDate,
      endDate,
    } = req.body
    const parseCartItem = Z_AddCart.safeParse(req.body)
    if (!parseCartItem.success) {
      res.json(
        response.error({
          items: parseCartItem.error.errors,
          message: 'Invalid request body',
        })
      )
    } else {
      if (
        (!propertyIds && !rentalIds && !activityIds) ||
        !guestCount ||
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
                        'activityIds.activityId':
                          activityIds.activityId || null,
                      },
                      {
                        'activityIds.timeSlotId':
                          activityIds.timeSlotId || null,
                      },
                      {
                        'activityIds.slotIdsId': activityIds.slotIdsId || null,
                      },
                      { propertyIds: null },
                      { rentalIds: null },
                    ],
                  },
                ]
              : []),
          ],
        })
        if (existingCart) {
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
          if (propertyIds) {
            const unit: any = await dbBookableUnitTypes
              .findOne({ qtyIds: { $elemMatch: { _id: propertyIds.unitId } } })
              .populate('unitPrice')
            const startDay = new Date(startDate)
            const endDay = new Date(endDate)
            const countDays = differenceInCalendarDays(endDay, startDay)
            totalPrice = unit?.unitPrice.baseRate * guestCount * countDays
            hostComission = PROPERTY_HOST_COMMISSION_PERCENT * totalPrice
          } else if (rentalIds) {
            const rental: any = await dbRentals
              .findOne({
                _id: rentalIds.rentalId,
                qtyIds: { $elemMatch: { _id: rentalIds.qtyIdsId } },
              })
              .populate('pricing')
            const startDay = new Date(startDate)
            const endDay = new Date(endDate)
            const countDays = differenceInCalendarDays(endDay, startDay)
            totalPrice = rental?.pricing.dayRate * guestCount * countDays
            hostComission = RENTAL_HOST_COMMISSION_PERCENT * totalPrice
          } else if (activityIds) {
            const activity = await dbActivities.findOne({
              _id: activityIds.activityId,
            })
            const price =
              activity?.pricePerPerson || activity?.pricePerSlot || 0
            if (activity?.pricePerPerson) {
              totalPrice = price * guestCount
              hostComission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
            } else if (activity?.pricePerSlot) {
              totalPrice = price
              hostComission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
            } else {
              res.json(
                response.error({ message: 'Price is not set on this activity' })
              )
            }
          }
          const guestComission = (totalPrice || 0) * GUEST_COMMISSION_PERCENT
          const newCart = new dbCarts({
            userId,
            price: totalPrice,
            hostComission,
            guestComission,
            propertyIds,
            rentalIds,
            activityIds,
            status: 'Active',
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            guestCount,
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
            message: 'Item successfully removed from cart',
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

export const getAllCarts = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user?.id
    const { page = 1, limit = 15 } = req.pagination || {}
    const { cartIds } = req.query
    const query: any = {
      deletedAt: null,
      status: 'Active',
      userId: new Types.ObjectId(userId),
    }
    if (cartIds !== undefined) {
      const cartIdsArray = String(cartIds).split(',')
      if (cartIdsArray.length > 0 && cartIds !== null) {
        const newCartIdsArray = cartIdsArray.map(
          (item) => new Types.ObjectId(item)
        )
        query._id = {
          $in: newCartIdsArray,
        }
      }
    }
    const pipeline: any = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userId',
          pipeline: [
            {
              $project: {
                password: 0,
                changePasswordAt: 0,
                registrationType: 0,
                deactivated: 0,
                canReceiveEmail: 0,
              },
            },
            {
              $lookup: {
                from: 'guests',
                localField: 'guest',
                foreignField: '_id',
                as: 'guest',
                pipeline: [
                  {
                    $lookup: {
                      from: 'addresses',
                      localField: 'address',
                      foreignField: '_id',
                      as: 'address',
                    },
                  },
                  {
                    $unwind: {
                      path: '$address',
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                  {
                    $project: {
                      emergencyContacts: 0,
                    },
                  },
                ],
              },
            },
            {
              $unwind: {
                path: '$guest',
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$userId',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'properties',
          let: { propertyId: '$propertyIds.propertyId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$propertyId'] }, // Match the `_id` field in `properties` with `propertyId`
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'offerBy',
                foreignField: '_id',
                as: 'offerBy',
                pipeline: [
                  {
                    $lookup: {
                      from: 'guests',
                      localField: 'guest',
                      foreignField: '_id',
                      as: 'guest',
                      pipeline: [
                        {
                          $lookup: {
                            from: 'addresses',
                            localField: 'address',
                            foreignField: '_id',
                            as: 'address',
                          },
                        },
                        {
                          $unwind: {
                            path: '$address',
                            preserveNullAndEmptyArrays: true,
                          },
                        },
                        {
                          $project: {
                            emergencyContacts: 0,
                          },
                        },
                      ],
                    },
                  },
                  {
                    $unwind: {
                      path: '$guest',
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                ],
              },
            },
            {
              $unwind: {
                path: '$offerBy',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'photos',
                localField: 'photos',
                foreignField: '_id',
                as: 'photos',
              },
            },
            {
              $lookup: {
                from: 'locations',
                localField: 'location',
                foreignField: '_id',
                as: 'location',
              },
            },
            {
              $unwind: {
                path: '$location',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 1,
                'offerBy.password': 0,
                'offerBy.changePasswordAt': 0,
                'offerBy.registrationType': 0,
                'offerBy.deactivated': 0,
                'offerBy.canReceiveEmail': 0,
                bookableUnits: 0,
              },
            },
          ],
          as: 'property',
        },
      },
      {
        $lookup: {
          from: 'bookableunittypes', // Collection to join with
          let: { unitId: '$propertyIds.unitId' }, // Define a variable for propertyIds.unitId
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$$unitId', { $ifNull: ['$qtyIds._id', []] }], // Match unitId to qtyIds._id array
                },
              },
            },
            {
              $lookup: {
                from: 'unitprices',
                localField: 'unitPrice',
                foreignField: '_id',
                as: 'unitPrice',
              },
            },
            {
              $unwind: {
                path: '$unitPrice', // Specify the field to unwind
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'photos', // Collection to join with
                localField: 'photos', // Field in the collection to join with
                foreignField: '_id', // Field in the photos collection to join with
                as: 'photos',
              },
            },
            {
              $lookup: {
                from: 'amenities', // Collection to join with
                localField: 'amenities', // Field in the collection to join with
                foreignField: '_id', // Field in the photos collection to join with
                as: 'amenities',
                pipeline: [
                  {
                    $match: {
                      isSelected: true,
                    },
                  },
                ],
              },
            },
            {
              $lookup: {
                from: 'reviews',
                localField: 'reviews',
                foreignField: '_id',
                as: 'reviews',
                pipeline: [
                  {
                    $lookup: {
                      from: 'users',
                      localField: 'reviewerId',
                      foreignField: '_id',
                      as: 'reviewerId',
                      pipeline: [
                        {
                          $lookup: {
                            from: 'guests',
                            localField: 'guest',
                            foreignField: '_id',
                            as: 'guest',
                            pipeline: [
                              {
                                $project: {
                                  emergencyContacts: 0,
                                },
                              },
                              {
                                $lookup: {
                                  from: 'addresses',
                                  localField: 'address',
                                  foreignField: '_id',
                                  as: 'address',
                                },
                              },
                              {
                                $unwind: {
                                  path: '$address',
                                  preserveNullAndEmptyArrays: true,
                                },
                              },
                            ],
                          },
                        },
                        {
                          $unwind: {
                            path: '$guest',
                            preserveNullAndEmptyArrays: true,
                          },
                        },
                        {
                          $project: {
                            password: 0,
                            changePasswordAt: 0,
                            registrationType: 0,
                            deactivated: 0,
                            canReceiveEmail: 0,
                          },
                        },
                      ],
                    },
                  },
                  {
                    $unwind: {
                      path: '$reviewerId',
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                ],
              },
            },
          ],
          as: 'bookableUnit', // Temporary field to store matching documents
        },
      },
      {
        $addFields: {
          propertyIds: {
            $cond: {
              if: {
                $gt: [{ $size: { $ifNull: ['$bookableUnit', []] } }, 0],
              }, // Default to empty array if missing
              then: {
                $mergeObjects: [
                  '$propertyIds', // Original propertyIds fields
                  { unitId: { $arrayElemAt: ['$bookableUnit', 0] } }, // Replace unitId with matched bookableUnit details
                  { propertyId: { $arrayElemAt: ['$property', 0] } },
                ],
              },
              else: '$propertyIds', // Keep original propertyIds if no matches are found
            },
          },
        },
      },
      {
        $lookup: {
          from: 'activities',
          localField: 'activityIds.activityId',
          foreignField: '_id',
          as: 'activity',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'host',
                foreignField: '_id',
                as: 'host',
                pipeline: [
                  {
                    $lookup: {
                      from: 'guests',
                      localField: 'guest',
                      foreignField: '_id',
                      as: 'guest',
                      pipeline: [
                        {
                          $lookup: {
                            from: 'addresses',
                            localField: 'address',
                            foreignField: '_id',
                            as: 'address',
                          },
                        },
                        {
                          $unwind: {
                            path: '$address',
                            preserveNullAndEmptyArrays: true,
                          },
                        },
                      ],
                    },
                  },
                  {
                    $unwind: {
                      path: '$guest',
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                ],
              },
            },
            {
              $unwind: {
                path: '$host',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'locations',
                localField: 'meetingPoint',
                foreignField: '_id',
                as: 'meetingPoint',
              },
            },
            {
              $unwind: {
                path: '$meetingPoint',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'photos',
                localField: 'photos',
                foreignField: '_id',
                as: 'photos',
              },
            },
            {
              $project: {
                'host.password': 0,
                'host.changePasswordAt': 0,
                'host.registrationType': 0,
                'host.canReceiveEmail': 0,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          activityIds: {
            $cond: {
              if: {
                $gt: [{ $size: { $ifNull: ['$activity', []] } }, 0],
              }, // Default to empty array if missing
              then: {
                $mergeObjects: [
                  '$activityIds', // Original propertyIds fields
                  { activityId: { $arrayElemAt: ['$activity', 0] } }, // Replace unitId with matched bookableUnit details
                ],
              },
              else: '$activityIds', // Keep original propertyIds if no matches are found
            },
          },
        },
      },
      {
        $lookup: {
          from: 'rentals',
          localField: 'rentalIds.rentalId',
          foreignField: '_id',
          as: 'rentals',
          pipeline: [
            {
              $lookup: {
                from: 'rentaldetails',
                localField: 'details',
                foreignField: '_id',
                as: 'details',
              },
            },
            {
              $unwind: {
                path: '$details',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'rentalrates',
                localField: 'pricing',
                foreignField: '_id',
                as: 'pricing',
              },
            },
            {
              $unwind: {
                path: '$pricing',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'host',
                foreignField: '_id',
                as: 'host',
                pipeline: [
                  {
                    $project: {
                      password: 0,
                      changePasswordAt: 0,
                      registrationType: 0,
                      deactivated: 0,
                      canReceiveEmail: 0,
                    },
                  },
                  {
                    $lookup: {
                      from: 'guests',
                      localField: 'guest',
                      foreignField: '_id',
                      as: 'guest',
                      pipeline: [
                        {
                          $lookup: {
                            from: 'addresses',
                            localField: 'address',
                            foreignField: '_id',
                            as: 'address',
                          },
                        },
                        {
                          $unwind: {
                            path: '$address',
                            preserveNullAndEmptyArrays: true,
                          },
                        },
                      ],
                    },
                  },
                  {
                    $unwind: {
                      path: '$guest',
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                ],
              },
            },
            {
              $unwind: {
                path: '$host',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'rentaladdons',
                localField: 'addOns',
                foreignField: '_id',
                as: 'addOns',
              },
            },
            {
              $unwind: {
                path: '$addOns',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'photos',
                localField: 'photos',
                foreignField: '_id',
                as: 'photos',
              },
            },
            {
              $lookup: {
                from: 'locations',
                localField: 'location',
                foreignField: '_id',
                as: 'location',
              },
            },
            {
              $unwind: {
                path: '$location',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'reviews',
                localField: 'reviews',
                foreignField: '_id',
                as: 'reviews',
                pipeline: [
                  {
                    $lookup: {
                      from: 'users',
                      localField: 'reviewerId',
                      foreignField: '_id',
                      as: 'reviewerId',
                      pipeline: [
                        {
                          $lookup: {
                            from: 'guests',
                            localField: 'guest',
                            foreignField: '_id',
                            as: 'guest',
                            pipeline: [
                              {
                                $project: {
                                  emergencyContacts: 0,
                                },
                              },
                              {
                                $lookup: {
                                  from: 'addresses',
                                  localField: 'address',
                                  foreignField: '_id',
                                  as: 'address',
                                },
                              },
                              {
                                $unwind: {
                                  path: '$address',
                                  preserveNullAndEmptyArrays: true,
                                },
                              },
                            ],
                          },
                        },
                        {
                          $unwind: {
                            path: '$guest',
                            preserveNullAndEmptyArrays: true,
                          },
                        },
                        {
                          $project: {
                            password: 0,
                            changePasswordAt: 0,
                            registrationType: 0,
                            deactivated: 0,
                            canReceiveEmail: 0,
                          },
                        },
                      ],
                    },
                  },
                  {
                    $unwind: {
                      path: '$reviewerId',
                      preserveNullAndEmptyArrays: true,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        $addFields: {
          rentalIds: {
            $cond: {
              if: {
                $gt: [{ $size: { $ifNull: ['$rentals', []] } }, 0],
              }, // Default to empty array if missing
              then: {
                $mergeObjects: [
                  '$rentalIds',
                  { rentalId: { $arrayElemAt: ['$rentals', 0] } },
                ],
              },
              else: '$rentalIds',
            },
          },
        },
      },
      {
        $project: {
          property: 0,
          bookableUnit: 0,
          activity: 0,
          rentals: 0,
        },
      }, // Remove temporary field
      { $sort: { startDate: 1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]

    const carts = await dbCarts.aggregate(pipeline)
    const totalCounts = await dbCarts.find(query).countDocuments()

    if (!carts || carts.length === 0) {
      res.json(
        response.success({
          items: [],
          message: 'No available items on your cart',
        })
      )
    } else {
      const totalPrice = carts.reduce((sum, item) => sum + (item.price || 0), 0)
      const totalGuestComission = carts.reduce(
        (sum, item) => sum + (item.guestComission || 0),
        0
      )
      res.json(
        response.success({
          items: carts,
          totalPrice,
          totalGuestComission,
          pageItemCount: carts.length,
          allItemCount: totalCounts,
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

export const updateCartInfo = async (req: Request, res: Response) => {
  const cartId = req.params.cartId
  const userId = res.locals.user?.id
  const { startDate, endDate, guestCount, contacts } = req.body
  let hostComission, totalPrice
  try {
    const getCart: any = await dbCarts.findOne({
      _id: cartId,
      userId: userId,
      status: 'Active',
      deletedAt: null,
    })
    if (!getCart) {
      res.json(response.error({ message: 'Cart not found or already removed' }))
    } else {
      if (!guestCount || !contacts) {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      } else {
        if (getCart.propertyIds) {
          const unit: any = await dbBookableUnitTypes
            .findOne({
              qtyIds: { $elemMatch: { _id: getCart.propertyIds.unitId } },
            })
            .populate('unitPrice')
          const startDay = new Date(startDate)
          const endDay = new Date(endDate)
          const countDays = differenceInCalendarDays(endDay, startDay)
          totalPrice = unit?.unitPrice.baseRate * guestCount * countDays
          hostComission = PROPERTY_HOST_COMMISSION_PERCENT * totalPrice
        } else if (getCart.rentalIds) {
          const rental: any = await dbRentals
            .findOne({
              _id: getCart.rentalIds.rentalId,
              qtyIds: { $elemMatch: { _id: getCart.rentalIds.qtyIdsId } },
            })
            .populate('pricing')
          const startDay = new Date(startDate)
          const endDay = new Date(endDate)
          const countDays = differenceInCalendarDays(endDay, startDay)
          totalPrice = rental?.pricing.dayRate * guestCount * countDays
          hostComission = RENTAL_HOST_COMMISSION_PERCENT * totalPrice
        } else if (getCart.activityIds) {
          const activity = await dbActivities.findOne({
            _id: getCart.activityIds.activityId,
          })
          const price = activity?.pricePerPerson || activity?.pricePerSlot || 0
          if (activity?.pricePerPerson) {
            totalPrice = price * guestCount
            hostComission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
          } else if (activity?.pricePerSlot) {
            totalPrice = price
            hostComission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
          } else {
            res.json(
              response.error({ message: 'Price is not set on this activity' })
            )
          }
        }
        const guestComission = (totalPrice || 0) * GUEST_COMMISSION_PERCENT
        const updateCart = await dbCarts.findByIdAndUpdate(cartId, {
          $set: {
            startDate: startDate ? startDate : null,
            endDate: endDate ? endDate : null,
            price: totalPrice,
            guestCount,
            hostComission,
            guestComission,
            updatedAt: Date.now(),
            contacts: contacts || [],
          },
        })
        res.json(
          response.success({
            item: updateCart,
            message: 'Cart Item information successfully updated',
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

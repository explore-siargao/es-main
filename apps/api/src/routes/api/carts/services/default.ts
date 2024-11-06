import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbCarts, dbReservations } from '@repo/database'
import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { pipeline } from 'stream'

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
    const userId = res.locals.user?.id
    const type = ((req.query.type as string) || 'cart').toLowerCase()
    const { page = 1, limit = 15 } = req.pagination || {}

    if (type === 'cart') {
      const pipeline: any = [
        {
          $match: {
            userId: new Types.ObjectId(userId),
            deletedAt: null,
            status: 'Active',
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
                $lookup: {
                  from: 'facilities',
                  localField: 'facilities',
                  foreignField: '_id',
                  as: 'facilities',
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
                  from: 'policies',
                  localField: 'policies',
                  foreignField: '_id',
                  as: 'policies',
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
                $project: {
                  _id: 1,
                  'offerBy.password': 0,
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
      const totalCounts = await dbCarts
        .find({ userId: userId, status: 'Active' })
        .countDocuments()

      if (!carts || carts.length === 0) {
        res.json(
          response.success({
            items: [],
            message: 'No available items on your cart',
          })
        )
      } else {
        res.json(
          response.success({
            items: carts,
            pageItemCount: carts.length,
            allItemCount: totalCounts,
          })
        )
      }
    } else if (type === 'reservation') {
      const pipeline: any = [
        {
          $match: {
            guest: new Types.ObjectId(userId),
            deletedAt: null,
            status: { $ne: 'Cancelled' },
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
                $lookup: {
                  from: 'facilities',
                  localField: 'facilities',
                  foreignField: '_id',
                  as: 'facilities',
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
                  from: 'policies',
                  localField: 'policies',
                  foreignField: '_id',
                  as: 'policies',
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
                $project: {
                  _id: 1,
                  'offerBy.password': 0,
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

      const reservations = await dbReservations.aggregate(pipeline)
      const totalCounts = await dbReservations
        .find({ guest: userId, status: 'Active' })
        .countDocuments()

      if (!reservations || reservations.length === 0) {
        res.json(
          response.success({
            items: [],
            message: 'No available on reservations yet',
          })
        )
      } else {
        res.json(
          response.success({
            items: reservations,
            pageItemCount: reservations.length,
            allItemCount: totalCounts,
          })
        )
      }
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

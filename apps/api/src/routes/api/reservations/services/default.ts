import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import {
  T_Add_Reservation,
  Z_Add_Reservations,
} from '@repo/contract-2/reservations'
import { dbCarts, dbForPaymentListing, dbReservations } from '@repo/database'
import { Request, Response } from 'express'
import { Types } from 'mongoose'
const response = new ResponseService()
export const getAllReservations = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const { page = 1, limit = 15 } = req.pagination || {}
  try {
    const pipeline: any = [
      {
        $match: {
          guest: new Types.ObjectId(userId),
          deletedAt: null,
          $and: [
            { status: { $ne: 'Cancelled' } },
            { status: { $ne: 'For-Payment' } },
          ],
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
        $lookup: {
          from: 'users',
          localField: 'guest',
          foreignField: '_id',
          as: 'guest',
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
          path: '$guest',
          preserveNullAndEmptyArrays: true,
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
      .find({
        guest: userId,
        $and: [
          { status: { $ne: 'Cancelled' } },
          { status: { $ne: 'For-Payment' } },
        ],
      })
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
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateReservationStatusByReferenceId = async (
  req: Request,
  res: Response
) => {
  try {
    const referenceId = req.params.referenceId
    const getReservations = await dbReservations.find({
      xendItPaymentReferenceId: referenceId,
      status: 'For-Payment',
    })
    const cartIds = getReservations.flatMap((item) => item.cartId)
    const confirmedStatus = await dbReservations.updateMany(
      { xendItPaymentReferenceId: referenceId, status: 'For-Payment' },
      {
        $set: { status: 'Confirmed' },
        updatedAt: Date.now(),
      }
    )
    if (!confirmedStatus) {
      res.json(response.error({ message: 'Wrong reference ID' }))
    } else {
      await dbCarts.updateMany(
        { _id: { $in: cartIds } },
        { $set: { status: 'Completed' } }
      )
      const id = getReservations[0]?.forPaymenttId
      await dbForPaymentListing.findByIdAndUpdate(id, {
        $set: {
          status: 'Completed',
        },
      })

      res.json(
        response.success({ message: 'Reservation status updated successfully' })
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

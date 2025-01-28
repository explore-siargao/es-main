import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import {
  ACTIVITY_HOST_COMMISSION_PERCENT,
  GUEST_COMMISSION_PERCENT,
  PROPERTY_HOST_COMMISSION_PERCENT,
  RENTAL_HOST_COMMISSION_PERCENT,
} from '@repo/constants'
import {
  Z_Add_For_Payment,
  Z_Update_For_Payment,
} from '@repo/contract-2/for-payment-listings'
import {
  dbActivities,
  dbBookableUnitTypes,
  dbForPaymentListing,
  dbRentals,
} from '@repo/database'
import { differenceInCalendarDays } from 'date-fns'
import { Request, Response } from 'express'
import { Types } from 'mongoose'

const response = new ResponseService()
export const bookListing = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  let totalPrice, hostCommission
  const {
    propertyIds = null,
    rentalIds = null,
    activityIds = null,
    guestCount,
    startDate,
    endDate,
  } = req.body
  try {
    if (
      (!propertyIds && !rentalIds && !activityIds) ||
      !guestCount ||
      !startDate ||
      !endDate
    ) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      if (propertyIds) {
        const unit: any = await dbBookableUnitTypes
          .findOne({ qtyIds: { $elemMatch: { _id: propertyIds.unitId } } })
          .populate('unitPrice')
        const startDay = new Date(startDate)
        const endDay = new Date(endDate)
        const countDays = differenceInCalendarDays(endDay, startDay)
        totalPrice = unit?.unitPrice.baseRate * guestCount * countDays
        hostCommission = PROPERTY_HOST_COMMISSION_PERCENT * totalPrice
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
        hostCommission = RENTAL_HOST_COMMISSION_PERCENT * totalPrice
      } else if (activityIds) {
        const activity = await dbActivities.findOne({
          _id: activityIds.activityId,
        })
        const price = activity?.pricePerPerson || activity?.pricePerSlot || 0
        if (activity?.pricePerPerson) {
          totalPrice = price * guestCount
          hostCommission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
        } else if (activity?.pricePerSlot) {
          totalPrice = price
          hostCommission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
        } else {
          res.json(
            response.error({ message: 'Price is not set on this activity' })
          )
        }
      }
      const guestCommission = (totalPrice || 0) * GUEST_COMMISSION_PERCENT
      const validForPaymentInput = Z_Add_For_Payment.safeParse({
        userId: userId,
        propertyIds,
        rentalIds,
        activityIds,
        price: (totalPrice || 0) + guestCommission,
        guestCount,
        // key wrong spelling
        guestComission: guestCommission,
        // key wrong spelling
        hostComission: hostCommission,
        status: 'Active',
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      })
      if (validForPaymentInput.success) {
        const newForPayments = new dbForPaymentListing(
          validForPaymentInput.data
        )
        const saveForPayment = await newForPayments.save()
        res.json(
          response.success({
            item: saveForPayment,
            message: 'Listing successfully added to for payment',
          })
        )
      } else {
        console.error(JSON.parse(validForPaymentInput.error.message))
        res.json(response.error({ message: 'Invalid payloads' }))
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

export const updateForPayment = async (req: Request, res: Response) => {
  const forPaymentId = req.params.forPaymentId
  let { guestCount, startDate, endDate, contacts } = req.body
  let totalPrice, hostCommission

  try {
    if (!guestCount && !contacts && !startDate && !endDate) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const forPayment = await dbForPaymentListing.findOne({
        status: 'Active',
        _id: forPaymentId,
      })
      if (!forPayment) {
        res.json(response.error({ message: 'No for payment found' }))
      } else {
        if (!startDate) {
          startDate = forPayment?.startDate
        }
        if (!endDate) {
          endDate = forPayment?.endDate
        }
        if (!guestCount) {
          guestCount = forPayment?.guestCount
        }
        if (forPayment.propertyIds) {
          const unit: any = await dbBookableUnitTypes
            .findOne({
              qtyIds: { $elemMatch: { _id: forPayment.propertyIds.unitId } },
            })
            .populate('unitPrice')
          const startDay = new Date(startDate)
          const endDay = new Date(endDate)
          const countDays = differenceInCalendarDays(endDay, startDay)
          totalPrice = unit?.unitPrice.baseRate * guestCount * countDays
          hostCommission = PROPERTY_HOST_COMMISSION_PERCENT * totalPrice
        } else if (forPayment.rentalIds) {
          const rental: any = await dbRentals
            .findOne({
              _id: forPayment.rentalIds.rentalId,
              qtyIds: { $elemMatch: { _id: forPayment.rentalIds.qtyIdsId } },
            })
            .populate('pricing')
          const startDay = new Date(startDate)
          const endDay = new Date(endDate)
          const countDays = differenceInCalendarDays(endDay, startDay)
          totalPrice = rental?.pricing.dayRate * guestCount * countDays
          hostCommission = RENTAL_HOST_COMMISSION_PERCENT * totalPrice
        } else if (forPayment.activityIds) {
          const activity = await dbActivities.findOne({
            _id: forPayment.activityIds.activityId,
          })
          const price = activity?.pricePerPerson || activity?.pricePerSlot || 0
          if (activity?.pricePerPerson) {
            totalPrice = price * guestCount
            hostCommission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
          } else if (activity?.pricePerSlot) {
            totalPrice = price
            hostCommission = ACTIVITY_HOST_COMMISSION_PERCENT * totalPrice
          } else {
            res.json(
              response.error({ message: 'Price is not set on this activity' })
            )
          }
        }
        const guestCommission = (totalPrice || 0) * GUEST_COMMISSION_PERCENT
        const validForPaymentUpdate = Z_Update_For_Payment.safeParse({
          _id: String(forPaymentId),
          guestCount,
          price: (totalPrice || 0) + guestCommission,
          // key wrong spelling
          hostComission: hostCommission,
          // key wrong spelling
          guestComission: guestCommission,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          contacts,
        })
        if (validForPaymentUpdate.success) {
          const updateForPayment = await dbForPaymentListing.findByIdAndUpdate(
            forPaymentId,
            {
              $set: validForPaymentUpdate.data,
            }
          )
          res.json(
            response.success({
              item: updateForPayment,
              message: 'Successfullu updated payment details',
            })
          )
        } else {
          console.log(JSON.parse(validForPaymentUpdate.error.message))
          res.json(response.error({ message: 'Invalid payload' }))
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

export const getBookListing = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user?.id
    const { page = 1, limit = 15 } = req.pagination || {}
    const id = req.params.forPaymentId
    const query: any = {
      deletedAt: null,
      status: 'Active',
      userId: new Types.ObjectId(userId),
    }
    if (id) {
      query._id = new Types.ObjectId(id)
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

    const result = await dbForPaymentListing.aggregate(pipeline)

    if (id) {
      const item = result.length > 0 ? result[0] : null
      if (!item) {
        res.json(
          response.success({
            item: null,
            message: 'No item found with the provided ID',
          })
        )
      }

      res.json(
        response.success({
          item,
          message: 'Item retrieved successfully',
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

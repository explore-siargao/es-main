import { E_ReservationStatus } from '@repo/contract-2/reservations'
import { Types } from 'mongoose'

export const buildFinishReservationsPipeline = (
  userId: string,
  dateNow: Date,
  page: number,
  limit: number,
  referenceId?: string
) => {
  const query = {
    $and: [
      { guest: new Types.ObjectId(userId) },
      {
        $or: [
          { status: E_ReservationStatus.Confirmed },
          { status: E_ReservationStatus.CheckedOut },
        ],
      },
      { endDate: { $lt: dateNow } },
      ...(referenceId === 'undefined'
        ? []
        : [{ _id: new Types.ObjectId(referenceId) }]),
    ],
  }

  return [
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'carts',
        localField: 'cartId',
        foreignField: '_id',
        as: 'cart',
        pipeline: [
          {
            $project: {
              userId: 0,
              propertyIds: 0,
              rentalIds: 0,
              activityIds: 0,
              startDate: 0,
              endDate: 0,
              createdAt: 0,
              updatedAt: 0,
              deletedAt: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: '$cart',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'forpaymentlistings',
        localField: 'forPaymenttId',
        foreignField: '_id',
        as: 'forpayment',
        pipeline: [
          {
            $project: {
              userId: 0,
              propertyIds: 0,
              rentalIds: 0,
              activityIds: 0,
              startDate: 0,
              endDate: 0,
              createdAt: 0,
              updatedAt: 0,
              deletedAt: 0,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: '$forpayment',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'guest',
        foreignField: '_id',
        as: 'userId',
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
          {
            $project: {
              password: 0,
              registrationType: 0,
              canReceiveEmail: 0,
              createdAt: 0,
              deletedAt: 0,
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
            $project: {
              reviews: 0,
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
            $project: {
              reviews: 0,
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
            $project: {
              reviews: 0,
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
            $project: {
              reviews: 0,
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
      $addFields: {
        price: { $ifNull: ['$cart.price', '$forpayment.price'] },
        guestComission: {
          $ifNull: ['$cart.guestComission', '$forpayment.guestComission'],
        },
        hostComission: {
          $ifNull: ['$cart.hostComission', '$forpayment.hostComission'],
        },
        contacts: { $ifNull: ['$cart.contacts', '$forpayment.contacts'] },
      },
    },
    {
      $project: {
        guest: 0,
        property: 0,
        bookableUnit: 0,
        activity: 0,
        rentals: 0,
        cart: 0,
        forpayment: 0,
      },
    },
    { $skip: (page - 1) * limit },
    { $limit: limit },
  ]
}

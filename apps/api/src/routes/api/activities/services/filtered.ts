import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { parseToUTCDate } from '@/common/helpers/dateToUTC'
import { ResponseService } from '@/common/service/response'
import { dbActivities, dbLocations, dbReservations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getFilteredActivities = async (req: Request, res: Response) => {
  let {
    location,
    experienceTypes,
    activityTypes,
    priceFrom,
    priceTo,
    durations,
    starRating,
    activityDate = 'any',
    numberOfGuest = 'any',
  } = req.query
  const { page, limit } = req.pagination || { page: 1, limit: 15 }
  const query: any = { deletedAt: null, status: 'Live' }
  try {
    if (!priceFrom || priceFrom === 'any') {
      priceFrom = '0'
    }
    if (!priceTo || priceTo === 'any') {
      priceTo = '999999999'
    }
    if (
      activityTypes &&
      typeof activityTypes === 'string' &&
      activityTypes !== 'any'
    ) {
      const activityTypesArray = activityTypes.split(',')
      const newActivityTypesArray = activityTypesArray
        .map((t: string) => t.trim())
        .filter((t: string) => t !== '')
        .map((t: string) => new RegExp(`^${t}$`, 'i'))
      query.activityType = { $in: newActivityTypesArray }
    }
    if (durations && durations !== 'any') {
      query.durationHour = Number(durations)
    }
    if (!starRating || starRating === 'any') {
      starRating = '0'
    }
    const startDate =
      activityDate === 'any' ? 'any' : parseToUTCDate(activityDate as string)

    const getActivityPrivateReservations = await dbReservations.aggregate([
      {
        $match: {
          deletedAt: null,
          status: { $ne: 'Cancelled' },
          activityIds: { $ne: null },
          $expr: {
            $or: [
              { $eq: [startDate, 'any'] }, // Ignore date condition if "any"
              { $eq: ['$startDate', startDate] }, // Reservation starts on or before query's endDate
            ],
          },
        },
      },
      {
        $match: {
          $and: [
            { 'activityIds.timeSlotId': { $exists: true } },
            { 'activityIds.timeSlotId': { $ne: null } },
            {
              $or: [
                { 'activityIds.slotIdsId': { $exists: false } },
                { 'activityIds.slotIdsId': { $eq: null } },
              ],
            },
          ],
        },
      },
      {
        $group: {
          _id: null,
          timeSlotIds: { $push: '$activityIds.timeSlotId' },
        },
      },
      {
        $unwind: {
          path: '$timeSlotIds',
        },
      },
      {
        $project: {
          _id: 0,
          timeSlotIds: 1,
        },
      },
    ])

    const getActivityJoinerReservations = await dbReservations.aggregate([
      {
        $match: {
          deletedAt: null,
          status: { $ne: 'Cancelled' },
          activityIds: { $ne: null },
          $expr: {
            $or: [
              { $eq: [startDate, 'any'] }, // Ignore date condition if "any"
              { $eq: ['$startDate', startDate] }, // Reservation starts on or before query's endDate
            ],
          },
        },
      },
      {
        $match: {
          $and: [
            { 'activityIds.slotIdsId': { $exists: true } },
            { 'activityIds.slotIdsId': { $ne: null } },
          ],
        },
      },
      {
        $group: {
          _id: null,
          slotIdsId: { $push: '$activityIds.slotIdsId' },
        },
      },
      {
        $unwind: {
          path: '$slotIdsId',
        },
      },
      {
        $project: {
          _id: 0,
          slotIdsId: 1,
        },
      },
    ])

    const timeSlotIds =
      getActivityPrivateReservations.length > 0
        ? getActivityPrivateReservations.map((item: any) => item.timeSlotIds)
        : []

    const slotIdsId =
      getActivityJoinerReservations.length > 0
        ? getActivityJoinerReservations.map((item: any) => item.slotIdsId)
        : []

    if ((!location || location === 'any') && (!experienceTypes || experienceTypes === 'any')) {
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: 'users',
            localField: 'host',
            foreignField: '_id',
            as: 'host',
          },
        },
        { $unwind: '$host' },
        {
          $lookup: {
            from: 'guests',
            localField: 'host.guest',
            foreignField: '_id',
            as: 'host.guest',
          },
        },
        { $unwind: '$host.guest' },
        {
          $lookup: {
            from: 'addresses',
            localField: 'host.guest.address',
            foreignField: '_id',
            as: 'host.guest.address',
          },
        },
        {
          $unwind: {
            path: '$host.guest.address',
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
          $match: {
            $or: [
              {
                pricePerPerson: {
                  $gte: Number(priceFrom),
                  $lte: Number(priceTo),
                },
              },
              {
                pricePerSlot: {
                  $gte: Number(priceFrom),
                  $lte: Number(priceTo),
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
          },
        },
        {
          $addFields: {
            average: {
              $cond: {
                if: { $gt: [{ $size: '$reviews' }, 0] },
                then: { $avg: '$reviews.totalRates' },
                else: 0,
              },
            },
            reviewsCount: { $size: '$reviews' },
          },
        },
        ...(Number(starRating) > 0
          ? [
              {
                $match: {
                  average: {
                    $gte: Number(starRating),
                    $lt: Number(starRating) + 1,
                  },
                },
              },
            ]
          : []),
        {
          $addFields: {
            'schedule.monday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.monday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.monday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.tuesday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.tuesday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.tuesday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.wednesday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.wednesday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.wednesday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.thursday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.thursday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.thursday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.friday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.friday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.friday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.saturday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.saturday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.saturday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.sunday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.sunday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.sunday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                {
                  $cond: {
                    if: { $ne: [numberOfGuest, 'any'] },
                    then: {
                      $and: [
                        {
                          $gte: [
                            Number(numberOfGuest),
                            '$slotCapacity.minimum',
                          ],
                        },
                        {
                          $lte: [
                            Number(numberOfGuest),
                            '$slotCapacity.maximum',
                          ],
                        },
                      ],
                    },
                    else: true,
                  },
                },
                {
                  $cond: {
                    if: { $eq: ['$experienceType', 'Private'] },
                    then: {
                      $and: [
                        { $ne: [{ $size: '$schedule.monday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.tuesday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.wednesday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.thursday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.friday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.saturday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.sunday.slots' }, 0] },
                      ],
                    },
                    else: {
                      $and: [
                        {
                          $or: [
                            {
                              $ne: [
                                { $size: '$schedule.monday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.tuesday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                {
                                  $size: '$schedule.wednesday.slots.slotIdsId',
                                },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.thursday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.friday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.saturday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.sunday.slots.slotIdsId' },
                                0,
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
        {
          $facet: {
            totalCount: [{ $count: 'count' }],
            paginatedResults: [
              { $skip: (page - 1) * limit },
              { $limit: limit },
            ],
          },
        },
        {
          $project: {
            allItemsCount: { $arrayElemAt: ['$totalCount.count', 0] },
            pageItemCount: { $size: '$paginatedResults' },
            results: '$paginatedResults',
          },
        },
        {
          $project: {
            allItemsCount: 1,
            pageItemCount: 1,
            'results._id': 1,
            'results.title': 1,
            'results.activityType': 1,
            'results.activityNote': 1,
            'results.experienceType': 1,
            'results.description': 1,
            'results.highLights': 1,
            'results.durationHour': 1,
            'results.durationMinute': 1,
            'results.languages': 1,
            'results.isFoodIncluded': 1,
            'results.includedFoods': 1,
            'results.isNonAlcoholicDrinkIncluded': 1,
            'results.isAlcoholicDrinkIncluded': 1,
            'results.includedAlcoholicDrinks': 1,
            'results.otherInclusion': 1,
            'results.notIncluded': 1,
            'results.whatToBring': 1,
            'results.notAllowed': 1,
            'results.policies': 1,
            'results.isSegmentBuilderEnabled': 1,
            'results.segments': 1,
            'results.slotCapacity': 1,
            'results.schedule': 1,
            'results.pricePerPerson': 1,
            'results.pricePerSlot': 1,
            'results.daysCanCancel': 1,
            'results.status': 1,
            'results.finishedSections': 1,
            'results.pricePerDates': 1,
            'results.host._id': 1,
            'results.host.email': 1,
            'results.host.role': 1,
            'results.host.guest._id': 1,
            'results.host.guest.firstName': 1,
            'results.host.guest.middleName': 1,
            'results.host.guest.lastName': 1,
            'results.host.guest.language': 1,
            'results.host.guest.currency': 1,
            'results.host.guest.address': 1,
            'results.meetingPoint': 1,
            'results.photos': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]

      const activities = await dbActivities.aggregate(pipeline)
      res.json(
        response.success({
          items: activities[0].results,
          pageItemCount: activities[0].pageItemCount || 0,
          allItemCount: activities[0].allItemsCount || 0,
        })
      )
    } else if (location && location !== 'any' && (!experienceTypes || experienceTypes === 'any')) {
      const normalizedLocation = String(location).toLowerCase()
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: 'users',
            localField: 'host',
            foreignField: '_id',
            as: 'host',
          },
        },
        { $unwind: '$host' },
        {
          $lookup: {
            from: 'guests',
            localField: 'host.guest',
            foreignField: '_id',
            as: 'host.guest',
          },
        },
        { $unwind: '$host.guest' },
        {
          $lookup: {
            from: 'addresses',
            localField: 'host.guest.address',
            foreignField: '_id',
            as: 'host.guest.address',
          },
        },
        {
          $unwind: {
            path: '$host.guest.address',
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
          $match: {
            $expr: {
              $eq: [{ $toLower: '$meetingPoint.city' }, normalizedLocation],
            },
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
          $match: {
            $or: [
              {
                pricePerPerson: {
                  $gte: Number(priceFrom),
                  $lte: Number(priceTo),
                },
              },
              {
                pricePerSlot: {
                  $gte: Number(priceFrom),
                  $lte: Number(priceTo),
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
          },
        },
        {
          $addFields: {
            average: {
              $cond: {
                if: { $gt: [{ $size: '$reviews' }, 0] },
                then: { $avg: '$reviews.totalRates' },
                else: 0,
              },
            },
            reviewsCount: { $size: '$reviews' },
          },
        },
        ...(Number(starRating) > 0
          ? [
              {
                $match: {
                  average: {
                    $gte: Number(starRating),
                    $lt: Number(starRating) + 1,
                  },
                },
              },
            ]
          : []),
        {
          $addFields: {
            'schedule.monday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.monday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.monday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.tuesday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.tuesday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.tuesday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.wednesday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.wednesday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.wednesday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.thursday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.thursday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.thursday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.friday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.friday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.friday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.saturday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.saturday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.saturday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.sunday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.sunday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.sunday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                {
                  $cond: {
                    if: { $ne: [numberOfGuest, 'any'] },
                    then: {
                      $and: [
                        {
                          $gte: [
                            Number(numberOfGuest),
                            '$slotCapacity.minimum',
                          ],
                        },
                        {
                          $lte: [
                            Number(numberOfGuest),
                            '$slotCapacity.maximum',
                          ],
                        },
                      ],
                    },
                    else: true,
                  },
                },
                {
                  $cond: {
                    if: { $eq: ['$experienceType', 'Private'] },
                    then: {
                      $and: [
                        { $ne: [{ $size: '$schedule.monday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.tuesday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.wednesday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.thursday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.friday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.saturday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.sunday.slots' }, 0] },
                      ],
                    },
                    else: {
                      $and: [
                        {
                          $or: [
                            {
                              $ne: [
                                { $size: '$schedule.monday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.tuesday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                {
                                  $size: '$schedule.wednesday.slots.slotIdsId',
                                },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.thursday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.friday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.saturday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.sunday.slots.slotIdsId' },
                                0,
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
        {
          $facet: {
            totalCount: [{ $count: 'count' }],
            paginatedResults: [
              { $skip: (page - 1) * limit },
              { $limit: limit },
            ],
          },
        },
        {
          $project: {
            allItemsCount: { $arrayElemAt: ['$totalCount.count', 0] },
            pageItemCount: { $size: '$paginatedResults' },
            results: '$paginatedResults',
          },
        },
        {
          $project: {
            allItemsCount: 1,
            pageItemCount: 1,
            'results._id': 1,
            'results.title': 1,
            'results.activityType': 1,
            'results.activityNote': 1,
            'results.experienceType': 1,
            'results.description': 1,
            'results.highLights': 1,
            'results.durationHour': 1,
            'results.durationMinute': 1,
            'results.languages': 1,
            'results.isFoodIncluded': 1,
            'results.includedFoods': 1,
            'results.isNonAlcoholicDrinkIncluded': 1,
            'results.isAlcoholicDrinkIncluded': 1,
            'results.includedAlcoholicDrinks': 1,
            'results.otherInclusion': 1,
            'results.notIncluded': 1,
            'results.whatToBring': 1,
            'results.notAllowed': 1,
            'results.policies': 1,
            'results.isSegmentBuilderEnabled': 1,
            'results.segments': 1,
            'results.slotCapacity': 1,
            'results.schedule': 1,
            'results.pricePerPerson': 1,
            'results.pricePerSlot': 1,
            'results.daysCanCancel': 1,
            'results.status': 1,
            'results.finishedSections': 1,
            'results.pricePerDates': 1,
            'results.host._id': 1,
            'results.host.email': 1,
            'results.host.role': 1,
            'results.host.guest._id': 1,
            'results.host.guest.firstName': 1,
            'results.host.guest.middleName': 1,
            'results.host.guest.lastName': 1,
            'results.host.guest.language': 1,
            'results.host.guest.currency': 1,
            'results.host.guest.address': 1,
            'results.meetingPoint': 1,
            'results.photos': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]

      const activities = await dbActivities.aggregate(pipeline)
      res.json(
        response.success({
          items: activities[0].results,
          pageItemCount: activities[0].pageItemCount || 0,
          allItemCount: activities[0].allItemsCount || 0,
        })
      )
    } else if ((!location || location === 'any') && experienceTypes && experienceTypes !== 'any') {
      const typeArray = String(experienceTypes)
        .split(',')
        .map((item) => new RegExp(`^${item.trim()}$`, 'i'))
      query.experienceType = { $in: typeArray }
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: 'users',
            localField: 'host',
            foreignField: '_id',
            as: 'host',
          },
        },
        { $unwind: '$host' },
        {
          $lookup: {
            from: 'guests',
            localField: 'host.guest',
            foreignField: '_id',
            as: 'host.guest',
          },
        },
        { $unwind: '$host.guest' },
        {
          $lookup: {
            from: 'addresses',
            localField: 'host.guest.address',
            foreignField: '_id',
            as: 'host.guest.address',
          },
        },
        {
          $unwind: {
            path: '$host.guest.address',
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
          $match: {
            $or: [
              {
                pricePerPerson: {
                  $gte: Number(priceFrom),
                  $lte: Number(priceTo),
                },
              },
              {
                pricePerSlot: {
                  $gte: Number(priceFrom),
                  $lte: Number(priceTo),
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
          },
        },
        {
          $addFields: {
            average: {
              $cond: {
                if: { $gt: [{ $size: '$reviews' }, 0] },
                then: { $avg: '$reviews.totalRates' },
                else: 0,
              },
            },
            reviewsCount: { $size: '$reviews' },
          },
        },
        ...(Number(starRating) > 0
          ? [
              {
                $match: {
                  average: {
                    $gte: Number(starRating),
                    $lt: Number(starRating) + 1,
                  },
                },
              },
            ]
          : []),
        {
          $addFields: {
            'schedule.monday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.monday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.monday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.tuesday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.tuesday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.tuesday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.wednesday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.wednesday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.wednesday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.thursday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.thursday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.thursday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.friday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.friday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.friday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.saturday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.saturday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.saturday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.sunday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.sunday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.sunday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                {
                  $cond: {
                    if: { $ne: [numberOfGuest, 'any'] },
                    then: {
                      $and: [
                        {
                          $gte: [
                            Number(numberOfGuest),
                            '$slotCapacity.minimum',
                          ],
                        },
                        {
                          $lte: [
                            Number(numberOfGuest),
                            '$slotCapacity.maximum',
                          ],
                        },
                      ],
                    },
                    else: true,
                  },
                },
                {
                  $cond: {
                    if: { $eq: ['$experienceType', 'Private'] },
                    then: {
                      $and: [
                        { $ne: [{ $size: '$schedule.monday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.tuesday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.wednesday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.thursday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.friday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.saturday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.sunday.slots' }, 0] },
                      ],
                    },
                    else: {
                      $and: [
                        {
                          $or: [
                            {
                              $ne: [
                                { $size: '$schedule.monday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.tuesday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                {
                                  $size: '$schedule.wednesday.slots.slotIdsId',
                                },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.thursday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.friday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.saturday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.sunday.slots.slotIdsId' },
                                0,
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
        {
          $facet: {
            totalCount: [{ $count: 'count' }],
            paginatedResults: [
              { $skip: (page - 1) * limit },
              { $limit: limit },
            ],
          },
        },
        {
          $project: {
            allItemsCount: { $arrayElemAt: ['$totalCount.count', 0] },
            pageItemCount: { $size: '$paginatedResults' },
            results: '$paginatedResults',
          },
        },
        {
          $project: {
            allItemsCount: 1,
            pageItemCount: 1,
            'results._id': 1,
            'results.title': 1,
            'results.activityType': 1,
            'results.activityNote': 1,
            'results.experienceType': 1,
            'results.description': 1,
            'results.highLights': 1,
            'results.durationHour': 1,
            'results.durationMinute': 1,
            'results.languages': 1,
            'results.isFoodIncluded': 1,
            'results.includedFoods': 1,
            'results.isNonAlcoholicDrinkIncluded': 1,
            'results.isAlcoholicDrinkIncluded': 1,
            'results.includedAlcoholicDrinks': 1,
            'results.otherInclusion': 1,
            'results.notIncluded': 1,
            'results.whatToBring': 1,
            'results.notAllowed': 1,
            'results.policies': 1,
            'results.isSegmentBuilderEnabled': 1,
            'results.segments': 1,
            'results.slotCapacity': 1,
            'results.schedule': 1,
            'results.pricePerPerson': 1,
            'results.pricePerSlot': 1,
            'results.daysCanCancel': 1,
            'results.status': 1,
            'results.finishedSections': 1,
            'results.pricePerDates': 1,
            'results.host._id': 1,
            'results.host.email': 1,
            'results.host.role': 1,
            'results.host.guest._id': 1,
            'results.host.guest.firstName': 1,
            'results.host.guest.middleName': 1,
            'results.host.guest.lastName': 1,
            'results.host.guest.language': 1,
            'results.host.guest.currency': 1,
            'results.host.guest.address': 1,
            'results.meetingPoint': 1,
            'results.photos': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]

      const activities = await dbActivities.aggregate(pipeline)
      res.json(
        response.success({
          items: activities[0].results,
          pageItemCount: activities[0].pageItemCount || 0,
          allItemCount: activities[0].allItemsCount || 0,
        })
      )
    } else if (location && location !== 'any' && experienceTypes && experienceTypes !== 'any') {
      const normalizedLocation = String(location).toLowerCase()
      const typeArray = String(experienceTypes)
        .split(',')
        .map((item) => new RegExp(`^${item.trim()}$`, 'i'))
      query.experienceType = { $in: typeArray }
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: 'users',
            localField: 'host',
            foreignField: '_id',
            as: 'host',
          },
        },
        { $unwind: '$host' },
        {
          $lookup: {
            from: 'guests',
            localField: 'host.guest',
            foreignField: '_id',
            as: 'host.guest',
          },
        },
        { $unwind: '$host.guest' },
        {
          $lookup: {
            from: 'addresses',
            localField: 'host.guest.address',
            foreignField: '_id',
            as: 'host.guest.address',
          },
        },
        {
          $unwind: {
            path: '$host.guest.address',
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
          $match: {
            $expr: {
              $eq: [{ $toLower: '$meetingPoint.city' }, normalizedLocation],
            },
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
          $match: {
            $or: [
              {
                pricePerPerson: {
                  $gte: Number(priceFrom),
                  $lte: Number(priceTo),
                },
              },
              {
                pricePerSlot: {
                  $gte: Number(priceFrom),
                  $lte: Number(priceTo),
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
          },
        },
        {
          $addFields: {
            average: {
              $cond: {
                if: { $gt: [{ $size: '$reviews' }, 0] },
                then: { $avg: '$reviews.totalRates' },
                else: 0,
              },
            },
            reviewsCount: { $size: '$reviews' },
          },
        },
        ...(Number(starRating) > 0
          ? [
              {
                $match: {
                  average: {
                    $gte: Number(starRating),
                    $lt: Number(starRating) + 1,
                  },
                },
              },
            ]
          : []),
        {
          $addFields: {
            'schedule.monday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.monday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.monday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.tuesday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.tuesday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.tuesday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.wednesday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.wednesday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.wednesday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.thursday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.thursday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.thursday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.friday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.friday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.friday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.saturday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.saturday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.saturday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
            'schedule.sunday.slots': {
              $cond: {
                if: { $eq: ['$experienceType', 'Private'] },
                then: {
                  $filter: {
                    input: '$schedule.sunday.slots',
                    as: 'slot',
                    cond: { $not: { $in: ['$$slot._id', timeSlotIds] } },
                  },
                },
                else: {
                  $map: {
                    input: '$schedule.sunday.slots',
                    as: 'slot',
                    in: {
                      $mergeObjects: [
                        '$$slot',
                        {
                          slotIdsId: {
                            $cond: {
                              if: { $eq: ['$experienceType', 'Joiner'] },
                              then: {
                                $filter: {
                                  input: '$$slot.slotIdsId',
                                  as: 'slotId',
                                  cond: {
                                    $not: { $in: ['$$slotId._id', slotIdsId] },
                                  },
                                },
                              },
                              else: '$$slot.slotIdsId',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
        {
          $match: {
            $expr: {
              $and: [
                {
                  $cond: {
                    if: { $ne: [numberOfGuest, 'any'] },
                    then: {
                      $and: [
                        {
                          $gte: [
                            Number(numberOfGuest),
                            '$slotCapacity.minimum',
                          ],
                        },
                        {
                          $lte: [
                            Number(numberOfGuest),
                            '$slotCapacity.maximum',
                          ],
                        },
                      ],
                    },
                    else: true,
                  },
                },
                {
                  $cond: {
                    if: { $eq: ['$experienceType', 'Private'] },
                    then: {
                      $and: [
                        { $ne: [{ $size: '$schedule.monday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.tuesday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.wednesday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.thursday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.friday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.saturday.slots' }, 0] },
                        { $ne: [{ $size: '$schedule.sunday.slots' }, 0] },
                      ],
                    },
                    else: {
                      $and: [
                        {
                          $or: [
                            {
                              $ne: [
                                { $size: '$schedule.monday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.tuesday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                {
                                  $size: '$schedule.wednesday.slots.slotIdsId',
                                },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.thursday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.friday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.saturday.slots.slotIdsId' },
                                0,
                              ],
                            },
                            {
                              $ne: [
                                { $size: '$schedule.sunday.slots.slotIdsId' },
                                0,
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
        {
          $facet: {
            totalCount: [{ $count: 'count' }],
            paginatedResults: [
              { $skip: (page - 1) * limit },
              { $limit: limit },
            ],
          },
        },
        {
          $project: {
            allItemsCount: { $arrayElemAt: ['$totalCount.count', 0] },
            pageItemCount: { $size: '$paginatedResults' },
            results: '$paginatedResults',
          },
        },
        {
          $project: {
            allItemsCount: 1,
            pageItemCount: 1,
            'results._id': 1,
            'results.title': 1,
            'results.activityType': 1,
            'results.activityNote': 1,
            'results.experienceType': 1,
            'results.description': 1,
            'results.highLights': 1,
            'results.durationHour': 1,
            'results.durationMinute': 1,
            'results.languages': 1,
            'results.isFoodIncluded': 1,
            'results.includedFoods': 1,
            'results.isNonAlcoholicDrinkIncluded': 1,
            'results.isAlcoholicDrinkIncluded': 1,
            'results.includedAlcoholicDrinks': 1,
            'results.otherInclusion': 1,
            'results.notIncluded': 1,
            'results.whatToBring': 1,
            'results.notAllowed': 1,
            'results.policies': 1,
            'results.isSegmentBuilderEnabled': 1,
            'results.segments': 1,
            'results.slotCapacity': 1,
            'results.schedule': 1,
            'results.pricePerPerson': 1,
            'results.pricePerSlot': 1,
            'results.daysCanCancel': 1,
            'results.status': 1,
            'results.finishedSections': 1,
            'results.pricePerDates': 1,
            'results.host._id': 1,
            'results.host.email': 1,
            'results.host.role': 1,
            'results.host.guest._id': 1,
            'results.host.guest.firstName': 1,
            'results.host.guest.middleName': 1,
            'results.host.guest.lastName': 1,
            'results.host.guest.language': 1,
            'results.host.guest.currency': 1,
            'results.host.guest.address': 1,
            'results.meetingPoint': 1,
            'results.photos': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]
      const activities = await dbActivities.aggregate(pipeline)
      res.json(
        response.success({
          items: activities[0].results,
          pageItemCount: activities[0].pageItemCount || 0,
          allItemCount: activities[0].allItemsCount || 0,
        })
      )
    } else {
      res.json(
        response.success({ items: null, pageItemCount: 0, allItemCount: 0 })
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

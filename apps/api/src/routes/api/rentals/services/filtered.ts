import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { parseToUTCDate } from '@/common/helpers/dateToUTC'
import { ResponseService } from '@/common/service/response'
import { dbLocations, dbRentals, dbReservations } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()

export const getFilteredRentals = async (req: Request, res: Response) => {
  let startDate, endDate
  let {
    location,
    type,
    transmission,
    seats,
    priceFrom,
    priceTo,
    stars,
    pickUpDate = 'any',
    dropOffDate = 'any',
  } = req.query
  const { page, limit } = req.pagination || { page: 1, limit: 15 }
  try {
    const query: any = { deletedAt: null, status: 'Live' }
    if (!priceFrom || priceFrom === 'any') {
      priceFrom = '0'
    }
    if (!priceTo || priceTo === 'any') {
      priceTo = '9999999'
    }
    if (
      transmission &&
      typeof transmission === 'string' &&
      transmission !== 'any'
    ) {
      const newTransmission = transmission.split(',')
      const transmissionArray = newTransmission
        .map((t: string) => t.trim())
        .filter((t: string) => t !== '')
        .map((t: string) => new RegExp(`^${t}$`, 'i'))
      query.transmission = {
        $in: transmissionArray,
      }
    }
    if (!stars || stars === 'any') {
      stars = '0'
    }
    const startDate =
      pickUpDate === 'any' ? 'any' : parseToUTCDate(pickUpDate as string)

    const endDate =
      dropOffDate === 'any' ? 'any' : parseToUTCDate(dropOffDate as string)

    const getReservations = await dbReservations.aggregate([
      {
        $match: {
          deletedAt: null,
          status: { $ne: 'Cancelled' },
          rentalIds: { $ne: null },
          $expr: {
            $and: [
              {
                $or: [
                  { $eq: [startDate, 'any'] }, // Ignore date condition if "any"
                  { $lte: ['$startDate', endDate] }, // Reservation starts on or before query's endDate
                ],
              },
              {
                $or: [
                  { $eq: [endDate, 'any'] }, // Ignore date condition if "any"
                  { $gte: ['$endDate', startDate] }, // Reservation ends on or after query's startDate
                ],
              },
            ],
          },
        },
      },
      {
        $match: {
          'rentalIds.qtyIdsId': { $exists: true }, // Only include documents with a `qtyIdsId`
        },
      },
      {
        $group: {
          _id: null,
          qtyIdsArray: { $push: '$rentalIds.qtyIdsId' },
        },
      },
      {
        $unwind: {
          path: '$qtyIdsArray',
        },
      },
      {
        $project: {
          _id: 0,
          qtyIdsArray: 1,
        },
      },
    ])
    const qtyIdsArray =
      getReservations.length > 0
        ? getReservations.map((item: any) => item.qtyIdsArray)
        : []
    if ((!location || location === 'any') && (!type || type === 'any')) {
      const pipeline = [
        {
          $match: query,
        },
        {
          $lookup: {
            from: 'rentaldetails',
            localField: 'details',
            foreignField: '_id',
            as: 'details',
          },
        },
        {
          $unwind: '$details',
        },
        {
          $match: {
            $expr: {
              $or: [
                { $eq: [seats, 'any'] },
                { $eq: ['$details.seatingCapacity', Number(seats)] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'host',
            foreignField: '_id',
            as: 'host',
          },
        },
        {
          $unwind: '$host',
        },
        {
          $lookup: {
            from: 'guests',
            localField: 'host.guest',
            foreignField: '_id',
            as: 'host.guest',
          },
        },
        {
          $unwind: '$host.guest',
        },
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
          $match: {
            $or: [
              {
                $and: [{ priceFrom: 'any' }, { priceTo: 'any' }],
              },

              {
                $and: [
                  { priceFrom: 'any' },
                  { $expr: { $lte: ['$pricing.dayRate', Number(priceTo)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },

              {
                $and: [
                  { priceTo: 'any' },
                  { $expr: { $gte: ['$pricing.dayRate', Number(priceFrom)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },

              {
                $and: [
                  { priceFrom: { $ne: 'any' } },
                  { priceTo: { $ne: 'any' } },
                  { $expr: { $gte: ['$pricing.dayRate', Number(priceFrom)] } },
                  { $expr: { $lte: ['$pricing.dayRate', Number(priceTo)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },
            ],
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
        ...(Number(stars) > 0
          ? [
              {
                $match: {
                  average: {
                    $gte: Number(stars),
                    $lt: Number(stars) + 1,
                  },
                },
              },
            ]
          : []),
        {
          $addFields: {
            qtyIds: {
              $filter: {
                input: '$qtyIds',
                as: 'item',
                cond: { $not: { $in: ['$$item._id', qtyIdsArray] } },
              },
            },
          },
        },
        {
          $match: {
            qtyIds: { $ne: [] },
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
            'results.category': 1,
            'results.make': 1,
            'results.modelBadge': 1,
            'results.bodyType': 1,
            'results.fuel': 1,
            'results.transmission': 1,
            'results.year': 1,
            'results.qty': 1,
            'results.finishedSections': 1,
            'results.qtyIds': 1,
            'results.rentalNote': 1,
            'results.status': 1,
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
            'results.details': 1,
            'results.addOns': 1,
            'results.pricing': 1,
            'results.photos': 1,
            'results.location': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]
      const rentals = await dbRentals.aggregate(pipeline)
      res.json(
        response.success({
          items: rentals[0].results,
          pageItemCount: rentals[0].pageItemCount || 0,
          allItemCount: rentals[0].allItemsCount || 0,
        })
      )
    } else if (location && location !== 'any' && (!type || type === 'any')) {
      const normalizedLocation = String(location).toLowerCase()
      const pipeline = [
        {
          $match: query,
        },
        {
          $lookup: {
            from: 'rentaldetails',
            localField: 'details',
            foreignField: '_id',
            as: 'details',
          },
        },
        {
          $unwind: '$details',
        },
        {
          $match: {
            $expr: {
              $or: [
                { $eq: [seats, 'any'] },
                { $eq: ['$details.seatingCapacity', Number(seats)] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'host',
            foreignField: '_id',
            as: 'host',
          },
        },
        {
          $unwind: '$host',
        },
        {
          $lookup: {
            from: 'guests',
            localField: 'host.guest',
            foreignField: '_id',
            as: 'host.guest',
          },
        },
        {
          $unwind: '$host.guest',
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
          $match: {
            $or: [
              {
                $and: [{ priceFrom: 'any' }, { priceTo: 'any' }],
              },

              {
                $and: [
                  { priceFrom: 'any' },
                  { $expr: { $lte: ['$pricing.dayRate', Number(priceTo)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },
              {
                $and: [
                  { priceTo: 'any' },
                  { $expr: { $gte: ['$pricing.dayRate', Number(priceFrom)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },
              {
                $and: [
                  { priceFrom: { $ne: 'any' } },
                  { priceTo: { $ne: 'any' } },
                  { $expr: { $gte: ['$pricing.dayRate', Number(priceFrom)] } },
                  { $expr: { $lte: ['$pricing.dayRate', Number(priceTo)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },
            ],
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
          $match: {
            $expr: {
              $eq: [{ $toLower: '$location.city' }, normalizedLocation],
            },
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
        ...(Number(stars) > 0
          ? [
              {
                $match: {
                  average: {
                    $gte: Number(stars),
                    $lt: Number(stars) + 1,
                  },
                },
              },
            ]
          : []),
        {
          $addFields: {
            qtyIds: {
              $filter: {
                input: '$qtyIds',
                as: 'item',
                cond: { $not: { $in: ['$$item._id', qtyIdsArray] } },
              },
            },
          },
        },
        {
          $match: {
            qtyIds: { $ne: [] },
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
            'results.category': 1,
            'results.make': 1,
            'results.modelBadge': 1,
            'results.bodyType': 1,
            'results.fuel': 1,
            'results.transmission': 1,
            'results.year': 1,
            'results.qty': 1,
            'results.finishedSections': 1,
            'results.qtyIds': 1,
            'results.rentalNote': 1,
            'results.status': 1,
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
            'results.details': 1,
            'results.addOns': 1,
            'results.pricing': 1,
            'results.photos': 1,
            'results.location': 1,
            'results.average': 1,
            'results.reviewsCount': 0,
          },
        },
      ]
      const rentals = await dbRentals.aggregate(pipeline)

      res.json(
        response.success({
          items: rentals[0].results,
          pageItemCount: rentals[0].pageItemCount || 0,
          allItemCount: rentals[0].allItemsCount || 0,
        })
      )
    } else if ((!location || location === 'any') && (type || type !== 'any')) {
      const typeArray = String(type)
        .split(',')
        .map((item) => new RegExp(`^${item.trim()}$`, 'i'))
      query.category = { $in: typeArray }
      const pipeline = [
        {
          $match: query,
        },
        {
          $lookup: {
            from: 'rentaldetails',
            localField: 'details',
            foreignField: '_id',
            as: 'details',
          },
        },
        {
          $unwind: '$details',
        },
        {
          $match: {
            $expr: {
              $or: [
                { $eq: [seats, 'any'] },
                { $eq: ['$details.seatingCapacity', Number(seats)] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'host',
            foreignField: '_id',
            as: 'host',
          },
        },
        {
          $unwind: '$host',
        },
        {
          $lookup: {
            from: 'guests',
            localField: 'host.guest',
            foreignField: '_id',
            as: 'host.guest',
          },
        },
        {
          $unwind: '$host.guest',
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
          $match: {
            $or: [
              {
                $and: [{ priceFrom: 'any' }, { priceTo: 'any' }],
              },
              {
                $and: [
                  { priceFrom: 'any' },
                  { $expr: { $lte: ['$pricing.dayRate', Number(priceTo)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },
              {
                $and: [
                  { priceTo: 'any' },
                  { $expr: { $gte: ['$pricing.dayRate', Number(priceFrom)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },
              {
                $and: [
                  { priceFrom: { $ne: 'any' } },
                  { priceTo: { $ne: 'any' } },
                  { $expr: { $gte: ['$pricing.dayRate', Number(priceFrom)] } },
                  { $expr: { $lte: ['$pricing.dayRate', Number(priceTo)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },
            ],
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
        ...(Number(stars) > 0
          ? [
              {
                $match: {
                  average: {
                    $gte: Number(stars),
                    $lt: Number(stars) + 1,
                  },
                },
              },
            ]
          : []),
        {
          $addFields: {
            qtyIds: {
              $filter: {
                input: '$qtyIds',
                as: 'item',
                cond: { $not: { $in: ['$$item._id', qtyIdsArray] } },
              },
            },
          },
        },
        {
          $match: {
            qtyIds: { $ne: [] },
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
            'results.category': 1,
            'results.make': 1,
            'results.modelBadge': 1,
            'results.bodyType': 1,
            'results.fuel': 1,
            'results.transmission': 1,
            'results.year': 1,
            'results.qty': 1,
            'results.finishedSections': 1,
            'results.qtyIds': 1,
            'results.rentalNote': 1,
            'results.status': 1,
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
            'results.details': 1,
            'results.addOns': 1,
            'results.pricing': 1,
            'results.photos': 1,
            'results.location': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]
      const rentals = await dbRentals.aggregate(pipeline)

      res.json(
        response.success({
          items: rentals[0].results,
          pageItemCount: rentals[0].pageItemCount || 0,
          allItemCount: rentals[0].allItemsCount || 0,
        })
      )
    } else if (location && location !== 'any' && type && type !== 'any') {
      const typeArray = String(type)
        .split(',')
        .map((item) => new RegExp(`^${item.trim()}$`, 'i'))
      query.category = { $in: typeArray }
      const normalizedLocation = String(location).toLowerCase()
      const pipeline = [
        {
          $match: query,
        },
        {
          $lookup: {
            from: 'rentaldetails',
            localField: 'details',
            foreignField: '_id',
            as: 'details',
          },
        },
        {
          $unwind: '$details',
        },
        {
          $match: {
            $expr: {
              $or: [
                { $eq: [seats, 'any'] },
                { $eq: ['$details.seatingCapacity', Number(seats)] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'host',
            foreignField: '_id',
            as: 'host',
          },
        },
        {
          $unwind: '$host',
        },
        {
          $lookup: {
            from: 'guests',
            localField: 'host.guest',
            foreignField: '_id',
            as: 'host.guest',
          },
        },
        {
          $unwind: '$host.guest',
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
          $match: {
            $or: [
              {
                $and: [{ priceFrom: 'any' }, { priceTo: 'any' }],
              },
              {
                $and: [
                  { priceFrom: 'any' },
                  { $expr: { $lte: ['$pricing.dayRate', Number(priceTo)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },
              {
                $and: [
                  { priceTo: 'any' },
                  { $expr: { $gte: ['$pricing.dayRate', Number(priceFrom)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },
              {
                $and: [
                  { priceFrom: { $ne: 'any' } },
                  { priceTo: { $ne: 'any' } },
                  { $expr: { $gte: ['$pricing.dayRate', Number(priceFrom)] } },
                  { $expr: { $lte: ['$pricing.dayRate', Number(priceTo)] } },
                  { $expr: { $ne: ['$pricing.dayRate', null] } },
                ],
              },
            ],
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
          $match: {
            $expr: {
              $eq: [{ $toLower: '$location.city' }, normalizedLocation],
            },
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
        ...(Number(stars) > 0
          ? [
              {
                $match: {
                  average: {
                    $gte: Number(stars),
                    $lt: Number(stars) + 1,
                  },
                },
              },
            ]
          : []),
        {
          $addFields: {
            qtyIds: {
              $filter: {
                input: '$qtyIds',
                as: 'item',
                cond: { $not: { $in: ['$$item._id', qtyIdsArray] } },
              },
            },
          },
        },
        {
          $match: {
            qtyIds: { $ne: [] },
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
            'results.category': 1,
            'results.make': 1,
            'results.modelBadge': 1,
            'results.bodyType': 1,
            'results.fuel': 1,
            'results.transmission': 1,
            'results.year': 1,
            'results.qty': 1,
            'results.finishedSections': 1,
            'results.qtyIds': 1,
            'results.rentalNote': 1,
            'results.status': 1,
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
            'results.details': 1,
            'results.addOns': 1,
            'results.pricing': 1,
            'results.photos': 1,
            'results.location': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]
      const rentals = await dbRentals.aggregate(pipeline)

      res.json(
        response.success({
          items: rentals[0].results,
          pageItemCount: rentals[0].pageItemCount || 0,
          allItemCount: rentals[0].allItemsCount || 0,
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

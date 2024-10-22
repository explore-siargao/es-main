import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbLocations, dbRentals } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()

export const getFilteredRentals = async (req: Request, res: Response) => {
  let { location, type, transmission, seats, priceFrom, priceTo } = req.query
  const { page, limit } = req.pagination || { page: 1, limit: 15 }
  try {
    const query: any = { deletedAt: null, status: 'Live' }
    if (!priceFrom || priceFrom === 'any') {
      priceFrom = '0'
    }
    if (!priceTo || priceTo === 'any') {
      priceTo = '9999999'
    }
    if ((!location || location === 'any') && (!type || type === 'any')) {
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
    } else if (location && (!type || type === 'any')) {
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
    } else if ((!location || location === 'any') && type) {
      query.category = new RegExp(`^${type}$`, 'i')
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
    } else if (location && type) {
      query.category = new RegExp(`^${type}$`, 'i')
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

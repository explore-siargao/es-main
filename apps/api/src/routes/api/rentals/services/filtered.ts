import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { convertPrice } from '@/common/helpers/convert-price'
import { parseToUTCDate } from '@/common/helpers/dateToUTC'
import { ResponseService } from '@/common/service/response'
import { T_Rental_Filtered, T_Rentals_Search, Z_Rental_Filtered, Z_Rental_Filtered_Result, Z_Rentals_Search } from '@repo/contract-2/search-filters'
import { T_Rental_Price } from '@repo/contract-2/rentals'
import { dbRentals, dbReservations } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()

export const getFilteredRentals = async (req: Request, res: Response) => {
  const preferredCurrency = res.locals.currency.preferred
  const conversionRates = res.locals.currency.conversionRates
  let startDate, endDate;
  let filterRentals:T_Rental_Filtered[]
  let {
    location,
    vehicleTypes,
    transmissionTypes,
    seatCount,
    priceFrom,
    priceTo,
    starRating,
    pickUpDate = 'any',
    dropOffDate = 'any',
  } = req.query
  const { page, limit } = req.pagination || { page: 1, limit: 15 }
  const validateRentalSearch = Z_Rentals_Search.safeParse({
    page:page,
    location:location,
    vehicleTypes:vehicleTypes,
    transmissionTypes:transmissionTypes,
    priceFrom:priceFrom,
    priceTo:priceTo,
    seatCount:seatCount,
    starRating:starRating,
    pickUpDate:pickUpDate,
    dropOffDate:dropOffDate
  })
  if(validateRentalSearch.success){
  try {
    const query: any = { deletedAt: null, status: 'Live' }
    if (!priceFrom || priceFrom === 'any') {
      priceFrom = '0'
    }
    if (!priceTo || priceTo === 'any') {
      priceTo = '9999999'
    }
    if (
      transmissionTypes &&
      typeof transmissionTypes === 'string' &&
      transmissionTypes !== 'any'
    ) {
      const newTransmission = transmissionTypes.split(',')
      const transmissionArray = newTransmission
        .map((t: string) => t.trim())
        .filter((t: string) => t !== '')
        .map((t: string) => new RegExp(`^${t}$`, 'i'))
      query.transmissionTypes = {
        $in: transmissionArray,
      }
    }
    if (!starRating || starRating === 'any') {
      starRating = '0'
    }
    const startDate =
      pickUpDate === 'any' ? 'any' : parseToUTCDate(pickUpDate as string)

    const endDate =
      dropOffDate === 'any' ? 'any' : parseToUTCDate(dropOffDate as string)

    const getReservations = await dbReservations.aggregate([
      {
        $match: {
          deletedAt: null,
          $and: [
            { status: { $ne: 'Cancelled' } },
            { status: { $ne: 'For-Payment' } },
          ],
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
    if (
      (!location || location === 'any') &&
      (!vehicleTypes || vehicleTypes === 'any')
    ) {
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
                { $eq: [seatCount, 'any'] },
                { $eq: ['$details.seatingCapacity', Number(seatCount)] },
              ],
            },
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
            'results.fuel': 1,
            'results.transmission': 1,
            'results.year': 1,
            'results.pricing': 1,
            'results.photos': 1,
            'results.location': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]
      const rentals = await dbRentals.aggregate(pipeline)
      const changePrices = rentals[0].results.map(
        (item: T_Rental_Filtered) => ({
          ...item,
          pricing: {
            ...item.pricing,
            dayRate: convertPrice(
              Number(item.pricing?.dayRate),
              preferredCurrency,
              conversionRates
            ),
            requiredDeposit: convertPrice(
              Number(item.pricing?.requiredDeposit),
              preferredCurrency,
              conversionRates
            ),
            adminBookingCharge: !Number(item.pricing?.adminBookingCharge)
              ? 0
              : convertPrice(
                  Number(item.pricing?.adminBookingCharge),
                  preferredCurrency,
                  conversionRates
                ),
          },
        })
      )
      filterRentals = changePrices
      const validFilterRentals = Z_Rental_Filtered_Result.safeParse(filterRentals)
      if(validFilterRentals.success){
      res.json(
        response.success({
          items: validFilterRentals.data,
          pageItemCount: rentals[0].pageItemCount || 0,
          allItemCount: rentals[0].allItemsCount || 0,
        })
      )
    }else{
      res.json(response.error({items:[], message:"Invalid data exists"}))  
    }
    } else if (
      location &&
      location !== 'any' &&
      (!vehicleTypes || vehicleTypes === 'any')
    ) {
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
                { $eq: [seatCount, 'any'] },
                { $eq: ['$details.seatingCapacity', Number(seatCount)] },
              ],
            },
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
            'results.fuel': 1,
            'results.transmission': 1,
            'results.year': 1,
            'results.pricing': 1,
            'results.photos': 1,
            'results.location': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]
      const rentals = await dbRentals.aggregate(pipeline)
      const changePrices = rentals[0].results.map(
        (item: T_Rental_Filtered) => ({
          ...item,
          pricing: {
            ...item.pricing,
            dayRate: convertPrice(
              Number(item.pricing?.dayRate),
              preferredCurrency,
              conversionRates
            ),
            requiredDeposit: convertPrice(
              Number(item.pricing?.requiredDeposit),
              preferredCurrency,
              conversionRates
            ),
            adminBookingCharge: !Number(item.pricing?.adminBookingCharge)
              ? 0
              : convertPrice(
                  Number(item.pricing?.adminBookingCharge),
                  preferredCurrency,
                  conversionRates
                ),
          },
        })
      )
      filterRentals = changePrices
      const validFilterRentals = Z_Rental_Filtered_Result.safeParse(filterRentals)
      if(validFilterRentals.success){
      res.json(
        response.success({
          items: validFilterRentals.data,
          pageItemCount: rentals[0].pageItemCount || 0,
          allItemCount: rentals[0].allItemsCount || 0,
        })
      )
    }else{
      res.json(response.error({items:[], message:"Invalid data exists"}))
    }
    } else if (
      (!location || location === 'any') &&
      (vehicleTypes || vehicleTypes !== 'any')
    ) {
      const typeArray = String(vehicleTypes)
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
                { $eq: [seatCount, 'any'] },
                { $eq: ['$details.seatingCapacity', Number(seatCount)] },
              ],
            },
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
            'results.fuel': 1,
            'results.transmission': 1,
            'results.year': 1,
            'results.pricing': 1,
            'results.photos': 1,
            'results.location': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]
      const rentals = await dbRentals.aggregate(pipeline)
      const changePrices = rentals[0].results.map(
        (item: T_Rental_Filtered) => ({
          ...item,
          pricing: {
            ...item.pricing,
            dayRate: convertPrice(
              Number(item.pricing?.dayRate),
              preferredCurrency,
              conversionRates
            ),
            requiredDeposit: convertPrice(
              Number(item.pricing?.requiredDeposit),
              preferredCurrency,
              conversionRates
            ),
            adminBookingCharge: !Number(item.pricing?.adminBookingCharge)
              ? 0
              : convertPrice(
                  Number(item.pricing?.adminBookingCharge),
                  preferredCurrency,
                  conversionRates
                ),
          },
        })
      )
      filterRentals = changePrices
      const validFilterRentals = Z_Rental_Filtered_Result.safeParse(filterRentals)
      if(validFilterRentals.success){
      res.json(
        response.success({
          items: validFilterRentals.data,
          pageItemCount: rentals[0].pageItemCount || 0,
          allItemCount: rentals[0].allItemsCount || 0,
        })
      )
    }else{
      res.json(response.error({items:[], message:"Invalid data exists"}))
    }
    } else if (
      location &&
      location !== 'any' &&
      vehicleTypes &&
      vehicleTypes !== 'any'
    ) {
      const typeArray = String(vehicleTypes)
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
                { $eq: [seatCount, 'any'] },
                { $eq: ['$details.seatingCapacity', Number(seatCount)] },
              ],
            },
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
            'results.fuel': 1,
            'results.transmission': 1,
            'results.year': 1,
            'results.pricing': 1,
            'results.photos': 1,
            'results.location': 1,
            'results.average': 1,
            'results.reviewsCount': 1,
          },
        },
      ]
      const rentals = await dbRentals.aggregate(pipeline)
      const changePrices = rentals[0].results.map(
        (item: T_Rental_Filtered) => ({
          ...item,
          pricing: {
            ...item.pricing,
            dayRate: convertPrice(
              Number(item.pricing?.dayRate),
              preferredCurrency,
              conversionRates
            ),
            requiredDeposit: convertPrice(
              Number(item.pricing?.requiredDeposit),
              preferredCurrency,
              conversionRates
            ),
            adminBookingCharge: !Number(item.pricing?.adminBookingCharge)
              ? 0
              : convertPrice(
                  Number(item.pricing?.adminBookingCharge),
                  preferredCurrency,
                  conversionRates
                ),
          },
        })
      )
      filterRentals = changePrices
      const validFilterRentals = Z_Rental_Filtered_Result.safeParse(filterRentals)
      if(validFilterRentals.success){
      res.json(
        response.success({
          items: validFilterRentals.data,
          pageItemCount: rentals[0].pageItemCount || 0,
          allItemCount: rentals[0].allItemsCount || 0,
        })
      )
    }else{
      res.json(response.error({items:[], message:"Invalid data exists"}))
    }
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
}else{
  res.json(response.error({items:[],message:"Invalid search parameters"}))
}
}

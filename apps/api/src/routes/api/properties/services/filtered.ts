import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { convertPrice } from '@/common/helpers/convert-price'
import { parseToUTCDate } from '@/common/helpers/dateToUTC'
import { ResponseService } from '@/common/service/response'
import { T_BookableUnitType, T_Photo } from '@repo/contract'
import { T_Property } from '@repo/contract-2/property'
import { dbProperties, dbReservations, dbUnitPrices } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getFilteredProperties = async (req: Request, res: Response) => {
  const preferredCurrency = res.locals.currency.preferred
  const conversionRates = res.locals.currency.conversionRates
  let {
    location,
    propertyTypes,
    facilities,
    amenities,
    priceFrom,
    priceTo,
    bedCount,
    bathroomCount,
    bedroomCount,
    starRating,
    checkIn = 'any',
    checkOut = 'any',
    numberOfGuest = 'any',
  } = req.query
  const { page, limit } = req.pagination || { page: 1, limit: 10 }
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const query: any = {
    bookableUnits: { $exists: true, $not: { $size: 0 } },
    deletedAt: null,
  }
  let facilitiesArray: string[] | string = []
  let amenitiesArray: string[] | string = []
  if (facilities && facilities !== 'any') {
    facilitiesArray = String(facilities)
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t !== '')
  }
  if (amenities && amenities !== 'any') {
    amenitiesArray = String(amenities)
      .split(',')
      .map((t: string) => t.trim())
      .filter((t: string) => t !== '')
  }
  if (!priceFrom || priceFrom === 'any') {
    priceFrom = '0'
  }
  if (!priceTo || priceTo === 'any') {
    const highestPrice = await dbUnitPrices.aggregate([
      {
        $group: {
          _id: null,
          highestBaseRate: { $max: '$baseRate' },
        },
      },
    ])
    priceTo = String(highestPrice[0].highestBaseRate)
  }
  if (!bedCount) {
    bedCount = 'any'
  }
  if (!bedroomCount) {
    bedroomCount = 'any'
  }
  if (!bathroomCount) {
    bathroomCount = 'any'
  }
  try {
    const startDate =
      checkIn === 'any' ? 'any' : parseToUTCDate(checkIn as string)
    const endDate =
      checkOut === 'any' ? 'any' : parseToUTCDate(checkOut as string)
    const guestNumber = numberOfGuest === 'any' ? 0 : Number(numberOfGuest)
    const getUnitReservations = await dbReservations.aggregate([
      {
        $match: {
          deletedAt: null,
          propertyIds: { $ne: null },
          status: { $ne: 'Cancelled' },
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
        $group: {
          _id: null,
          unitId: { $push: '$propertyIds.unitId' },
        },
      },
      {
        $unwind: {
          path: '$unitId',
        },
      },
      {
        $project: {
          _id: 0,
          unitId: 1,
        },
      },
    ])
    const unitIds =
      getUnitReservations.length > 0
        ? getUnitReservations.map((item: any) => item.unitId)
        : []
    if (
      (!location || location === 'any') &&
      (!propertyTypes || propertyTypes === 'any')
    ) {
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: 'users',
            localField: 'offerBy',
            foreignField: '_id',
            as: 'offerBy',
          },
        },
        { $unwind: { path: '$offerBy', preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: 'guests',
            localField: 'offerBy.guest',
            foreignField: '_id',
            as: 'offerBy.guest',
          },
        },
        {
          $unwind: { path: '$offerBy.guest', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'addresses',
            localField: 'offerBy.guest.address',
            foreignField: '_id',
            as: 'offerBy.guest.address',
          },
        },
        {
          $unwind: {
            path: '$offerBy.guest.address',
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
          },
        },
        {
          $addFields: {
            facilities: {
              $filter: {
                input: '$facilities',
                as: 'facility',
                cond: { $eq: ['$$facility.isSelected', true] }, // Only include facilities where isSelected is true
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { 'facilities.facility': { $exists: true } }, // Allow documents with facilities
              { $expr: { $eq: [facilitiesArray.length, 0] } }, // Ignore match if facilitiesArray is empty
            ],
            ...(facilitiesArray.length > 0 && facilitiesArray[0] !== 'any'
              ? {
                  'facilities.facility': {
                    $in: facilitiesArray.map(
                      (facility) => new RegExp(`^${facility}$`, 'i')
                    ),
                  },
                }
              : {}),
          },
        },
        {
          $lookup: {
            from: 'policies',
            localField: 'policies',
            foreignField: '_id',
            as: 'policies',
          },
        },
        {
          $addFields: {
            policies: {
              $filter: {
                input: '$policies',
                as: 'policy',
                cond: { $eq: ['$$policy.isSelected', true] },
              },
            },
          },
        },
        {
          $lookup: {
            from: 'bookableunittypes',
            localField: 'bookableUnits',
            foreignField: '_id',
            as: 'bookableUnits',
            pipeline: [
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
                      as: 'qty',
                      cond: { $not: { $in: ['$$qty._id', unitIds] } },
                    },
                  },
                },
              },
              {
                $match: {
                  qtyIds: { $ne: [] },
                  maxGuests: { $gte: guestNumber },
                },
              },
              {
                $lookup: {
                  from: 'unitprices', // The collection where price details are stored
                  localField: 'pricePerDates.price', // Path to the price IDs within pricePerDates
                  foreignField: '_id', // The field in rentalrates matching the price IDs
                  as: 'priceDetails', // Temporary field to store the lookup result
                },
              },
              {
                $addFields: {
                  pricePerDates: {
                    $map: {
                      input: '$pricePerDates',
                      as: 'dateEntry',
                      in: {
                        $mergeObjects: [
                          '$$dateEntry', // Original data from pricePerDates
                          {
                            price: {
                              $arrayElemAt: [
                                {
                                  $filter: {
                                    input: '$priceDetails',
                                    as: 'priceDetail',
                                    cond: {
                                      $eq: [
                                        '$$priceDetail._id',
                                        '$$dateEntry.price',
                                      ],
                                    },
                                  },
                                },
                                0,
                              ],
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                $project: {
                  priceDetails: 0, // Remove the temporary priceDetails field
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'unitprices',
            localField: 'bookableUnits.unitPrice',
            foreignField: '_id',
            as: 'unitPrice',
          },
        },
        {
          $lookup: {
            from: 'amenities',
            localField: 'bookableUnits.amenities',
            foreignField: '_id',
            as: 'amenities',
          },
        },
        {
          $lookup: {
            from: 'photos',
            localField: 'bookableUnits.photos',
            foreignField: '_id',
            as: 'photos',
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $map: {
                input: '$bookableUnits',
                as: 'unit',
                in: {
                  $mergeObjects: [
                    '$$unit',
                    {
                      unitPrice: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$unitPrice',
                              as: 'price',
                              cond: {
                                $eq: ['$$price._id', '$$unit.unitPrice'],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    {
                      amenities: {
                        $filter: {
                          input: '$amenities', // This is the lookup result for amenities
                          as: 'amenity',
                          cond: {
                            $and: [
                              { $in: ['$$amenity._id', '$$unit.amenities'] },
                              { $eq: ['$$amenity.isSelected', true] },
                            ],
                          },
                        },
                      },
                    },
                    {
                      photos: {
                        $filter: {
                          input: '$photos',
                          as: 'photo',
                          cond: { $in: ['$$photo._id', '$$unit.photos'] },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $cond: {
                if: { $ne: [amenities, 'any'] }, // Check if the amenities variable is not "any"
                then: {
                  $filter: {
                    input: '$bookableUnits',
                    as: 'unit',
                    cond: {
                      $gt: [
                        {
                          $size: {
                            $filter: {
                              input: '$$unit.amenities',
                              as: 'amenity',
                              cond: {
                                $or: amenitiesArray.map((am) => ({
                                  $regexMatch: {
                                    input: '$$amenity.amenity',
                                    regex: new RegExp(`^${am}$`, 'i'), // Regex for case-insensitive match
                                  },
                                })),
                              },
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                },
                else: '$bookableUnits',
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { $expr: { $eq: [amenities, 'any'] } }, // Skip empty check if the amenities variable is "any"
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $filter: {
                input: '$bookableUnits',
                as: 'unit',
                cond: {
                  $or: [
                    {
                      $and: [
                        {
                          $gte: [
                            '$$unit.unitPrice.baseRate',
                            {
                              $cond: [
                                { $eq: [priceFrom, 'any'] },
                                0,
                                Number(priceFrom),
                              ],
                            },
                          ],
                        },
                        {
                          $lte: [
                            '$$unit.unitPrice.baseRate',
                            {
                              $cond: [
                                { $eq: [priceTo, 'any'] },
                                Infinity,
                                Number(priceTo),
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $and: [
                        { $eq: [priceFrom, 'any'] }, // Ignore price filtering if priceFrom is "any"
                        { $eq: [priceTo, 'any'] },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $filter: {
                input: '$bookableUnits',
                as: 'unit',
                cond: {
                  $or: [
                    { $eq: ['$$unit.category', 'Bed'] }, // Allow "Beds" category units
                    {
                      $and: [
                        {
                          $or: [
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Room'] },
                                {
                                  $gte: [
                                    {
                                      $reduce: {
                                        input: '$$unit.bedRooms',
                                        initialValue: 0,
                                        in: {
                                          $add: [
                                            '$$value', // Accumulated value
                                            {
                                              $reduce: {
                                                input: '$$this.beds', // Access beds array in each bedRoom
                                                initialValue: 0,
                                                in: {
                                                  $add: [
                                                    '$$value',
                                                    '$$this.qty',
                                                  ],
                                                },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                    Number(bedCount), // Compare total qty to `beds` parameter
                                  ],
                                },
                              ],
                            },
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Whole-Place'] },
                                {
                                  $gte: [
                                    { $size: '$$unit.bedRooms' },
                                    Number(bedroomCount),
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          $or: [
                            { $eq: [bathroomCount, 'any'] }, // Ignore if bathrooms is "any"
                            {
                              $gte: [
                                { $toInt: '$$unit.numBathRooms' }, // Convert to number
                                Number(bathroomCount), // Compare to req.params.bathrooms
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $facet: {
            totalCount: [{ $count: 'count' }],
            paginatedResults: [],
          },
        },
        {
          $project: {
            results: '$paginatedResults',
          },
        },
        {
          $project: {
            'results._id': 1,
            'results.status': 1,
            'results.finishedSection': 1,
            'results.title': 1,
            'results.description': 1,
            'results.location': 1,
            'results.currency': 1,
            'results.primaryLanguage': 1,
            'results.phone': 1,
            'results.email': 1,
            'results.checkInTime': 1,
            'results.checkOutTime': 1,
            'results.isLateCheckOutAllowed': 1,
            'results.lateCheckOutType': 1,
            'results.lateCheckOutValue': 1,
            'results.termsAndConditions': 1,
            'results.taxId': 1,
            'results.taxId2': 1,
            'results.companyLegalName': 1,
            'results.type': 1,
            'results.wholeplaceType': 1,
            'results.facilities._id': 1,
            'results.facilities.category': 1,
            'results.facilities.facility': 1,
            'results.policies._id': 1,
            'results.policies.category': 1,
            'results.policies.policy': 1,
            'results.policies.reason': 1,
            'results.bookableUnits._id': 1,
            'results.bookableUnits.category': 1,
            'results.bookableUnits.title': 1,
            'results.bookableUnits.subtitle': 1,
            'results.bookableUnits.numBathRooms': 1,
            'results.bookableUnits.totalSize': 1,
            'results.bookableUnits.unitPrice': 1,
            'results.bookableUnits.amenities._id': 1,
            'results.bookableUnits.amenities.category': 1,
            'results.bookableUnits.amenities.amenity': 1,
            'results.bookableUnits.photos': 1,
            'results.bookableUnits.isPrivate': 1,
            'results.bookableUnits.maxGuests': 1,
            'results.bookableUnits.adultsIncluded': 1,
            'results.bookableUnits.childrenIncluded': 1,
            'results.bookableUnits.bedRooms': 1,
            'results.bookableUnits.isMultiRoomUnit': 1,
            'results.bookableUnits.qty': 1,
            'results.bookableUnits.livingRooms': 1,
            'results.bookableUnits.bedroomStudio': 1,
            'results.bookableUnits.isHaveSharedAmenities': 1,
            'results.bookableUnits.isHaveSharedBathRoom': 1,
            'results.bookableUnits.pricePerDates': 1,
            'results.bookableUnits.qtyIds': 1,
            'results.bookableUnits.average': 1,
            'results.bookableUnits.reviewsCount': 1,
            'results.offerBy._id': 1,
            'results.offerBy.email': 1,
            'results.offerBy.role': 1,
            'results.offerBy.guest._id': 1,
            'results.offerBy.guest.firstName': 1,
            'results.offerBy.guest.middleName': 1,
            'results.offerBy.guest.lastName': 1,
            'results.offerBy.guest.language': 1,
            'results.offerBy.guest.country': 1,
            'results.offerBy.guest.currency': 1,
            'results.offerBy.guest.address': 1,
            'results.photos': 1,
          },
        },
      ]
      const bookableUnits = await dbProperties.aggregate(pipeline)
      const changePrices = bookableUnits[0].results.map(
        (item: T_Property) => ({
          ...item,
          bookableUnits: item.bookableUnits.map((item) => ({
            ...item,
            unitPrice: {
              ...item.unitPrice,
              baseRate: !item.unitPrice.baseRate
                ? 0
                : convertPrice(
                    item.unitPrice.baseRate,
                    preferredCurrency,
                    conversionRates
                  ),
              pricePerAdditionalPerson: !item.unitPrice.pricePerAdditionalPerson
                ? 0
                : convertPrice(
                    item.unitPrice.pricePerAdditionalPerson,
                    preferredCurrency,
                    conversionRates
                  ),
              discountedWeekLyRate: !item.unitPrice?.discountedWeekLyRate
                ? 0
                : convertPrice(
                    item.unitPrice?.discountedWeekLyRate,
                    preferredCurrency,
                    conversionRates
                  ),
            },
            pricePerDates: item?.pricePerDates?.map((item) => ({
              ...item,
              price: {
                ...item.price,
                baseRate: !item.price?.baseRate
                  ? 0
                  : convertPrice(
                      item.price?.baseRate,
                      preferredCurrency,
                      conversionRates
                    ),
                pricePerAdditionalPerson: !item.price?.pricePerAdditionalPerson
                  ? 0
                  : convertPrice(
                      item?.price?.pricePerAdditionalPerson,
                      preferredCurrency,
                      conversionRates
                    ),
                discountedWeekLyRate: !item.price?.discountedWeekLyRate
                  ? 0
                  : convertPrice(
                      item.price?.discountedWeekLyRate,
                      preferredCurrency,
                      conversionRates
                    ),
              },
            })),
          })),
        })
      )
      const allBookableUnits = changePrices.flatMap(
        (property: T_Property) =>
          property.bookableUnits.map((unit: T_BookableUnitType) => ({
            listingId: unit._id,
            title: property.title || null,
            subtitle: unit.subtitle || null,
            type: property.type,
            wholePlaceType: unit.wholePlaceType,
            photos: unit.photos.map((photo: T_Photo) => ({
              key: photo.key,
              alt: '',
            })),
            location: {
              city: property.location.city,
              latitude: property.location.latitude,
              longitude: property.location.longitude,
            },
            price: unit.unitPrice?.baseRate || 0,
            average: unit.average || 0,
            reviewsCount: unit.reviewsCount || 0,
          }))
      )
      const paginatedBookableUnits = allBookableUnits.slice(
        startIndex,
        endIndex
      )

      res.json(
        response.success({
          items: paginatedBookableUnits,
          pageItemCount: paginatedBookableUnits.length,
          allItemCount: allBookableUnits.length,
        })
      )
    } else if (
      location &&
      location !== 'any' &&
      (!propertyTypes || propertyTypes === 'any')
    ) {
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: 'users',
            localField: 'offerBy',
            foreignField: '_id',
            as: 'offerBy',
          },
        },
        { $unwind: { path: '$offerBy', preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: 'guests',
            localField: 'offerBy.guest',
            foreignField: '_id',
            as: 'offerBy.guest',
          },
        },
        {
          $unwind: { path: '$offerBy.guest', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'addresses',
            localField: 'offerBy.guest.address',
            foreignField: '_id',
            as: 'offerBy.guest.address',
          },
        },
        {
          $unwind: {
            path: '$offerBy.guest.address',
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
          },
        },
        {
          $addFields: {
            facilities: {
              $filter: {
                input: '$facilities',
                as: 'facility',
                cond: { $eq: ['$$facility.isSelected', true] }, // Only include facilities where isSelected is true
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { 'facilities.facility': { $exists: true } }, // Allow documents with facilities
              { $expr: { $eq: [facilitiesArray.length, 0] } }, // Ignore match if facilitiesArray is empty
            ],
            ...(facilitiesArray.length > 0 && facilitiesArray[0] !== 'any'
              ? {
                  'facilities.facility': {
                    $in: facilitiesArray.map(
                      (facility) => new RegExp(`^${facility}$`, 'i')
                    ),
                  },
                }
              : {}),
          },
        },
        {
          $lookup: {
            from: 'policies',
            localField: 'policies',
            foreignField: '_id',
            as: 'policies',
          },
        },
        {
          $addFields: {
            policies: {
              $filter: {
                input: '$policies',
                as: 'policy',
                cond: { $eq: ['$$policy.isSelected', true] }, // Only include facilities where isSelected is true
              },
            },
          },
        },
        {
          $lookup: {
            from: 'bookableunittypes',
            localField: 'bookableUnits',
            foreignField: '_id',
            as: 'bookableUnits',
            pipeline: [
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
                      as: 'qty',
                      cond: { $not: { $in: ['$$qty._id', unitIds] } },
                    },
                  },
                },
              },
              {
                $match: {
                  qtyIds: { $ne: [] },
                  maxGuests: { $gte: guestNumber },
                },
              },
              {
                $lookup: {
                  from: 'unitprices', // The collection where price details are stored
                  localField: 'pricePerDates.price', // Path to the price IDs within pricePerDates
                  foreignField: '_id', // The field in rentalrates matching the price IDs
                  as: 'priceDetails', // Temporary field to store the lookup result
                },
              },
              {
                $addFields: {
                  pricePerDates: {
                    $map: {
                      input: '$pricePerDates',
                      as: 'dateEntry',
                      in: {
                        $mergeObjects: [
                          '$$dateEntry', // Original data from pricePerDates
                          {
                            price: {
                              $arrayElemAt: [
                                {
                                  $filter: {
                                    input: '$priceDetails',
                                    as: 'priceDetail',
                                    cond: {
                                      $eq: [
                                        '$$priceDetail._id',
                                        '$$dateEntry.price',
                                      ],
                                    },
                                  },
                                },
                                0,
                              ],
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                $project: {
                  priceDetails: 0, // Remove the temporary priceDetails field
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'unitprices',
            localField: 'bookableUnits.unitPrice',
            foreignField: '_id',
            as: 'unitPrice',
          },
        },
        {
          $lookup: {
            from: 'amenities',
            localField: 'bookableUnits.amenities',
            foreignField: '_id',
            as: 'amenities',
          },
        },
        {
          $lookup: {
            from: 'photos',
            localField: 'bookableUnits.photos',
            foreignField: '_id',
            as: 'photos',
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $map: {
                input: '$bookableUnits',
                as: 'unit',
                in: {
                  $mergeObjects: [
                    '$$unit',
                    {
                      unitPrice: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$unitPrice',
                              as: 'price',
                              cond: {
                                $eq: ['$$price._id', '$$unit.unitPrice'],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    {
                      amenities: {
                        $filter: {
                          input: '$amenities', // This is the lookup result for amenities
                          as: 'amenity',
                          cond: {
                            $and: [
                              { $in: ['$$amenity._id', '$$unit.amenities'] },
                              { $eq: ['$$amenity.isSelected', true] },
                            ],
                          },
                        },
                      },
                    },
                    {
                      photos: {
                        $filter: {
                          input: '$photos',
                          as: 'photo',
                          cond: { $in: ['$$photo._id', '$$unit.photos'] },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $cond: {
                if: { $ne: [amenities, 'any'] }, // Check if the amenities variable is not "any"
                then: {
                  $filter: {
                    input: '$bookableUnits',
                    as: 'unit',
                    cond: {
                      $gt: [
                        {
                          $size: {
                            $filter: {
                              input: '$$unit.amenities',
                              as: 'amenity',
                              cond: {
                                $or: amenitiesArray.map((am) => ({
                                  $regexMatch: {
                                    input: '$$amenity.amenity',
                                    regex: new RegExp(`^${am}$`, 'i'), // Regex for case-insensitive match
                                  },
                                })),
                              },
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                },
                else: '$bookableUnits', // If amenities is "any", retain all bookableUnits
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { $expr: { $eq: [amenities, 'any'] } }, // Skip empty check if the amenities variable is "any"
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $filter: {
                input: '$bookableUnits',
                as: 'unit',
                cond: {
                  $or: [
                    {
                      $and: [
                        {
                          $gte: [
                            '$$unit.unitPrice.baseRate',
                            {
                              $cond: [
                                { $eq: [priceFrom, 'any'] },
                                0,
                                Number(priceFrom),
                              ],
                            },
                          ],
                        },
                        {
                          $lte: [
                            '$$unit.unitPrice.baseRate',
                            {
                              $cond: [
                                { $eq: [priceTo, 'any'] },
                                Infinity,
                                Number(priceTo),
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $and: [
                        { $eq: [priceFrom, 'any'] }, // Ignore price filtering if priceFrom is "any"
                        { $eq: [priceTo, 'any'] }, // Ignore price filtering if priceTo is "any"
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $filter: {
                input: '$bookableUnits',
                as: 'unit',
                cond: {
                  $or: [
                    { $eq: ['$$unit.category', 'Bed'] }, // Allow "Beds" category units
                    {
                      $and: [
                        {
                          $or: [
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Room'] },
                                {
                                  $gte: [
                                    {
                                      $reduce: {
                                        input: '$$unit.bedRooms',
                                        initialValue: 0,
                                        in: {
                                          $add: [
                                            '$$value',
                                            {
                                              $reduce: {
                                                input: '$$this.beds', // Access beds array in each bedRoom
                                                initialValue: 0,
                                                in: {
                                                  $add: [
                                                    '$$value',
                                                    '$$this.qty',
                                                  ],
                                                },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                    Number(bedCount), // Compare total qty to `beds` parameter
                                  ],
                                },
                              ],
                            },
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Whole-Place'] },
                                {
                                  $gte: [
                                    { $size: '$$unit.bedRooms' },
                                    Number(bedroomCount),
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          $or: [
                            { $eq: [bathroomCount, 'any'] }, // Ignore if bathrooms is "any"
                            {
                              $gte: [
                                { $toInt: '$$unit.numBathRooms' }, // Convert to number
                                Number(bathroomCount), // Compare to req.params.bathrooms
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $match: {
            'location.city': {
              $regex: location, // Use the location variable as a regular expression
              $options: 'i', // 'i' makes it case-insensitive
            },
          },
        },
        {
          $facet: {
            totalCount: [{ $count: 'count' }],
            paginatedResults: [],
          },
        },
        {
          $project: {
            results: '$paginatedResults',
          },
        },
        {
          $project: {
            'results._id': 1,
            'results.status': 1,
            'results.finishedSection': 1,
            'results.title': 1,
            'results.description': 1,
            'results.location': 1,
            'results.currency': 1,
            'results.primaryLanguage': 1,
            'results.phone': 1,
            'results.email': 1,
            'results.checkInTime': 1,
            'results.checkOutTime': 1,
            'results.isLateCheckOutAllowed': 1,
            'results.lateCheckOutType': 1,
            'results.lateCheckOutValue': 1,
            'results.termsAndConditions': 1,
            'results.taxId': 1,
            'results.taxId2': 1,
            'results.companyLegalName': 1,
            'results.type': 1,
            'results.wholeplaceType': 1,
            'results.facilities._id': 1,
            'results.facilities.category': 1,
            'results.facilities.facility': 1,
            'results.policies._id': 1,
            'results.policies.category': 1,
            'results.policies.policy': 1,
            'results.policies.reason': 1,
            'results.bookableUnits._id': 1,
            'results.bookableUnits.category': 1,
            'results.bookableUnits.title': 1,
            'results.bookableUnits.subtitle': 1,
            'results.bookableUnits.numBathRooms': 1,
            'results.bookableUnits.totalSize': 1,
            'results.bookableUnits.unitPrice': 1,
            'results.bookableUnits.amenities._id': 1,
            'results.bookableUnits.amenities.category': 1,
            'results.bookableUnits.amenities.amenity': 1,
            'results.bookableUnits.photos': 1,
            'results.bookableUnits.isPrivate': 1,
            'results.bookableUnits.maxGuests': 1,
            'results.bookableUnits.adultsIncluded': 1,
            'results.bookableUnits.childrenIncluded': 1,
            'results.bookableUnits.bedRooms': 1,
            'results.bookableUnits.isMultiRoomUnit': 1,
            'results.bookableUnits.qty': 1,
            'results.bookableUnits.livingRooms': 1,
            'results.bookableUnits.bedroomStudio': 1,
            'results.bookableUnits.isHaveSharedAmenities': 1,
            'results.bookableUnits.isHaveSharedBathRoom': 1,
            'results.bookableUnits.pricePerDates': 1,
            'results.bookableUnits.qtyIds': 1,
            'results.bookableUnits.average': 1,
            'results.bookableUnits.reviewsCount': 1,
            'results.offerBy._id': 1,
            'results.offerBy.email': 1,
            'results.offerBy.role': 1,
            'results.offerBy.guest._id': 1,
            'results.offerBy.guest.firstName': 1,
            'results.offerBy.guest.middleName': 1,
            'results.offerBy.guest.lastName': 1,
            'results.offerBy.guest.language': 1,
            'results.offerBy.guest.country': 1,
            'results.offerBy.guest.currency': 1,
            'results.offerBy.guest.address': 1,
            'results.photos': 1,
          },
        },
      ]
      const bookableUnits = await dbProperties.aggregate(pipeline)
      const changePrices = bookableUnits[0].results.map(
        (item: T_Property) => ({
          ...item,
          bookableUnits: item.bookableUnits.map((item) => ({
            ...item,
            unitPrice: {
              ...item.unitPrice,
              baseRate: !item.unitPrice.baseRate
                ? 0
                : convertPrice(
                    item.unitPrice.baseRate,
                    preferredCurrency,
                    conversionRates
                  ),
              pricePerAdditionalPerson: !item.unitPrice.pricePerAdditionalPerson
                ? 0
                : convertPrice(
                    item.unitPrice.pricePerAdditionalPerson,
                    preferredCurrency,
                    conversionRates
                  ),
              discountedWeekLyRate: !item.unitPrice?.discountedWeekLyRate
                ? 0
                : convertPrice(
                    item.unitPrice?.discountedWeekLyRate,
                    preferredCurrency,
                    conversionRates
                  ),
            },
            pricePerDates: item?.pricePerDates?.map((item) => ({
              ...item,
              price: {
                ...item.price,
                baseRate: !item.price?.baseRate
                  ? 0
                  : convertPrice(
                      item.price?.baseRate,
                      preferredCurrency,
                      conversionRates
                    ),
                pricePerAdditionalPerson: !item.price?.pricePerAdditionalPerson
                  ? 0
                  : convertPrice(
                      item?.price?.pricePerAdditionalPerson,
                      preferredCurrency,
                      conversionRates
                    ),
                discountedWeekLyRate: !item.price?.discountedWeekLyRate
                  ? 0
                  : convertPrice(
                      item.price?.discountedWeekLyRate,
                      preferredCurrency,
                      conversionRates
                    ),
              },
            })),
          })),
        })
      )
      const allBookableUnits = changePrices.flatMap(
        (property: T_Property) =>
          property.bookableUnits.map((unit: T_BookableUnitType) => ({
            listingId: unit._id,
            title: property.title || null,
            subtitle: unit.subtitle || null,
            type: property.type,
            wholePlaceType: unit.wholePlaceType,
            photos: unit.photos.map((photo: T_Photo) => ({
              key: photo.key,
              alt: '',
            })),
            location: {
              city: property.location.city,
              latitude: property.location.latitude,
              longitude: property.location.longitude,
            },
            price: unit.unitPrice?.baseRate || 0,
            average: unit.average || 0,
            reviewsCount: unit.reviewsCount || 0,
          }))
      )
      const paginatedBookableUnits = allBookableUnits.slice(
        startIndex,
        endIndex
      )

      res.json(
        response.success({
          items: paginatedBookableUnits,
          pageItemCount: paginatedBookableUnits.length,
          allItemCount: allBookableUnits.length,
        })
      )
    } else if (
      (!location || location === 'any') &&
      propertyTypes &&
      propertyTypes !== 'any'
    ) {
      const arrayTypes = String(propertyTypes)
        .trim()
        .split(',')
        .map((item) => item.trim())
      const upperCaseTypes = arrayTypes.map((t: any) => String(t).toUpperCase())

      const wholePlaceTypes = ['VILLA', 'HOUSE', 'BUNGALOW', 'COTTAGE']
      const selectedWholePlaceTypes = upperCaseTypes.filter((t) =>
        wholePlaceTypes.includes(t)
      )
      const otherTypes = upperCaseTypes.filter(
        (t: string) => !wholePlaceTypes.includes(t)
      )
      if (selectedWholePlaceTypes.length > 0 && otherTypes.length === 0) {
        query.wholeplaceType = {
          $in: selectedWholePlaceTypes,
        }
        query.type = 'WHOLE_PLACE'
      } else if (
        otherTypes.length > 0 &&
        selectedWholePlaceTypes.length === 0
      ) {
        query.type = {
          $in: otherTypes,
          $ne: 'WHOLE_PLACE',
        }
        query.wholeplaceType = query.wholeplaceType || null
      } else if (selectedWholePlaceTypes.length > 0 && otherTypes.length > 0) {
        query.$or = [
          {
            type: 'WHOLE_PLACE',
            wholeplaceType: { $in: selectedWholePlaceTypes },
          },
          { type: { $in: otherTypes, $ne: 'WHOLE_PLACE' } },
        ]
      }
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: 'users',
            localField: 'offerBy',
            foreignField: '_id',
            as: 'offerBy',
          },
        },
        { $unwind: { path: '$offerBy', preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: 'guests',
            localField: 'offerBy.guest',
            foreignField: '_id',
            as: 'offerBy.guest',
          },
        },
        {
          $unwind: { path: '$offerBy.guest', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'addresses',
            localField: 'offerBy.guest.address',
            foreignField: '_id',
            as: 'offerBy.guest.address',
          },
        },
        {
          $unwind: {
            path: '$offerBy.guest.address',
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
          },
        },
        {
          $addFields: {
            facilities: {
              $filter: {
                input: '$facilities',
                as: 'facility',
                cond: { $eq: ['$$facility.isSelected', true] }, // Only include facilities where isSelected is true
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { 'facilities.facility': { $exists: true } }, // Allow documents with facilities
              { $expr: { $eq: [facilitiesArray.length, 0] } }, // Ignore match if facilitiesArray is empty
            ],
            ...(facilitiesArray.length > 0 && facilitiesArray[0] !== 'any'
              ? {
                  'facilities.facility': {
                    $in: facilitiesArray.map(
                      (facility) => new RegExp(`^${facility}$`, 'i')
                    ),
                  },
                }
              : {}),
          },
        },
        {
          $lookup: {
            from: 'policies',
            localField: 'policies',
            foreignField: '_id',
            as: 'policies',
          },
        },
        {
          $addFields: {
            policies: {
              $filter: {
                input: '$policies',
                as: 'policy',
                cond: { $eq: ['$$policy.isSelected', true] },
              },
            },
          },
        },
        {
          $lookup: {
            from: 'bookableunittypes',
            localField: 'bookableUnits',
            foreignField: '_id',
            as: 'bookableUnits',
            pipeline: [
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
                      as: 'qty',
                      cond: { $not: { $in: ['$$qty._id', unitIds] } },
                    },
                  },
                },
              },
              {
                $match: {
                  qtyIds: { $ne: [] },
                  maxGuests: { $gte: guestNumber },
                },
              },
              {
                $lookup: {
                  from: 'unitprices', // The collection where price details are stored
                  localField: 'pricePerDates.price', // Path to the price IDs within pricePerDates
                  foreignField: '_id', // The field in rentalrates matching the price IDs
                  as: 'priceDetails', // Temporary field to store the lookup result
                },
              },
              {
                $addFields: {
                  pricePerDates: {
                    $map: {
                      input: '$pricePerDates',
                      as: 'dateEntry',
                      in: {
                        $mergeObjects: [
                          '$$dateEntry', // Original data from pricePerDates
                          {
                            price: {
                              $arrayElemAt: [
                                {
                                  $filter: {
                                    input: '$priceDetails',
                                    as: 'priceDetail',
                                    cond: {
                                      $eq: [
                                        '$$priceDetail._id',
                                        '$$dateEntry.price',
                                      ],
                                    },
                                  },
                                },
                                0,
                              ],
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                $project: {
                  priceDetails: 0, // Remove the temporary priceDetails field
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'unitprices',
            localField: 'bookableUnits.unitPrice',
            foreignField: '_id',
            as: 'unitPrice',
          },
        },
        {
          $lookup: {
            from: 'amenities',
            localField: 'bookableUnits.amenities',
            foreignField: '_id',
            as: 'amenities',
          },
        },
        {
          $lookup: {
            from: 'photos',
            localField: 'bookableUnits.photos',
            foreignField: '_id',
            as: 'photos',
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $map: {
                input: '$bookableUnits',
                as: 'unit',
                in: {
                  $mergeObjects: [
                    '$$unit',
                    {
                      unitPrice: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$unitPrice',
                              as: 'price',
                              cond: {
                                $eq: ['$$price._id', '$$unit.unitPrice'],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    {
                      amenities: {
                        $filter: {
                          input: '$amenities', // This is the lookup result for amenities
                          as: 'amenity',
                          cond: {
                            $and: [
                              { $in: ['$$amenity._id', '$$unit.amenities'] },
                              { $eq: ['$$amenity.isSelected', true] },
                            ],
                          },
                        },
                      },
                    },
                    {
                      photos: {
                        $filter: {
                          input: '$photos', // This is the lookup result for amenities
                          as: 'photo',
                          cond: { $in: ['$$photo._id', '$$unit.photos'] },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $cond: {
                if: { $ne: [amenities, 'any'] }, // Check if the amenities variable is not "any"
                then: {
                  $filter: {
                    input: '$bookableUnits',
                    as: 'unit',
                    cond: {
                      $gt: [
                        {
                          $size: {
                            $filter: {
                              input: '$$unit.amenities',
                              as: 'amenity',
                              cond: {
                                $or: amenitiesArray.map((am) => ({
                                  $regexMatch: {
                                    input: '$$amenity.amenity',
                                    regex: new RegExp(`^${am}$`, 'i'), // Regex for case-insensitive match
                                  },
                                })),
                              },
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                },
                else: '$bookableUnits', // If amenities is "any", retain all bookableUnits
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { $expr: { $eq: [amenities, 'any'] } }, // Skip empty check if the amenities variable is "any"
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $filter: {
                input: '$bookableUnits',
                as: 'unit',
                cond: {
                  $or: [
                    {
                      $and: [
                        {
                          $gte: [
                            '$$unit.unitPrice.baseRate',
                            {
                              $cond: [
                                { $eq: [priceFrom, 'any'] },
                                0,
                                Number(priceFrom),
                              ],
                            },
                          ],
                        },
                        {
                          $lte: [
                            '$$unit.unitPrice.baseRate',
                            {
                              $cond: [
                                { $eq: [priceTo, 'any'] },
                                Infinity,
                                Number(priceTo),
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $and: [
                        { $eq: [priceFrom, 'any'] }, // Ignore price filtering if priceFrom is "any"
                        { $eq: [priceTo, 'any'] }, // Ignore price filtering if priceTo is "any"
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $filter: {
                input: '$bookableUnits',
                as: 'unit',
                cond: {
                  $or: [
                    { $eq: ['$$unit.category', 'Bed'] }, // Allow "Beds" category units
                    {
                      $and: [
                        {
                          $or: [
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Room'] },
                                {
                                  $gte: [
                                    {
                                      $reduce: {
                                        input: '$$unit.bedRooms',
                                        initialValue: 0,
                                        in: {
                                          $add: [
                                            '$$value', // Accumulated value
                                            {
                                              $reduce: {
                                                input: '$$this.beds', // Access beds array in each bedRoom
                                                initialValue: 0,
                                                in: {
                                                  $add: [
                                                    '$$value',
                                                    '$$this.qty',
                                                  ],
                                                },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                    Number(bedCount),
                                  ],
                                },
                              ],
                            },
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Whole-Place'] },
                                {
                                  $gte: [
                                    { $size: '$$unit.bedRooms' },
                                    Number(bedroomCount),
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          $or: [
                            { $eq: [bathroomCount, 'any'] }, // Ignore if bathrooms is "any"
                            {
                              $gte: [
                                { $toInt: '$$unit.numBathRooms' }, // Convert to number
                                Number(bathroomCount), // Compare to req.params.bathrooms
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $facet: {
            totalCount: [{ $count: 'count' }],
            paginatedResults: [],
          },
        },
        {
          $project: {
            results: '$paginatedResults',
          },
        },
        {
          $project: {
            'results._id': 1,
            'results.status': 1,
            'results.finishedSection': 1,
            'results.title': 1,
            'results.description': 1,
            'results.location': 1,
            'results.currency': 1,
            'results.primaryLanguage': 1,
            'results.phone': 1,
            'results.email': 1,
            'results.checkInTime': 1,
            'results.checkOutTime': 1,
            'results.isLateCheckOutAllowed': 1,
            'results.lateCheckOutType': 1,
            'results.lateCheckOutValue': 1,
            'results.termsAndConditions': 1,
            'results.taxId': 1,
            'results.taxId2': 1,
            'results.companyLegalName': 1,
            'results.type': 1,
            'results.wholeplaceType': 1,
            'results.facilities._id': 1,
            'results.facilities.category': 1,
            'results.facilities.facility': 1,
            'results.policies._id': 1,
            'results.policies.category': 1,
            'results.policies.policy': 1,
            'results.policies.reason': 1,
            'results.bookableUnits._id': 1,
            'results.bookableUnits.category': 1,
            'results.bookableUnits.title': 1,
            'results.bookableUnits.subtitle': 1,
            'results.bookableUnits.numBathRooms': 1,
            'results.bookableUnits.totalSize': 1,
            'results.bookableUnits.unitPrice': 1,
            'results.bookableUnits.amenities._id': 1,
            'results.bookableUnits.amenities.category': 1,
            'results.bookableUnits.amenities.amenity': 1,
            'results.bookableUnits.photos': 1,
            'results.bookableUnits.isPrivate': 1,
            'results.bookableUnits.maxGuests': 1,
            'results.bookableUnits.adultsIncluded': 1,
            'results.bookableUnits.childrenIncluded': 1,
            'results.bookableUnits.bedRooms': 1,
            'results.bookableUnits.isMultiRoomUnit': 1,
            'results.bookableUnits.qty': 1,
            'results.bookableUnits.livingRooms': 1,
            'results.bookableUnits.bedroomStudio': 1,
            'results.bookableUnits.isHaveSharedAmenities': 1,
            'results.bookableUnits.isHaveSharedBathRoom': 1,
            'results.bookableUnits.pricePerDates': 1,
            'results.bookableUnits.qtyIds': 1,
            'results.bookableUnits.average': 1,
            'results.bookableUnits.reviewsCount': 1,
            'results.offerBy._id': 1,
            'results.offerBy.email': 1,
            'results.offerBy.role': 1,
            'results.offerBy.guest._id': 1,
            'results.offerBy.guest.firstName': 1,
            'results.offerBy.guest.middleName': 1,
            'results.offerBy.guest.lastName': 1,
            'results.offerBy.guest.language': 1,
            'results.offerBy.guest.country': 1,
            'results.offerBy.guest.currency': 1,
            'results.offerBy.guest.address': 1,
            'results.photos': 1,
          },
        },
      ]
      const bookableUnits = await dbProperties.aggregate(pipeline)
      const changePrices = bookableUnits[0].results.map(
        (item: T_Property) => ({
          ...item,
          bookableUnits: item.bookableUnits.map((item) => ({
            ...item,
            unitPrice: {
              ...item.unitPrice,
              baseRate: !item.unitPrice.baseRate
                ? 0
                : convertPrice(
                    item.unitPrice.baseRate,
                    preferredCurrency,
                    conversionRates
                  ),
              pricePerAdditionalPerson: !item.unitPrice.pricePerAdditionalPerson
                ? 0
                : convertPrice(
                    item.unitPrice.pricePerAdditionalPerson,
                    preferredCurrency,
                    conversionRates
                  ),
              discountedWeekLyRate: !item.unitPrice?.discountedWeekLyRate
                ? 0
                : convertPrice(
                    item.unitPrice?.discountedWeekLyRate,
                    preferredCurrency,
                    conversionRates
                  ),
            },
            pricePerDates: item?.pricePerDates?.map((item) => ({
              ...item,
              price: {
                ...item.price,
                baseRate: !item.price?.baseRate
                  ? 0
                  : convertPrice(
                      item.price?.baseRate,
                      preferredCurrency,
                      conversionRates
                    ),
                pricePerAdditionalPerson: !item.price?.pricePerAdditionalPerson
                  ? 0
                  : convertPrice(
                      item?.price?.pricePerAdditionalPerson,
                      preferredCurrency,
                      conversionRates
                    ),
                discountedWeekLyRate: !item.price?.discountedWeekLyRate
                  ? 0
                  : convertPrice(
                      item.price?.discountedWeekLyRate,
                      preferredCurrency,
                      conversionRates
                    ),
              },
            })),
          })),
        })
      )
      const allBookableUnits = changePrices.flatMap(
        (property: T_Property) =>
          property.bookableUnits.map((unit: T_BookableUnitType) => ({
            listingId: unit._id,
            title: property.title || null,
            subtitle: unit.subtitle || null,
            type: property.type,
            wholePlaceType: unit.wholePlaceType,
            photos: unit.photos.map((photo: T_Photo) => ({
              key: photo.key,
              alt: '',
            })),
            location: {
              city: property.location.city,
              latitude: property.location.latitude,
              longitude: property.location.longitude,
            },
            price: unit.unitPrice?.baseRate || 0,
            average: unit.average || 0,
            reviewsCount: unit.reviewsCount || 0,
          }))
      )
      const paginatedBookableUnits = allBookableUnits.slice(
        startIndex,
        endIndex
      )

      res.json(
        response.success({
          items: paginatedBookableUnits,
          pageItemCount: paginatedBookableUnits.length,
          allItemCount: allBookableUnits.length,
        })
      )
    } else if (
      location &&
      location !== 'any' &&
      propertyTypes &&
      propertyTypes !== 'any'
    ) {
      const arrayTypes = String(propertyTypes)
        .trim()
        .split(',')
        .map((item) => item.trim())
      const upperCaseTypes = arrayTypes.map((t: any) => String(t).toUpperCase())

      const wholePlaceTypes = ['VILLA', 'HOUSE', 'BUNGALOW', 'COTTAGE']
      const selectedWholePlaceTypes = upperCaseTypes.filter((t) =>
        wholePlaceTypes.includes(t)
      )
      const otherTypes = upperCaseTypes.filter(
        (t: string) => !wholePlaceTypes.includes(t)
      )
      if (selectedWholePlaceTypes.length > 0 && otherTypes.length === 0) {
        query.wholeplaceType = {
          $in: selectedWholePlaceTypes,
        }
        query.type = 'WHOLE_PLACE'
      } else if (
        otherTypes.length > 0 &&
        selectedWholePlaceTypes.length === 0
      ) {
        query.type = {
          $in: otherTypes,
          $ne: 'WHOLE_PLACE',
        }
        query.wholeplaceType = query.wholeplaceType || null
      } else if (selectedWholePlaceTypes.length > 0 && otherTypes.length > 0) {
        query.$or = [
          {
            type: 'WHOLE_PLACE',
            wholeplaceType: { $in: selectedWholePlaceTypes },
          },
          { type: { $in: otherTypes, $ne: 'WHOLE_PLACE' } },
        ]
      }
      const pipeline = [
        { $match: query },
        {
          $lookup: {
            from: 'users',
            localField: 'offerBy',
            foreignField: '_id',
            as: 'offerBy',
          },
        },
        { $unwind: { path: '$offerBy', preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: 'guests',
            localField: 'offerBy.guest',
            foreignField: '_id',
            as: 'offerBy.guest',
          },
        },
        {
          $unwind: { path: '$offerBy.guest', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'addresses',
            localField: 'offerBy.guest.address',
            foreignField: '_id',
            as: 'offerBy.guest.address',
          },
        },
        {
          $unwind: {
            path: '$offerBy.guest.address',
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
          },
        },
        {
          $addFields: {
            facilities: {
              $filter: {
                input: '$facilities',
                as: 'facility',
                cond: { $eq: ['$$facility.isSelected', true] }, // Only include facilities where isSelected is true
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { 'facilities.facility': { $exists: true } }, // Allow documents with facilities
              { $expr: { $eq: [facilitiesArray.length, 0] } }, // Ignore match if facilitiesArray is empty
            ],
            ...(facilitiesArray.length > 0 && facilitiesArray[0] !== 'any'
              ? {
                  'facilities.facility': {
                    $in: facilitiesArray.map(
                      (facility) => new RegExp(`^${facility}$`, 'i')
                    ),
                  },
                }
              : {}),
          },
        },
        {
          $lookup: {
            from: 'policies',
            localField: 'policies',
            foreignField: '_id',
            as: 'policies',
          },
        },
        {
          $addFields: {
            policies: {
              $filter: {
                input: '$policies',
                as: 'policy',
                cond: { $eq: ['$$policy.isSelected', true] },
              },
            },
          },
        },
        {
          $lookup: {
            from: 'bookableunittypes',
            localField: 'bookableUnits',
            foreignField: '_id',
            as: 'bookableUnits',
            pipeline: [
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
                      as: 'qty',
                      cond: { $not: { $in: ['$$qty._id', unitIds] } },
                    },
                  },
                },
              },
              {
                $match: {
                  qtyIds: { $ne: [] },
                  maxGuests: { $gte: guestNumber },
                },
              },
              {
                $lookup: {
                  from: 'unitprices', // The collection where price details are stored
                  localField: 'pricePerDates.price', // Path to the price IDs within pricePerDates
                  foreignField: '_id', // The field in rentalrates matching the price IDs
                  as: 'priceDetails', // Temporary field to store the lookup result
                },
              },
              {
                $addFields: {
                  pricePerDates: {
                    $map: {
                      input: '$pricePerDates',
                      as: 'dateEntry',
                      in: {
                        $mergeObjects: [
                          '$$dateEntry', // Original data from pricePerDates
                          {
                            price: {
                              $arrayElemAt: [
                                {
                                  $filter: {
                                    input: '$priceDetails',
                                    as: 'priceDetail',
                                    cond: {
                                      $eq: [
                                        '$$priceDetail._id',
                                        '$$dateEntry.price',
                                      ],
                                    },
                                  },
                                },
                                0,
                              ],
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
              {
                $project: {
                  priceDetails: 0, // Remove the temporary priceDetails field
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: 'unitprices',
            localField: 'bookableUnits.unitPrice',
            foreignField: '_id',
            as: 'unitPrice',
          },
        },
        {
          $lookup: {
            from: 'amenities',
            localField: 'bookableUnits.amenities',
            foreignField: '_id',
            as: 'amenities',
          },
        },
        {
          $lookup: {
            from: 'photos',
            localField: 'bookableUnits.photos',
            foreignField: '_id',
            as: 'photos',
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $map: {
                input: '$bookableUnits',
                as: 'unit',
                in: {
                  $mergeObjects: [
                    '$$unit',
                    {
                      unitPrice: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$unitPrice',
                              as: 'price',
                              cond: {
                                $eq: ['$$price._id', '$$unit.unitPrice'],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    {
                      amenities: {
                        $filter: {
                          input: '$amenities', // This is the lookup result for amenities
                          as: 'amenity',
                          cond: {
                            $and: [
                              { $in: ['$$amenity._id', '$$unit.amenities'] },
                              { $eq: ['$$amenity.isSelected', true] },
                            ],
                          },
                        },
                      },
                    },
                    {
                      photos: {
                        $filter: {
                          input: '$photos',
                          as: 'photo',
                          cond: { $in: ['$$photo._id', '$$unit.photos'] },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $cond: {
                if: { $ne: [amenities, 'any'] }, // Check if the amenities variable is not "any"
                then: {
                  $filter: {
                    input: '$bookableUnits',
                    as: 'unit',
                    cond: {
                      $gt: [
                        {
                          $size: {
                            $filter: {
                              input: '$$unit.amenities',
                              as: 'amenity',
                              cond: {
                                $or: amenitiesArray.map((am) => ({
                                  $regexMatch: {
                                    input: '$$amenity.amenity',
                                    regex: new RegExp(`^${am}$`, 'i'), // Regex for case-insensitive match
                                  },
                                })),
                              },
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                },
                else: '$bookableUnits',
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { $expr: { $eq: [amenities, 'any'] } }, // Skip empty check if the amenities variable is "any"
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $filter: {
                input: '$bookableUnits',
                as: 'unit',
                cond: {
                  $or: [
                    {
                      $and: [
                        {
                          $gte: [
                            '$$unit.unitPrice.baseRate',
                            {
                              $cond: [
                                { $eq: [priceFrom, 'any'] },
                                0,
                                Number(priceFrom),
                              ],
                            },
                          ],
                        },
                        {
                          $lte: [
                            '$$unit.unitPrice.baseRate',
                            {
                              $cond: [
                                { $eq: [priceTo, 'any'] },
                                Infinity,
                                Number(priceTo),
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $and: [
                        { $eq: [priceFrom, 'any'] }, // Ignore price filtering if priceFrom is "any"
                        { $eq: [priceTo, 'any'] }, // Ignore price filtering if priceTo is "any"
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $addFields: {
            bookableUnits: {
              $filter: {
                input: '$bookableUnits',
                as: 'unit',
                cond: {
                  $or: [
                    { $eq: ['$$unit.category', 'Bed'] }, // Allow "Beds" category units
                    {
                      $and: [
                        {
                          $or: [
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Room'] },
                                {
                                  $gte: [
                                    {
                                      $reduce: {
                                        input: '$$unit.bedRooms',
                                        initialValue: 0,
                                        in: {
                                          $add: [
                                            '$$value', // Accumulated value
                                            {
                                              $reduce: {
                                                input: '$$this.beds', // Access beds array in each bedRoom
                                                initialValue: 0,
                                                in: {
                                                  $add: [
                                                    '$$value',
                                                    '$$this.qty',
                                                  ],
                                                },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                    Number(bedCount), // Compare total qty to `beds` parameter
                                  ],
                                },
                              ],
                            },
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Whole-Place'] },
                                {
                                  $gte: [
                                    { $size: '$$unit.bedRooms' },
                                    Number(bedroomCount),
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          $or: [
                            { $eq: [bathroomCount, 'any'] }, // Ignore if bathrooms is "any"
                            {
                              $gte: [
                                { $toInt: '$$unit.numBathRooms' }, // Convert to number
                                Number(bathroomCount), // Compare to req.params.bathrooms
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $match: {
            $or: [
              { bookableUnits: { $ne: [] } }, // Otherwise, only keep documents with non-empty bookableUnits
            ],
          },
        },
        {
          $match: {
            'location.city': {
              $regex: location, // Use the location variable as a regular expression
              $options: 'i',
            },
          },
        },
        {
          $facet: {
            totalCount: [{ $count: 'count' }],
            paginatedResults: [],
          },
        },
        {
          $project: {
            results: '$paginatedResults',
          },
        },
        {
          $project: {
            'results._id': 1,
            'results.status': 1,
            'results.finishedSection': 1,
            'results.title': 1,
            'results.description': 1,
            'results.location': 1,
            'results.currency': 1,
            'results.primaryLanguage': 1,
            'results.phone': 1,
            'results.email': 1,
            'results.checkInTime': 1,
            'results.checkOutTime': 1,
            'results.isLateCheckOutAllowed': 1,
            'results.lateCheckOutType': 1,
            'results.lateCheckOutValue': 1,
            'results.termsAndConditions': 1,
            'results.taxId': 1,
            'results.taxId2': 1,
            'results.companyLegalName': 1,
            'results.type': 1,
            'results.wholeplaceType': 1,
            'results.facilities._id': 1,
            'results.facilities.category': 1,
            'results.facilities.facility': 1,
            'results.policies._id': 1,
            'results.policies.category': 1,
            'results.policies.policy': 1,
            'results.policies.reason': 1,
            'results.bookableUnits._id': 1,
            'results.bookableUnits.category': 1,
            'results.bookableUnits.title': 1,
            'results.bookableUnits.subtitle': 1,
            'results.bookableUnits.numBathRooms': 1,
            'results.bookableUnits.totalSize': 1,
            'results.bookableUnits.unitPrice': 1,
            'results.bookableUnits.amenities._id': 1,
            'results.bookableUnits.amenities.category': 1,
            'results.bookableUnits.amenities.amenity': 1,
            'results.bookableUnits.photos': 1,
            'results.bookableUnits.isPrivate': 1,
            'results.bookableUnits.maxGuests': 1,
            'results.bookableUnits.adultsIncluded': 1,
            'results.bookableUnits.childrenIncluded': 1,
            'results.bookableUnits.bedRooms': 1,
            'results.bookableUnits.isMultiRoomUnit': 1,
            'results.bookableUnits.qty': 1,
            'results.bookableUnits.livingRooms': 1,
            'results.bookableUnits.bedroomStudio': 1,
            'results.bookableUnits.isHaveSharedAmenities': 1,
            'results.bookableUnits.isHaveSharedBathRoom': 1,
            'results.bookableUnits.pricePerDates': 1,
            'results.bookableUnits.qtyIds': 1,
            'results.bookableUnits.average': 1,
            'results.bookableUnits.reviewsCount': 1,
            'results.offerBy._id': 1,
            'results.offerBy.email': 1,
            'results.offerBy.role': 1,
            'results.offerBy.guest._id': 1,
            'results.offerBy.guest.firstName': 1,
            'results.offerBy.guest.middleName': 1,
            'results.offerBy.guest.lastName': 1,
            'results.offerBy.guest.language': 1,
            'results.offerBy.guest.country': 1,
            'results.offerBy.guest.currency': 1,
            'results.offerBy.guest.address': 1,
            'results.photos': 1,
          },
        },
      ]
      const bookableUnits = await dbProperties.aggregate(pipeline)
      const changePrices = bookableUnits[0].results.map(
        (item: T_Property) => ({
          ...item,
          bookableUnits: item.bookableUnits.map((item) => ({
            ...item,
            unitPrice: {
              ...item.unitPrice,
              baseRate: !item.unitPrice.baseRate
                ? 0
                : convertPrice(
                    item.unitPrice.baseRate,
                    preferredCurrency,
                    conversionRates
                  ),
              pricePerAdditionalPerson: !item.unitPrice.pricePerAdditionalPerson
                ? 0
                : convertPrice(
                    item.unitPrice.pricePerAdditionalPerson,
                    preferredCurrency,
                    conversionRates
                  ),
              discountedWeekLyRate: !item.unitPrice?.discountedWeekLyRate
                ? 0
                : convertPrice(
                    item.unitPrice?.discountedWeekLyRate,
                    preferredCurrency,
                    conversionRates
                  ),
            },
            pricePerDates: item?.pricePerDates?.map((item) => ({
              ...item,
              price: {
                ...item.price,
                baseRate: !item.price?.baseRate
                  ? 0
                  : convertPrice(
                      item.price?.baseRate,
                      preferredCurrency,
                      conversionRates
                    ),
                pricePerAdditionalPerson: !item.price?.pricePerAdditionalPerson
                  ? 0
                  : convertPrice(
                      item?.price?.pricePerAdditionalPerson,
                      preferredCurrency,
                      conversionRates
                    ),
                discountedWeekLyRate: !item.price?.discountedWeekLyRate
                  ? 0
                  : convertPrice(
                      item.price?.discountedWeekLyRate,
                      preferredCurrency,
                      conversionRates
                    ),
              },
            })),
          })),
        })
      )
      const allBookableUnits = changePrices.flatMap(
        (property: T_Property) =>
          property.bookableUnits.map((unit: T_BookableUnitType) => ({
            listingId: unit._id,
            title: property.title || null,
            subtitle: unit.subtitle || null,
            type: property.type,
            wholePlaceType: unit.wholePlaceType,
            photos: unit.photos.map((photo: T_Photo) => ({
              key: photo.key,
              alt: '',
            })),
            location: {
              city: property.location.city,
              latitude: property.location.latitude,
              longitude: property.location.longitude,
            },
            price: unit.unitPrice?.baseRate || 0,
            average: unit.average || 0,
            reviewsCount: unit.reviewsCount || 0,
          }))
      )

      const paginatedBookableUnits = allBookableUnits.slice(
        startIndex,
        endIndex
      )

      res.json(
        response.success({
          items: paginatedBookableUnits,
          pageItemCount: paginatedBookableUnits.length,
          allItemCount: allBookableUnits.length,
        })
      )
    } else {
      res.jsonp(
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

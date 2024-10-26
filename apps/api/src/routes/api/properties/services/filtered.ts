import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbLocations, dbProperties, dbUnitPrices } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getFilteredProperties = async (req: Request, res: Response) => {
  let {
    location,
    type,
    facilities,
    amenities,
    priceFrom,
    priceTo,
    beds,
    bathrooms,
    bedrooms,
  } = req.query
  const { page, limit } = req.pagination || { page: 1, limit: 10 }
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
  if (!beds) {
    beds = 'any'
  }
  if (!bedrooms) {
    bedrooms = 'any'
  }
  if (!bathrooms) {
    bathrooms = 'any'
  }
  try {
    if ((!location || location === 'any') && (!type || type === 'any')) {
      const pipeline = [
        // Match the query
        { $match: query },

        // Lookup for the offerBy field and its nested guest field
        {
          $lookup: {
            from: 'users', // Replace with the actual name of the users collection
            localField: 'offerBy',
            foreignField: '_id',
            as: 'offerBy',
          },
        },
        { $unwind: { path: '$offerBy', preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: 'guests', // Replace with the actual name of the guests collection
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
            from: 'addresses', // Replace with the actual name of the guests collection
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
            from: 'photos', // Replace with the actual name of the photos collection
            localField: 'photos',
            foreignField: '_id',
            as: 'photos',
          },
        },
        {
          $lookup: {
            from: 'locations', // Replace with the actual name of the photos collection
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
            from: 'facilities', // Replace with the actual name of the photos collection
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
          // New stage to match if any facility has the facility
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
            from: 'policies', // Replace with the actual name of the photos collection
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
            from: 'bookableunittypes', // Replace with the actual name of the photos collection
            localField: 'bookableUnits',
            foreignField: '_id',
            as: 'bookableUnits',
          },
        },
        {
          $lookup: {
            from: 'unitprices', // Replace with the actual name of the photos collection
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
                              input: '$unitPrice', // assuming this is the lookup result field for unit prices
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
                          // Check if any amenities match the amenitiesArray
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
                        0, // Ensure at least one match
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
                            // Condition for "Room" category based on total bed quantity
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Room'] },
                                {
                                  $gte: [
                                    {
                                      // Sum the qty of all beds across all bedRooms
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
                                                }, // Sum bed quantities
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                    Number(beds), // Compare total qty to `beds` parameter
                                  ],
                                },
                              ],
                            },
                            // Condition for "Whole-Place" category based on bedroom length
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Whole-Place'] },
                                {
                                  $gte: [
                                    { $size: '$$unit.bedRooms' },
                                    Number(bedrooms),
                                  ],
                                }, // Compare to bedrooms parameter
                              ],
                            },
                          ],
                        },
                        // Condition for bathrooms, only if bathrooms is not "any"
                        {
                          $or: [
                            { $eq: [bathrooms, 'any'] }, // Ignore if bathrooms is "any"
                            {
                              $gte: [
                                { $toInt: '$$unit.numBathRooms' }, // Convert to number
                                Number(bathrooms), // Compare to req.params.bathrooms
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
      res.json(
        response.success({
          items: bookableUnits[0].results,
          pageItemCount: bookableUnits[0].pageItemCount || 0,
          allItemCount: bookableUnits[0].allItemsCount || 0,
        })
      )
    } else if (location && location !== 'any' && (!type || type === 'any')) {
      const pipeline = [
        // Match the query
        { $match: query },

        // Lookup for the offerBy field and its nested guest field
        {
          $lookup: {
            from: 'users', // Replace with the actual name of the users collection
            localField: 'offerBy',
            foreignField: '_id',
            as: 'offerBy',
          },
        },
        { $unwind: { path: '$offerBy', preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: 'guests', // Replace with the actual name of the guests collection
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
            from: 'addresses', // Replace with the actual name of the guests collection
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
            from: 'photos', // Replace with the actual name of the photos collection
            localField: 'photos',
            foreignField: '_id',
            as: 'photos',
          },
        },
        {
          $lookup: {
            from: 'locations', // Replace with the actual name of the photos collection
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
            from: 'facilities', // Replace with the actual name of the photos collection
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
          // New stage to match if any facility has the facility
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
            from: 'policies', // Replace with the actual name of the photos collection
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
            from: 'bookableunittypes', // Replace with the actual name of the photos collection
            localField: 'bookableUnits',
            foreignField: '_id',
            as: 'bookableUnits',
          },
        },
        {
          $lookup: {
            from: 'unitprices', // Replace with the actual name of the photos collection
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
                              input: '$unitPrice', // assuming this is the lookup result field for unit prices
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
                          // Check if any amenities match the amenitiesArray
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
                        0, // Ensure at least one match
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
                            // Condition for "Room" category based on total bed quantity
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Room'] },
                                {
                                  $gte: [
                                    {
                                      // Sum the qty of all beds across all bedRooms
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
                                                }, // Sum bed quantities
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                    Number(beds), // Compare total qty to `beds` parameter
                                  ],
                                },
                              ],
                            },
                            // Condition for "Whole-Place" category based on bedroom length
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Whole-Place'] },
                                {
                                  $gte: [
                                    { $size: '$$unit.bedRooms' },
                                    Number(bedrooms),
                                  ],
                                }, // Compare to bedrooms parameter
                              ],
                            },
                          ],
                        },
                        // Condition for bathrooms, only if bathrooms is not "any"
                        {
                          $or: [
                            { $eq: [bathrooms, 'any'] }, // Ignore if bathrooms is "any"
                            {
                              $gte: [
                                { $toInt: '$$unit.numBathRooms' }, // Convert to number
                                Number(bathrooms), // Compare to req.params.bathrooms
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
      res.json(
        response.success({
          items: bookableUnits[0].results,
          pageItemCount: bookableUnits[0].pageItemCount || 0,
          allItemCount: bookableUnits[0].allItemsCount || 0,
        })
      )
    } else if ((!location || location === 'any') && type && type !== 'any') {
      const arrayTypes = String(type)
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
        // If any whole place type is present, set `wholeplaceType` and `type` to WHOLE_PLACE
        query.wholeplaceType = {
          $in: selectedWholePlaceTypes,
        }
        query.type = 'WHOLE_PLACE'
      } else if (
        otherTypes.length > 0 &&
        selectedWholePlaceTypes.length === 0
      ) {
        // For non-whole place types, use $in and exclude WHOLE_PLACE
        query.type = {
          $in: otherTypes,
          $ne: 'WHOLE_PLACE',
        }
        // wholeplaceType should only apply for whole place types, so keep it null for non-whole-place types
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
        // Match the query
        { $match: query },

        // Lookup for the offerBy field and its nested guest field
        {
          $lookup: {
            from: 'users', // Replace with the actual name of the users collection
            localField: 'offerBy',
            foreignField: '_id',
            as: 'offerBy',
          },
        },
        { $unwind: { path: '$offerBy', preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: 'guests', // Replace with the actual name of the guests collection
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
            from: 'addresses', // Replace with the actual name of the guests collection
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
            from: 'photos', // Replace with the actual name of the photos collection
            localField: 'photos',
            foreignField: '_id',
            as: 'photos',
          },
        },
        {
          $lookup: {
            from: 'locations', // Replace with the actual name of the photos collection
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
            from: 'facilities', // Replace with the actual name of the photos collection
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
          // New stage to match if any facility has the facility
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
            from: 'policies', // Replace with the actual name of the photos collection
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
            from: 'bookableunittypes', // Replace with the actual name of the photos collection
            localField: 'bookableUnits',
            foreignField: '_id',
            as: 'bookableUnits',
          },
        },
        {
          $lookup: {
            from: 'unitprices', // Replace with the actual name of the photos collection
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
                              input: '$unitPrice', // assuming this is the lookup result field for unit prices
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
                          // Check if any amenities match the amenitiesArray
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
                        0, // Ensure at least one match
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
                            // Condition for "Room" category based on total bed quantity
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Room'] },
                                {
                                  $gte: [
                                    {
                                      // Sum the qty of all beds across all bedRooms
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
                                                }, // Sum bed quantities
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                    Number(beds), // Compare total qty to `beds` parameter
                                  ],
                                },
                              ],
                            },
                            // Condition for "Whole-Place" category based on bedroom length
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Whole-Place'] },
                                {
                                  $gte: [
                                    { $size: '$$unit.bedRooms' },
                                    Number(bedrooms),
                                  ],
                                }, // Compare to bedrooms parameter
                              ],
                            },
                          ],
                        },
                        // Condition for bathrooms, only if bathrooms is not "any"
                        {
                          $or: [
                            { $eq: [bathrooms, 'any'] }, // Ignore if bathrooms is "any"
                            {
                              $gte: [
                                { $toInt: '$$unit.numBathRooms' }, // Convert to number
                                Number(bathrooms), // Compare to req.params.bathrooms
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
      res.json(
        response.success({
          items: bookableUnits[0].results,
          pageItemCount: bookableUnits[0].pageItemCount || 0,
          allItemCount: bookableUnits[0].allItemsCount || 0,
        })
      )
    } else if (location && location !== 'any' && type && type !== 'any') {
      const arrayTypes = String(type)
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
        // If any whole place type is present, set `wholeplaceType` and `type` to WHOLE_PLACE
        query.wholeplaceType = {
          $in: selectedWholePlaceTypes,
        }
        query.type = 'WHOLE_PLACE'
      } else if (
        otherTypes.length > 0 &&
        selectedWholePlaceTypes.length === 0
      ) {
        // For non-whole place types, use $in and exclude WHOLE_PLACE
        query.type = {
          $in: otherTypes,
          $ne: 'WHOLE_PLACE',
        }
        // wholeplaceType should only apply for whole place types, so keep it null for non-whole-place types
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
        // Match the query
        { $match: query },

        // Lookup for the offerBy field and its nested guest field
        {
          $lookup: {
            from: 'users', // Replace with the actual name of the users collection
            localField: 'offerBy',
            foreignField: '_id',
            as: 'offerBy',
          },
        },
        { $unwind: { path: '$offerBy', preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: 'guests', // Replace with the actual name of the guests collection
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
            from: 'addresses', // Replace with the actual name of the guests collection
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
            from: 'photos', // Replace with the actual name of the photos collection
            localField: 'photos',
            foreignField: '_id',
            as: 'photos',
          },
        },
        {
          $lookup: {
            from: 'locations', // Replace with the actual name of the photos collection
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
            from: 'facilities', // Replace with the actual name of the photos collection
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
          // New stage to match if any facility has the facility
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
            from: 'policies', // Replace with the actual name of the photos collection
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
            from: 'bookableunittypes', // Replace with the actual name of the photos collection
            localField: 'bookableUnits',
            foreignField: '_id',
            as: 'bookableUnits',
          },
        },
        {
          $lookup: {
            from: 'unitprices', // Replace with the actual name of the photos collection
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
                              input: '$unitPrice', // assuming this is the lookup result field for unit prices
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
                          // Check if any amenities match the amenitiesArray
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
                        0, // Ensure at least one match
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
                            // Condition for "Room" category based on total bed quantity
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Room'] },
                                {
                                  $gte: [
                                    {
                                      // Sum the qty of all beds across all bedRooms
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
                                                }, // Sum bed quantities
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    },
                                    Number(beds), // Compare total qty to `beds` parameter
                                  ],
                                },
                              ],
                            },
                            // Condition for "Whole-Place" category based on bedroom length
                            {
                              $and: [
                                { $eq: ['$$unit.category', 'Whole-Place'] },
                                {
                                  $gte: [
                                    { $size: '$$unit.bedRooms' },
                                    Number(bedrooms),
                                  ],
                                }, // Compare to bedrooms parameter
                              ],
                            },
                          ],
                        },
                        // Condition for bathrooms, only if bathrooms is not "any"
                        {
                          $or: [
                            { $eq: [bathrooms, 'any'] }, // Ignore if bathrooms is "any"
                            {
                              $gte: [
                                { $toInt: '$$unit.numBathRooms' }, // Convert to number
                                Number(bathrooms), // Compare to req.params.bathrooms
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
      res.json(
        response.success({
          items: bookableUnits[0].results,
          pageItemCount: bookableUnits[0].pageItemCount || 0,
          allItemCount: bookableUnits[0].allItemsCount || 0,
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

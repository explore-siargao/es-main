import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities, dbLocations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getFilteredActivities = async (req: Request, res: Response) => {
  let { location, type, activityTpes, priceFrom, priceTo, duration } = req.query
  const { page, limit } = req.pagination || { page: 1, limit: 15 }
  const query: any = { deletedAt: null }
  try {
    if (!priceFrom || priceFrom === 'any') {
      priceFrom = '0'
    }
    if (!priceTo || priceTo === 'any') {
      priceTo = '999999999'
    }
    if (
      activityTpes &&
      typeof activityTpes === 'string' &&
      activityTpes !== 'any'
    ) {
      const activityTypesArray = activityTpes.split(',')
      const newActivitTypesArray = activityTypesArray
        .map((t: string) => t.trim())
        .filter((t: string) => t !== '')
        .map((t: string) => new RegExp(`^${t}$`, 'i'))
      query.activityType = { $in: newActivitTypesArray }
    }
    if (duration && duration !== 'any') {
      query.durationHour = Number(duration)
    }
    if ((!location || location === 'any') && type === 'any') {
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
    } else if (location && location !== 'any' && type === 'any') {
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
    } else if ((!location || location === 'any') && type && type !== 'any') {
      query.experienceType = new RegExp(`^${type}$`, 'i')
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
    } else if (location && location !== 'any' && type && type !== 'any') {
      query.experienceType = new RegExp(`^${type}$`, 'i')
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

import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities, dbLocations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getActivitiesByLocationAndType = async (
  req: Request,
  res: Response
) => {
  const { location, type } = req.params
  const { page, limit } = req.pagination || { page: 1, limit: 15 }
  if (!location || !type) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  } else {
    try {
      const query: any = { deletedAt: null }
      if (location === 'all' && type === 'all') {
        const activities = await dbActivities
          .find(query)
          .populate({
            path: 'host',
            select: '_id email role guest',
            populate: {
              path: 'guest',
              select:
                '_id firstName middleName lastName language currency address',
              populate: {
                path: 'address',
              },
            },
          })
          .populate('meetingPoint')
          .populate('photos')
          .skip((page - 1) * limit)
          .limit(limit)
        const totalCount = await dbActivities.countDocuments(query)

        res.json(
          response.success({
            items: activities,
            pageItemCount: activities.length,
            allItemCount: totalCount,
          })
        )
      } else if (location !== 'all' && type === 'all') {
        const locations = await dbLocations.find({
          $expr: {
            $eq: [{ $toUpper: '$city' }, location.toUpperCase()],
          },
          deletedAt: null,
        })
        const locationIds = locations.map((loc) => loc._id)
        query.meetingPoint = { $in: locationIds }
        const activities = await dbActivities
          .find(query)
          .populate({
            path: 'host',
            select: '_id email role guest',
            populate: {
              path: 'guest',
              select:
                '_id firstName middleName lastName language currency address',
              populate: {
                path: 'address',
              },
            },
          })
          .populate('meetingPoint')
          .populate('photos')
          .skip((page - 1) * limit)
          .limit(limit)
        const totalCount = await dbActivities.countDocuments(query)
        res.json(
          response.success({
            items: activities,
            pageItemCount: activities.length,
            allItemCount: totalCount,
          })
        )
      } else if (location === 'all' && type !== 'all') {
        query.experienceType = type
        const activities = await dbActivities
          .find(query)
          .populate({
            path: 'host',
            select: '_id email role guest',
            populate: {
              path: 'guest',
              select:
                '_id firstName middleName lastName language currency address',
              populate: {
                path: 'address',
              },
            },
          })
          .populate('meetingPoint')
          .populate('photos')
          .skip((page - 1) * limit)
          .limit(limit)
        const totalCount = await dbActivities.countDocuments(query)
        res.json(
          response.success({
            items: activities,
            pageItemCount: activities.length,
            allItemCount: totalCount,
          })
        )
      } else if (location !== 'all' && type !== 'all') {
        const locations = await dbLocations.find({
          $expr: {
            $eq: [{ $toUpper: '$city' }, location.toUpperCase()],
          },
          deletedAt: null,
        })
        const locationIds = locations.map((loc) => loc._id)
        query.meetingPoint = { $in: locationIds }
        query.experienceType = type
        const activities = await dbActivities
          .find(query)
          .populate({
            path: 'host',
            select: '_id email role guest',
            populate: {
              path: 'guest',
              select:
                '_id firstName middleName lastName language currency address',
              populate: {
                path: 'address',
              },
            },
          })
          .populate('meetingPoint')
          .populate('photos')
          .skip((page - 1) * limit)
          .limit(limit)
        const totalCount = await dbActivities.countDocuments(query)
        res.json(
          response.success({
            items: activities,
            pageItemCount: activities.length,
            allItemCount: totalCount,
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
}

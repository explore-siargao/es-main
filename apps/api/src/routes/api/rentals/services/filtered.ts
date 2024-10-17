import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbLocations, dbRentals } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()
export const getRentalsByLocationAndType = async (
  req: Request,
  res: Response
) => {
  const { location, type } = req.params
  const { page, limit } = req.pagination || { page: 1, limit: 15 } // Default values if pagination is not set

  if (!location || !type) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  } else {
    try {
      const query: any = { deletedAt: null, status: 'Live' }
      if (location === 'all' && type === 'all') {
        const rentals = await dbRentals
          .find(query)
          .populate('details')
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
          .populate('addOns')
          .populate('pricing')
          .populate('photos')
          .populate('location')
          .skip((page - 1) * limit) // Apply pagination
          .limit(limit) // Limit results

        const totalCount = await dbRentals.countDocuments(query) // Get total count for pagination

        res.json(
          response.success({
            items: rentals,
            pageItemCount: rentals.length,
            allItemCount: totalCount,
          })
        )
      } else if (location !== 'all' && type === 'all') {
        const locations = await dbLocations.find({
          city: location,
          deletedAt: null,
        })

        // Extract the _id of the locations
        const locationIds = locations.map((loc) => loc._id) // Use the ObjectId directly
        query.location = { $in: locationIds }
        const rentals = await dbRentals
          .find(query)
          .populate('details')
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
          .populate('addOns')
          .populate('pricing')
          .populate('photos')
          .populate('location')
          .skip((page - 1) * limit)
          .limit(limit)

        // Get the total count for pagination
        const totalCount = await dbRentals.countDocuments(query)

        res.json(
          response.success({
            items: rentals,
            pageItemCount: rentals.length,
            allItemCount: totalCount,
          })
        )
      } else if (location !== 'all' && type !== 'all') {
        const locations = await dbLocations.find({
          city: location,
          deletedAt: null,
        })
        // Extract the _id of the locations
        const locationIds = locations.map((loc) => loc._id) // Use the ObjectId directly
        query.location = { $in: locationIds }
        query.category = type
        const rentals = await dbRentals
          .find(query)
          .populate('details')
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
          .populate('addOns')
          .populate('pricing')
          .populate('photos')
          .populate('location')
          .skip((page - 1) * limit)
          .limit(limit)

        // Get the total count for pagination
        const totalCount = await dbRentals.countDocuments(query)

        res.json(
          response.success({
            items: rentals,
            pageItemCount: rentals.length,
            allItemCount: totalCount,
          })
        )
      } else if (location === 'all' && type !== 'all') {
        query.category = type
        const rentals = await dbRentals
          .find(query)
          .populate('details')
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
          .populate('addOns')
          .populate('pricing')
          .populate('photos')
          .populate('location')
          .skip((page - 1) * limit) // Apply pagination
          .limit(limit) // Limit results

        const totalCount = await dbRentals.countDocuments(query) // Get total count for pagination

        res.json(
          response.success({
            items: rentals,
            pageItemCount: rentals.length,
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

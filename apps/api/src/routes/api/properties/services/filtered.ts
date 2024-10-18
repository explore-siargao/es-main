import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbLocations, dbProperties } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getBookableUnitsByLocationAndTypes = async (
  req: Request,
  res: Response
) => {
  const { location, type } = req.params
  const query: any = {
    bookableUnits: { $exists: true, $not: { $size: 0 } },
    deletedAt: null,
  }

  const { page, limit } = req.pagination || { page: 1, limit: 10 }
  if (!location || !type) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  } else {
    try {
      if (location === 'all' && type === 'all') {
        const bookableUnits = await dbProperties
          .find(query)
          .populate({
            path: 'offerBy',
            select: '_id email role guest',
            populate: {
              path: 'guest',
              select:
                '_id firstName middleName lastName language country currency',
            },
          })
          .populate('photos')
          .populate('location')
          .populate({
            path: 'bookableUnits',
            populate: [
              {
                path: 'unitPrice',
              },
              {
                path: 'photos',
              },
            ],
          })
          .skip((page - 1) * limit)
          .limit(limit)
        const totalCounts = await dbProperties.find(query).countDocuments()
        res.json(
          response.success({
            items: bookableUnits,
            pageItemCount: bookableUnits.length,
            allItemCount: totalCounts,
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
        query.location = { $in: locationIds }
        const bookableUnits = await dbProperties
          .find(query)
          .populate({
            path: 'offerBy',
            select: '_id email role guest',
            populate: {
              path: 'guest',
              select:
                '_id firstName middleName lastName language country currency',
            },
          })
          .populate('photos')
          .populate('location')
          .populate({
            path: 'bookableUnits',
            populate: [
              {
                path: 'unitPrice',
              },
              {
                path: 'photos',
              },
            ],
          })
          .skip((page - 1) * limit)
          .limit(limit)
        const totalCounts = await dbProperties.find(query).countDocuments()
        res.json(
          response.success({
            items: bookableUnits,
            pageItemCount: bookableUnits.length,
            allItemCount: totalCounts,
          })
        )
      } else if (location === 'all' && type !== 'all') {
        if (String(type).toUpperCase() === 'VILLA') {
          query.wholeplaceType = 'VILLA'
          query.type = 'WHOLE_PLACE'
          const bookableUnits = await dbProperties
            .find(query)
            .populate({
              path: 'offerBy',
              select: '_id email role guest',
              populate: {
                path: 'guest',
                select:
                  '_id firstName middleName lastName language country currency',
              },
            })
            .populate('photos')
            .populate('location')
            .populate({
              path: 'bookableUnits',
              populate: [
                {
                  path: 'unitPrice',
                },
                {
                  path: 'photos',
                },
              ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
          const totalCounts = await dbProperties.find(query).countDocuments()
          res.json(
            response.success({
              items: bookableUnits,
              pageItemCount: bookableUnits.length,
              allItemCount: totalCounts,
            })
          )
        } else if (String(type).toUpperCase() === 'HOUSE') {
          query.wholeplaceType = 'HOUSE'
          query.type = 'WHOLE_PLACE'
          const bookableUnits = await dbProperties
            .find(query)
            .populate({
              path: 'offerBy',
              select: '_id email role guest',
              populate: {
                path: 'guest',
                select:
                  '_id firstName middleName lastName language country currency',
              },
            })
            .populate('photos')
            .populate('location')
            .populate({
              path: 'bookableUnits',
              populate: [
                {
                  path: 'unitPrice',
                },
                {
                  path: 'photos',
                },
              ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
          const totalCounts = await dbProperties.find(query).countDocuments()
          res.json(
            response.success({
              items: bookableUnits,
              pageItemCount: bookableUnits.length,
              allItemCount: totalCounts,
            })
          )
        } else if (String(type).toUpperCase() === 'BUNGALOW') {
          query.wholeplaceType = 'BUNGALOW'
          query.type = 'WHOLE_PLACE'
          const bookableUnits = await dbProperties
            .find(query)
            .populate({
              path: 'offerBy',
              select: '_id email role guest',
              populate: {
                path: 'guest',
                select:
                  '_id firstName middleName lastName language country currency',
              },
            })
            .populate('photos')
            .populate('location')
            .populate({
              path: 'bookableUnits',
              populate: [
                {
                  path: 'unitPrice',
                },
                {
                  path: 'photos',
                },
              ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
          const totalCounts = await dbProperties.find(query).countDocuments()
          res.json(
            response.success({
              items: bookableUnits,
              pageItemCount: bookableUnits.length,
              allItemCount: totalCounts,
            })
          )
        } else if (String(type).toUpperCase() === 'COTTAGE') {
          query.wholeplaceType = 'COTTAGE'
          query.type = 'WHOLE_PLACE'
          const bookableUnits = await dbProperties
            .find(query)
            .populate({
              path: 'offerBy',
              select: '_id email role guest',
              populate: {
                path: 'guest',
                select:
                  '_id firstName middleName lastName language country currency',
              },
            })
            .populate('photos')
            .populate('location')
            .populate({
              path: 'bookableUnits',
              populate: [
                {
                  path: 'unitPrice',
                },
                {
                  path: 'photos',
                },
              ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
          const totalCounts = await dbProperties.find(query).countDocuments()
          res.json(
            response.success({
              items: bookableUnits,
              pageItemCount: bookableUnits.length,
              allItemCount: totalCounts,
            })
          )
        } else {
          query.type = {
            $eq: String(type).toUpperCase(),
            $ne: 'WHOLE_PLACE',
          }
          query.wholeplaceType = null
          const bookableUnits = await dbProperties
            .find(query)
            .populate({
              path: 'offerBy',
              select: '_id email role guest',
              populate: {
                path: 'guest',
                select:
                  '_id firstName middleName lastName language country currency',
              },
            })
            .populate('photos')
            .populate('location')
            .populate({
              path: 'bookableUnits',
              populate: [
                {
                  path: 'unitPrice',
                },
                {
                  path: 'photos',
                },
              ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
          const totalCounts = await dbProperties.find(query).countDocuments()
          res.json(
            response.success({
              items: bookableUnits,
              pageItemCount: bookableUnits.length,
              allItemCount: totalCounts,
            })
          )
        }
      } else if (location !== 'all' && type !== 'all') {
        const locations = await dbLocations.find({
          $expr: {
            $eq: [{ $toUpper: '$city' }, location.toUpperCase()],
          },
          deletedAt: null,
        })
        const locationIds = locations.map((loc) => loc._id)
        query.location = { $in: locationIds }
        if (String(type).toUpperCase() === 'VILLA') {
          query.wholeplaceType = 'VILLA'
          query.type = 'WHOLE_PLACE'
          const bookableUnits = await dbProperties
            .find(query)
            .populate({
              path: 'offerBy',
              select: '_id email role guest',
              populate: {
                path: 'guest',
                select:
                  '_id firstName middleName lastName language country currency',
              },
            })
            .populate('photos')
            .populate('location')
            .populate({
              path: 'bookableUnits',
              populate: [
                {
                  path: 'unitPrice',
                },
                {
                  path: 'photos',
                },
              ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
          const totalCounts = await dbProperties.find(query).countDocuments()
          res.json(
            response.success({
              items: bookableUnits,
              pageItemCount: bookableUnits.length,
              allItemCount: totalCounts,
            })
          )
        } else if (String(type).toUpperCase() === 'HOUSE') {
          query.wholeplaceType = 'HOUSE'
          query.type = 'WHOLE_PLACE'
          const bookableUnits = await dbProperties
            .find(query)
            .populate({
              path: 'offerBy',
              select: '_id email role guest',
              populate: {
                path: 'guest',
                select:
                  '_id firstName middleName lastName language country currency',
              },
            })
            .populate('photos')
            .populate('location')
            .populate({
              path: 'bookableUnits',
              populate: [
                {
                  path: 'unitPrice',
                },
                {
                  path: 'photos',
                },
              ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
          const totalCounts = await dbProperties.find(query).countDocuments()
          res.json(
            response.success({
              items: bookableUnits,
              pageItemCount: bookableUnits.length,
              allItemCount: totalCounts,
            })
          )
        } else if (String(type).toUpperCase() === 'BUNGALOW') {
          query.wholeplaceType = 'BUNGALOW'
          query.type = 'WHOLE_PLACE'
          const bookableUnits = await dbProperties
            .find(query)
            .populate({
              path: 'offerBy',
              select: '_id email role guest',
              populate: {
                path: 'guest',
                select:
                  '_id firstName middleName lastName language country currency',
              },
            })
            .populate('photos')
            .populate('location')
            .populate({
              path: 'bookableUnits',
              populate: [
                {
                  path: 'unitPrice',
                },
                {
                  path: 'photos',
                },
              ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
          const totalCounts = await dbProperties.find(query).countDocuments()
          res.json(
            response.success({
              items: bookableUnits,
              pageItemCount: bookableUnits.length,
              allItemCount: totalCounts,
            })
          )
        } else if (String(type).toUpperCase() === 'COTTAGE') {
          query.wholeplaceType = 'COTTAGE'
          query.type = 'WHOLE_PLACE'
          const bookableUnits = await dbProperties
            .find(query)
            .populate({
              path: 'offerBy',
              select: '_id email role guest',
              populate: {
                path: 'guest',
                select:
                  '_id firstName middleName lastName language country currency',
              },
            })
            .populate('photos')
            .populate('location')
            .populate({
              path: 'bookableUnits',
              populate: [
                {
                  path: 'unitPrice',
                },
                {
                  path: 'photos',
                },
              ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
          const totalCounts = await dbProperties.find(query).countDocuments()
          res.json(
            response.success({
              items: bookableUnits,
              pageItemCount: bookableUnits.length,
              allItemCount: totalCounts,
            })
          )
        } else {
          query.type = {
            $eq: String(type).toUpperCase(),
            $ne: 'WHOLE_PLACE',
          }
          query.wholeplaceType = null
          const bookableUnits = await dbProperties
            .find(query)
            .populate({
              path: 'offerBy',
              select: '_id email role guest',
              populate: {
                path: 'guest',
                select:
                  '_id firstName middleName lastName language country currency',
              },
            })
            .populate('photos')
            .populate('location')
            .populate({
              path: 'bookableUnits',
              populate: [
                {
                  path: 'unitPrice',
                },
                {
                  path: 'photos',
                },
              ],
            })
            .skip((page - 1) * limit)
            .limit(limit)
          const totalCounts = await dbProperties.find(query).countDocuments()
          res.json(
            response.success({
              items: bookableUnits,
              pageItemCount: bookableUnits.length,
              allItemCount: totalCounts,
            })
          )
        }
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
}

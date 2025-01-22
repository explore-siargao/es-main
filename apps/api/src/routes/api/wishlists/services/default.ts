import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import {
  dbActivities,
  dbProperties,
  dbRentals,
  dbWishlists,
} from '@repo/database'
import { Request, Response } from 'express'
import { capitalizeFirstLetter } from '../helpers/fn'

const response = new ResponseService()
export const addToWishList = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const category = req.params.category
  const smallCategory = String(category).toLowerCase()
  const listingId = req.body.listingId
  if (!listingId || !category || !userId) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  } else {
    try {
      const formattedCategory = capitalizeFirstLetter(smallCategory)
      const createWishlist = async () => {
        const existing = await dbWishlists.findOne({
          userId: userId,
          listingId: listingId,
          deletedAt: null,
        })
        if (!existing) {
          const newWishList = new dbWishlists({
            userId,
            category: formattedCategory,
            listingId,
            createdAt: Date.now(),
            updatedAt: null,
            deletedAt: null,
          })
          await newWishList.save()
          res.json(
            response.success({
              item: newWishList,
              message: 'Item added to wishlist',
            })
          )
        } else {
          res.json(
            response.error({ message: 'Item already exist on your wishlist' })
          )
        }
      }
      if (formattedCategory === 'Properties') {
        const checkProperty = await dbProperties.findOne({
          _id: listingId,
          deletedAt: null,
        })
        if (!checkProperty) {
          res.json(response.error({ message: 'Invalid listingId' }))
        } else {
          createWishlist()
        }
      } else if (formattedCategory === 'Activities') {
        const checkActivity = await dbActivities.findOne({
          _id: listingId,
          deletedAt: null,
        })
        if (!checkActivity) {
          res.json(response.error({ message: 'Invalid listingId' }))
        } else {
          createWishlist()
        }
      } else if (formattedCategory === 'Rentals') {
        const checkRentals = await dbRentals.findOne({
          _id: listingId,
          deletedAt: null,
        })
        if (!checkRentals) {
          res.json(response.error({ message: 'Invalid listingId' }))
        } else {
          createWishlist()
        }
      } else {
        res.json(response.error({ message: 'Invalid category' }))
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

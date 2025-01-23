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
import path from 'path'
import { convertPrice } from '@/common/helpers/convert-price'
import { Z_Add_Wishlist, Z_Wishlists } from '@repo/contract-2/wishlist'

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
      const validWishlist = Z_Add_Wishlist.safeParse({
        category:formattedCategory,
        listingId,
      })
      if(validWishlist.success){
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
    }else{
      console.error(validWishlist.error.message)
      res.json(response.error({message:"Invalid payload"}))
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

export const getAllWishlistbyCategory = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const category = req.params.category
  const preferredCurrency = res.locals.currency.preferred
  const conversionRates = res.locals.currency.conversionRates
  const smallCategory = String(category).toLowerCase()
  const capitalizedCategory = capitalizeFirstLetter(smallCategory)
  const page = Number(req.query.page) || 1
  const limit = 15
  const skip = (page - 1) * limit
  try {
    const getWishlist = async () => {
      const wishlist = await dbWishlists
        .find({
          userId: userId,
          category: capitalizedCategory,
          deletedAt: null,
        })
        .populate({
          path: 'listing',
          select: `title location photos type bookableUnits
                   year make modelBadge bodyType fuel transmission category pricing 
                   activityType experienceType pricePerPerson pricePerSlot meetingPoint`,
          populate: [
            {
              path:
                capitalizedCategory === 'Properties'
                  ? 'photos location bookableUnits'
                  : capitalizedCategory === 'Rentals'
                    ? 'photos location pricing'
                    : 'photos meetingPoint',
            },
            ...(capitalizedCategory === 'Properties'
              ? [
                  {
                    path: 'bookableUnits',
                    populate: {
                      path: 'unitPrice', // Populate unitPrice inside bookableUnits
                    },
                  },
                ]
              : []),
          ],
        })
        .skip(skip)
        .limit(limit)
      const wishlistCounts = await dbWishlists
        .find({
          userId: userId,
          category: capitalizedCategory,
          deletedAt: null,
        })
        .countDocuments()
      const objectWishList = wishlist.map((item: any) => item.toObject())
      const modifiedWishlist = objectWishList.map((item: any) => {
        return {
          ...item,
          listing: {
            _id:item.listing._id,
            title:
              capitalizedCategory === 'Properties' ||
              capitalizedCategory === 'Activities'
                ? item.listing.title
                : `${item.listing.year} ${item.listing.make} ${item.listing.modelBadge}`,
            subTitle:
              capitalizedCategory === 'Properties'
                ? item.listing.type === 'WHOLE_PLACE'
                  ? `Whole Place in ${item.listing.location.city}`
                  : `${item.listing.type} in ${item.listing.location.city}`
                : capitalizedCategory === 'Activities'
                  ? `${item.listing.activityType[0]} in ${item.listing.meetingPoint.city}`
                  : capitalizedCategory === 'Rentals'
                    ? `${item.listing.category} in ${item.listing.location.city}`
                    : null,
             subTitle2:
              capitalizedCategory === 'Rentals'
              ? `${item.listing.fuel} - ${item.listing.transmission}` : null,
              price:convertPrice(capitalizedCategory === "Properties" ?
              item.listing.bookableUnits.reduce((min:any,unit:any)=>{
                return unit.unitPrice.baseRate < min ? unit.unitPrice.baseRate :min
              }, Infinity) :
              capitalizedCategory === "Activities" ?
              item.listing.experienceType === "Private" ? item.listing.pricePerSlot : item.listing.pricePerPerson 
              : item.listing.pricing.dayRate,preferredCurrency,conversionRates),
              photos:item.listing.photos
          },
        }
      })
      const validWishlists = Z_Wishlists.safeParse(modifiedWishlist)
      if(validWishlists.success){
      res.json(
        response.success({
          items: modifiedWishlist,
          pageItemCount: wishlist.length,
          allItemCount: wishlistCounts,
        })
      )
    }else{
      console.error(validWishlists.error.message)
      res.json(response.error({message:"Invalid wishlist data"}))
    }
    }
    if (
      capitalizedCategory === 'Properties' ||
      capitalizedCategory === 'Activities' ||
      capitalizedCategory === 'Rentals'
    ) {
    if (
      capitalizedCategory === 'Properties' ||
      capitalizedCategory === 'Activities' ||
      capitalizedCategory === 'Rentals'
    ) {
      getWishlist()
    } else {
      res.json(response.error({ message: 'Invalid category' }))
    }
  }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

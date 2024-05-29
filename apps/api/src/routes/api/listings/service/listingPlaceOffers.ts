import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Z_ListingPlaceOffer } from '@repo/contract'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

export const getAllListingPlaceOffers = async (req: Request, res: Response) => {
  try {
    const getListingPlaceOffers = await prisma.listingPlaceOffers.findMany({
      where: {
        deletedAt: null,
        placeOffer: {
          id: {
            not: undefined,
          },
        },
      },
      include: {
        placeOffer: true,
      },
    })
    if (getListingPlaceOffers.length !== 0) {
      res.json(
        response.success({
          items: getListingPlaceOffers,
          allItemCount: getListingPlaceOffers.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: getListingPlaceOffers,
          allItemCount: getListingPlaceOffers.length,
          message: 'No Listing place offers found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getListingPlaceOffersByListing = async (
  req: Request,
  res: Response
) => {
  const listingId = Number(req.params.listingId)
  try {
    const getListing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    })
    if (getListing) {
      const allListingPlaceOffersByListing =
        await prisma.listingPlaceOffers.findMany({
          where: {
            listingId: listingId,
            placeOffer: {
              id: {
                not: undefined,
              },
            },
          },
          include: {
            placeOffer: true,
          },
        })
      res.json(
        response.success({
          items: allListingPlaceOffersByListing,
          allItemCount: allListingPlaceOffersByListing.length,
          message: '',
        })
      )
    } else {
      res.json(response.error({ message: 'Listing not found in our system' }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const addListingPlaceOffer = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const { listingId, placeOfferId } = req.body
  const inputIsValid = Z_ListingPlaceOffer.safeParse(req.body)

  if (!inputIsValid.success) {
    return res.json(
      response.error({ message: JSON.parse(inputIsValid.error.message) })
    )
  }
  try {
    if (!listingId || !placeOfferId) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }

    const getUser = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    const getListingPlaceOffer = await prisma.listingPlaceOffers.findFirst({
      where: {
        listingId: listingId,
        placeOfferId: placeOfferId,
      },
    })

    if (getListingPlaceOffer) {
      return res.json(
        response.error({
          message: 'Place offer already assigned to this listing',
        })
      )
    }

    const newListingPlaceOffer = await prisma.listingPlaceOffers.create({
      data: {
        listingId: listingId,
        placeOfferId: placeOfferId,
      },
    })

    res.json(
      response.success({
        item: newListingPlaceOffer,
        allItemCount: 1,
        message: 'Place Offer successfully added to listing',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const deleteListingPlaceOffer = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const listingPlaceOfferId = Number(req.params.listingPlaceOfferId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getListingPlaceOffer = await prisma.listingPlaceOffers.findUnique({
      where: {
        id: listingPlaceOfferId,
      },
    })
    if (getUser) {
      if (getListingPlaceOffer) {
        const removeListingPlaceOffer = await prisma.listingPlaceOffers.delete({
          where: {
            id: listingPlaceOfferId,
          },
        })
        res.json(
          response.success({
            item: removeListingPlaceOffer,
            allItemCount: 1,
            message: 'Listing Place offer successfully deleted',
          })
        )
      } else {
        res.json(
          response.error({
            message: 'Listing Place offer not exist or already deleted',
          })
        )
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

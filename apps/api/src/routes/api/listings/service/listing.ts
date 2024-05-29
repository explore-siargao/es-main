import { Response, Request } from 'express'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_Listing } from '@repo/contract'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()
export const getAllListing = async (req: Request, res: Response) => {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        listingDescription: true,
        price: true,
        highLights: {
          include: {
            highlights: true,
          },
        },
        hostedBy: true,
        placeOffers: {
          include: {
            placeOffer: true,
          },
        },
        houseRules: true,
        safetyProperties: true,
        cancellationPolicies: true,
        review: true,
        wishes: true,
      },
    })
    if (listings.length > 0) {
      const customListings = listings.map((customListing: any) => ({
        id: customListing.id,
        images: JSON.parse(customListing.images),
        address: customListing.address,
        price:
          customListing.price.fee +
          customListing.price.serviceFee +
          customListing.price.cleaningFee,
        ratings: '0.0',
        distance: '10 kilometer away',
        dayTime: '',
        wishes: customListing.wishes,
      }))
      res.json(
        response.success({
          items: customListings,
          allItemCount: customListings.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: listings,
          allItemCount: listings.length,
          message: 'No data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getListing = async (req: Request, res: Response) => {
  try {
    const listing = await prisma.listing.findFirst({
      where: { id: Number(req.params.id) },
      include: {
        listingDescription: true,
        basicAboutPlace: true,
        price: true,
        highLights: true,
        hostedBy: true,
        placeOffers: true,
        houseRules: {
          include: {
            rules: true,
          },
        },
        safetyProperties: {
          include: {
            rules: true,
          },
        },
        cancellationPolicies: {
          include: {
            rules: true,
          },
        },
        review: true,
      },
    })
    if (listing !== null) {
      const newResult = { ...listing }
      newResult.images = JSON.parse(listing.images)
      newResult.whereYoullBe = JSON.parse(listing.whereYoullBe)
      newResult.whereYoullSleep = JSON.parse(listing.whereYoullSleep)
      res.json(
        response.success({
          item: newResult,
        })
      )
    } else {
      res.json(
        response.success({
          item: listing,
          message: 'No data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const addListing = async (req: Request, res: Response) => {
  const hostId = Number(req.params.hostId)
  const isValidInput = Z_Listing.safeParse(req.body)
  const {
    images,
    title,
    category,
    address,
    fee,
    latitude,
    longitude,
    cleaningFee,
    serviceFee,
    checkIn,
    checkOut,
    guestLimitCount,
    isNight,
    guests,
    bedRooms,
    beds,
    bathRooms,
    whereYoullBe,
    whereYoullSleep,
  } = req.body
  if (isValidInput.success) {
    try {
      const getHost = await prisma.user.findFirst({
        where: {
          id: hostId,
          isHost: true,
        },
      })

      if (getHost !== null) {
        if (
          (images &&
            title &&
            category &&
            address &&
            fee &&
            cleaningFee &&
            serviceFee &&
            checkIn &&
            checkOut &&
            guestLimitCount &&
            guests &&
            bedRooms &&
            beds &&
            bathRooms) ||
          whereYoullBe ||
          whereYoullSleep
        ) {
          const newPrice = await prisma.listingPrice.create({
            data: {
              fee: fee,
              cleaningFee: cleaningFee,
              serviceFee: serviceFee,
              guestLimitCount: guestLimitCount,
            },
          })

          const newBasicAboutPlace = await prisma.basicAboutPlace.create({
            data: {
              guests: guests,
              bedRooms: bedRooms,
              beds: beds,
              bathRooms: bathRooms,
            },
          })
          const newListing = await prisma.listing.create({
            data: {
              images: JSON.stringify(images),
              title: title,
              category: category,
              address: address,
              longitude: longitude,
              latitude: latitude,
              hostedById: hostId,
              listingPriceId: Number(newPrice.id),
              basicAboutPlaceId: Number(newBasicAboutPlace.id),
              whereYoullBe: JSON.stringify(whereYoullBe),
              whereYoullSleep: JSON.stringify(whereYoullSleep),
            },
          })

          res.json(
            response.success({
              item: newListing,
              allItemCount: 1,
              message: 'Listing item successfully added',
            })
          )
        } else {
          res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
        }
      } else {
        res.json(
          response.error({ message: 'This host not exist to our system' })
        )
      }
    } catch (e: any) {
      res.json(response.error({ message: e.message }))
    }
  } else {
    res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }
}

export const updateListing = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  const { images, title, category, address, latitude, longitude } = req.body
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getListing = await prisma.listing.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getListing) {
      return res.json(response.error({ message: 'Listing not found' }))
    }
    if (getListing.hostedById !== getUser.id) {
      return res.json(
        response.error({
          message: 'You are not the host of this listing, Updating not allowed',
        })
      )
    }
    if (images || title || category || address || latitude || longitude) {
      const updateListing = await prisma.listing.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          category: category,
          images: images,
          address: address,
          longitude: longitude,
          latitude: latitude,
        },
      })
      res.json(
        response.success({
          item: updateListing,
          allItemCount: 1,
          message: 'Listing successfully updated',
        })
      )
    } else {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const deleteListing = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const userId = Number(req.params.userId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getListing = await prisma.listing.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getListing) {
      return res.json(response.error({ message: 'Listing not found' }))
    }
    if (getUser.id !== getListing.hostedById) {
      return res.json(
        response.error({
          message: 'You are not the host of this listing, Deleting not allowed',
        })
      )
    }
    const removeListing = await prisma.$transaction([
      prisma.listingHighLights.deleteMany({
        where: {
          listingId: id,
        },
      }),
      prisma.listingPlaceOffers.deleteMany({
        where: {
          listingId: id,
        },
      }),
      prisma.wishGroup.deleteMany({
        where: {
          listingId: id,
        },
      }),
      prisma.listing.delete({
        where: {
          id: id,
        },
      }),
    ])
    res.json(
      response.success({
        item: removeListing[3],
        allItemCount: 1,
        message: 'Listing sucessfully deleted',
      })
    )
  } catch (err: any) {
    return res.json(response.error({ message: err.message }))
  }
}

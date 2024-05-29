import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Z_ListingHighlight } from '@repo/contract'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

export const getAllListingHighlights = async (req: Request, res: Response) => {
  try {
    const allListingHighlights = await prisma.listingHighLights.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        highlights: true,
      },
    })
    if (allListingHighlights.length !== 0) {
      res.json(
        response.success({
          items: allListingHighlights,
          allItemCount: allListingHighlights.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: allListingHighlights,
          allItemCount: allListingHighlights.length,
          message: 'No Listing Highlights data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getListingHighlightsByListing = async (
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
      const allListingHighlightsByListing =
        await prisma.listingHighLights.findMany({
          where: {
            listingId: listingId,
          },
          include: {
            highlights: true,
          },
        })
      if (allListingHighlightsByListing.length !== 0) {
        res.json(
          response.success({
            items: allListingHighlightsByListing,
            allItemCount: allListingHighlightsByListing.length,
            message: '',
          })
        )
      } else {
        res.json(
          response.success({
            items: allListingHighlightsByListing,
            allItemCount: allListingHighlightsByListing.length,
            message: 'No Listing highlights assigned to the listing',
          })
        )
      }
    } else {
      res.json(response.error({ message: 'Listing not found in our system' }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const addListingHighlight = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const { listingId, highlightId } = req.body
  const inputIsValid = Z_ListingHighlight.safeParse(req.body)

  if (!inputIsValid.success) {
    return res.json(
      response.error({ message: JSON.parse(inputIsValid.error.message) })
    )
  }

  try {
    if (!listingId || !highlightId) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }

    const getUser = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }

    const getListingHighLight = await prisma.listingHighLights.findFirst({
      where: {
        listingId: listingId,
        highLightsId: highlightId,
      },
    })

    if (getListingHighLight) {
      return res.json(
        response.error({ message: 'ListingHighlight already exists' })
      )
    }

    const newListingHighLight = await prisma.listingHighLights.create({
      data: {
        listingId: listingId,
        highLightsId: highlightId,
      },
    })

    res.json(
      response.success({
        item: newListingHighLight,
        allItemCount: 1,
        message: 'Highlight successfully added to listing',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const deleteListingHighlight = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const listingHighlightId = Number(req.params.listingHighlightId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getListingHighlight = await prisma.listingHighLights.findUnique({
      where: {
        id: listingHighlightId,
      },
    })
    if (getUser) {
      if (getListingHighlight) {
        const removeListingHighlight = await prisma.listingHighLights.delete({
          where: {
            id: listingHighlightId,
          },
        })
        res.json(
          response.success({
            item: removeListingHighlight,
            allItemCount: 1,
            message: 'Listing Highlight successfully deleted',
          })
        )
      } else {
        res.json(
          response.error({
            message: 'Listing highlight not exist or already deleted',
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

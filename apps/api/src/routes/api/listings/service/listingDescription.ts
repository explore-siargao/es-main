import { prisma } from '@/common/helpers/prismaClient'
import { ResponseService } from '@/common/service/response'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_EXIST,
} from '@/common/constants'
import { Z_ListingDescription } from '@repo/contract'
import { Request, Response } from 'express'
const response = new ResponseService()

export const getDescription = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const getDescriptionById = await prisma.listingDescription.findUnique({
      where: {
        id: id,
      },
    })
    if (getDescriptionById) {
      res.json(
        response.success({
          item: getDescriptionById,
          allItemCount: 1,
          message: '',
        })
      )
    } else {
      res.json(response.error({ message: 'No listing description found' }))
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const getDescriptionByListing = async (req: Request, res: Response) => {
  const listingId = Number(req.params.listingId)
  try {
    const getDescriptionByListingId =
      await prisma.listingDescription.findUnique({
        where: {
          id: listingId,
        },
      })
    if (getDescriptionByListingId) {
      res.json(
        response.success({
          item: getDescriptionByListingId,
          allItemCount: 1,
          message: '',
        })
      )
    } else {
      res.json(response.error({ message: 'No listing description found' }))
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const addDescription = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const listingId = Number(req.params.listingId)
  const { generalDescription, aboutSpace, aboutGuestAccess, otherThingsNote } =
    req.body
  const isValidInput = Z_ListingDescription.safeParse(req.body)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getListing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getListing) {
      return res.json(response.error({ message: 'Listing not found' }))
    }
    if (!isValidInput.success) {
      return res.json(
        response.error({ message: JSON.parse(isValidInput.error.message) })
      )
    }
    const newDescription = await prisma.listingDescription.create({
      data: {
        listingId: listingId,
        generalDescription: generalDescription,
        aboutSpace: aboutSpace,
        aboutGuestAccess: aboutGuestAccess,
        otherThingsNote: otherThingsNote,
      },
    })
    const updateListing = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        descriptionId: newDescription.id,
      },
    })
    res.json(
      response.success({
        item: [newDescription, updateListing],
        allItemCount: 1,
        message: 'Listing description successfully added',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const updateDescription = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  const { generalDescription, aboutSpace, aboutGuestAccess, otherThingsNote } =
    req.body
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getDescription = await prisma.listingDescription.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getDescription) {
      return res.json(
        response.error({ message: 'Listing description not found' })
      )
    }
    if (
      generalDescription &&
      (aboutSpace || aboutGuestAccess || otherThingsNote)
    ) {
      const updateListingDescription = await prisma.listingDescription.update({
        where: {
          id: id,
        },
        data: {
          generalDescription: generalDescription,
          aboutSpace: aboutSpace,
          aboutGuestAccess: aboutGuestAccess,
          otherThingsNote: otherThingsNote,
        },
      })
      res.json(
        response.success({
          item: updateListingDescription,
          allItemCount: 1,
          message: 'Listing description successfully updated',
        })
      )
    } else {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

export const deleteDescription = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getDescription = await prisma.listingDescription.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getDescription) {
      return res.json(
        response.error({ message: 'Listing description not found' })
      )
    }
    const removeListingDescription = await prisma.listingDescription.delete({
      where: {
        id: id,
      },
    })
    res.json(
      response.success({
        item: removeListingDescription,
        allItemCount: 1,
        message: 'Listing description successfully updated',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message: message }))
  }
}

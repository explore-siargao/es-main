import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

export const getAllCancellationPolicies = async (
  req: Request,
  res: Response
) => {
  try {
    const allCancelationPolicies = await prisma.cancellationPolicy.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        rules: true,
      },
    })
    if (allCancelationPolicies.length !== 0) {
      res.json(
        response.success({
          items: allCancelationPolicies,
          allItemCount: allCancelationPolicies.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: allCancelationPolicies,
          allItemCount: allCancelationPolicies.length,
          message: 'No Cancellation policies data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getCancellationPoliciesByListing = async (
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
    if (!getListing) {
      return res.json(response.error({ message: 'Listing data not found' }))
    }
    const getAllCancellationPoliciesByListingId =
      await prisma.cancellationPolicy.findMany({
        where: {
          listingId: listingId,
        },
      })
    if (getAllCancellationPoliciesByListingId.length !== 0) {
      res.json(
        response.success({
          items: getAllCancellationPoliciesByListingId,
          allItemCount: getAllCancellationPoliciesByListingId.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: getAllCancellationPoliciesByListingId,
          allItemCount: getAllCancellationPoliciesByListingId.length,
          message: 'No cancellation policies assign to this listing',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getCancellationPolicy = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const getCancellationPolicyById = await prisma.cancellationPolicy.findFirst(
      {
        where: {
          id: id,
        },
      }
    )
    if (getCancellationPolicyById) {
      res.json(
        response.success({
          item: getCancellationPolicyById,
          allItemCount: 1,
          message: '',
        })
      )
    } else {
      res.json(
        response.error({ message: 'Cancellation Policy data not found' })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const updateCancellationPolicy = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  const { title, cancelationDueDate } = req.body
  try {
    if (title || cancelationDueDate) {
      const getUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
      const getCancellationPolicy = await prisma.cancellationPolicy.findUnique({
        where: {
          id: id,
        },
      })
      if (!getUser) {
        return res.json(response.error({ message: USER_NOT_EXIST }))
      }
      if (!getCancellationPolicy) {
        return res.json(
          response.error({ message: 'Cancellation Policy data not found' })
        )
      }
      const updateCancellationPolicyById =
        await prisma.cancellationPolicy.update({
          where: {
            id: id,
          },
          data: {
            title: title,
            cancelationDueDate: cancelationDueDate,
          },
        })
      res.json(
        response.success({
          item: updateCancellationPolicyById,
          allItemCount: 1,
          message: 'Cancellation Policy successfully updated',
        })
      )
    } else {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const deleteCancellationPolicy = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getCancellationPolicy = await prisma.cancellationPolicy.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getCancellationPolicy) {
      return res.json(
        response.error({ message: 'Cancellation Policy data not found' })
      )
    }
    const removeCancellationPolicy = await prisma.cancellationPolicy.delete({
      where: {
        id: id,
      },
    })
    res.json(
      response.success({
        item: removeCancellationPolicy,
        allItemCount: 1,
        message: 'Cancellation Policy successfully removed',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

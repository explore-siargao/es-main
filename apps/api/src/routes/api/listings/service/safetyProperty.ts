import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

export const getAllSafetyProperties = async (req: Request, res: Response) => {
  try {
    const allSafetyProperties = await prisma.safetyProperty.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        rules: true,
      },
    })
    if (allSafetyProperties.length !== 0) {
      res.json(
        response.success({
          items: allSafetyProperties,
          allItemCount: allSafetyProperties.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: allSafetyProperties,
          allItemCount: allSafetyProperties.length,
          message: 'No safety and properties rules data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getAllSafetyPropertiesByListing = async (
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
      return res.json(response.error({ message: 'No listing data found' }))
    }
    const getSafetyPropertiesByListingId = await prisma.safetyProperty.findMany(
      {
        where: {
          listingId: listingId,
        },
        include: {
          rules: true,
        },
      }
    )
    if (getSafetyPropertiesByListingId.length !== 0) {
      res.json(
        response.success({
          items: getSafetyPropertiesByListingId,
          allItemCount: getSafetyPropertiesByListingId.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: getSafetyPropertiesByListingId,
          allItemCount: getSafetyPropertiesByListingId.length,
          message: 'This safety properties not assigned to listing',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getSafetyProperty = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const getSafetyPropertyById = await prisma.safetyProperty.findFirst({
      where: {
        id: id,
      },
      include: {
        rules: true,
      },
    })
    if (getSafetyPropertyById) {
      res.json(
        response.success({
          item: getSafetyPropertyById,
          allItemCount: 1,
          message: '',
        })
      )
    } else {
      res.json(response.error({ message: 'No safety property data found' }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const updateSafetyProperty = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  const { title } = req.body
  try {
    if (title) {
      const getUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
      const getSafetyProperty = await prisma.safetyProperty.findUnique({
        where: {
          id: id,
        },
      })
      if (!getUser) {
        return res.json(response.error({ message: USER_NOT_EXIST }))
      }
      if (!getSafetyProperty) {
        return res.json(
          response.error({ message: 'Safety property data not found' })
        )
      }
      const updateSafetyPropertyById = await prisma.safetyProperty.update({
        where: {
          id: id,
        },
        data: {
          title: title,
        },
      })
      res.json(
        response.success({
          item: updateSafetyPropertyById,
          allItemCount: 1,
          message: 'Safety Property successfully updated',
        })
      )
    } else {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const deleteSafetyProperty = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getSafetyProperty = await prisma.safetyProperty.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getSafetyProperty) {
      return res.json(
        response.error({ message: 'Safety property data not found' })
      )
    }
    const removeSafetyProperty = await prisma.safetyProperty.delete({
      where: {
        id: id,
      },
    })
    res.json(
      response.success({
        item: removeSafetyProperty,
        allItemCount: 1,
        message: 'Safety property successfully deleted',
      })
    )
  } catch (err: any) {
    res.json(response.error(err.message))
  }
}

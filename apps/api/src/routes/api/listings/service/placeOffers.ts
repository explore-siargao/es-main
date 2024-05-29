import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Z_PlaceOffers } from '@repo/contract'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

export const getAllPlaceOffers = async (req: Request, res: Response) => {
  try {
    const allPlaceOffers = await prisma.placeOffers.findMany({
      where: {
        deletedAt: null,
      },
    })
    if (allPlaceOffers.length !== 0) {
      res.json(
        response.success({
          items: allPlaceOffers,
          allItemCount: allPlaceOffers.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: allPlaceOffers,
          allItemCount: allPlaceOffers.length,
          message: 'No place to offers found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getPlaceOffersById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const getPlaceOfferById = await prisma.placeOffers.findUnique({
      where: {
        id: id,
      },
    })
    if (getPlaceOfferById !== null) {
      res.json(
        response.success({
          item: getPlaceOfferById,
          allItemCount: 1,
          message: '',
        })
      )
    } else {
      res.json(response.error({ message: 'This place offer not found' }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const addPlaceOffer = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const { title, icon, category } = req.body
  const inputIsValid = Z_PlaceOffers.safeParse(req.body)
  if (inputIsValid.success) {
    try {
      const getUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
      if (getUser) {
        const newPlaceOffers = await prisma.placeOffers.create({
          data: {
            title: title,
            icon: icon,
            category: category,
          },
        })
        res.json(
          response.success({
            item: newPlaceOffers,
            allItemCount: 1,
            message: 'New place offers successfully added',
          })
        )
      } else {
        res.json(response.error({ message: USER_NOT_EXIST }))
      }
    } catch (err: any) {
      res.json(response.error({ message: err.message }))
    }
  } else {
    res.json(
      response.error({ message: JSON.parse(inputIsValid.error.message) })
    )
  }
}

export const updatePlaceOffers = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const placeOfferId = Number(req.params.placeOfferId)
  const { title, category, icon } = req.body
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getPlaceOffer = await prisma.placeOffers.findUnique({
      where: {
        id: placeOfferId,
      },
    })
    if (getUser) {
      if (getPlaceOffer) {
        if (title || category || icon) {
          const updatePlaceOfferById = await prisma.placeOffers.update({
            where: {
              id: placeOfferId,
              deletedAt: null,
            },
            data: {
              title: title,
              category: category,
              icon: icon,
            },
          })
          res.json(
            response.success({
              item: updatePlaceOfferById,
              allItemCount: 1,
              message: 'Place offer successfully updated',
            })
          )
        } else {
          res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
        }
      } else {
        res.json(response.error({ message: 'Place offer not found' }))
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const deletePlaceOffers = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const placeOfferId = Number(req.params.placeOfferId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getPlaceOffer = await prisma.placeOffers.findUnique({
      where: {
        id: placeOfferId,
      },
    })
    if (getUser) {
      if (getPlaceOffer) {
        const removePlaceOffer = await prisma.placeOffers.delete({
          where: {
            id: placeOfferId,
          },
        })
        res.json(
          response.success({
            item: removePlaceOffer,
            allItemCount: 1,
            message: 'Place offer sucessfully deleted',
          })
        )
      } else {
        res.json(
          response.error({
            message: 'Place offer not found or already deleted',
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

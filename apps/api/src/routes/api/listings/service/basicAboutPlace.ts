import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

export const getBasicAboutPlaceById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const getBasicAboutPlace = await prisma.basicAboutPlace.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
    })
    if (getBasicAboutPlace) {
      res.json(
        response.success({
          item: getBasicAboutPlace,
          allItemCount: 1,
          message: '',
        })
      )
    } else {
      res.json(response.error({ message: 'basic about place info not exist' }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const updateBasicAboutPlace = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  const { guests, bedRooms, beds, bathRooms } = req.body
  if (guests || bedRooms || beds || bathRooms) {
    try {
      const getUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
      const getBasicAboutPlace = await prisma.basicAboutPlace.findUnique({
        where: {
          id: id,
        },
      })
      if (!getUser) {
        return res.json(response.error({ message: USER_NOT_EXIST }))
      }
      if (!getBasicAboutPlace) {
        return res.json(
          response.error({ message: 'Basic about place not found' })
        )
      }
      const updateBasicAboutPlace = await prisma.basicAboutPlace.update({
        where: {
          id: id,
        },
        data: {
          guests: guests,
          bedRooms: bedRooms,
          beds: beds,
          bathRooms: bathRooms,
        },
      })
      res.json(
        response.success({
          item: updateBasicAboutPlace,
          allItemCount: 1,
          message: 'Basic about place successfully updated',
        })
      )
    } catch (err: any) {
      res.json(response.error({ message: err.message }))
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const deleteBasicAboutPlace = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const id = Number(req.params.id)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getBasicAboutPlace = await prisma.basicAboutPlace.findUnique({
      where: {
        id: id,
      },
    })
    if (!getUser) {
      return res.json(response.error({ message: USER_NOT_EXIST }))
    }
    if (!getBasicAboutPlace) {
      return res.json(
        response.error({ message: 'Basic about place not found' })
      )
    }
    const removeBasicAboutPlace = await prisma.basicAboutPlace.delete({
      where: {
        id: id,
      },
    })
    res.json(
      response.success({
        item: removeBasicAboutPlace,
        allItemCount: 1,
        message: 'Basic about place successfully deleted',
      })
    )
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

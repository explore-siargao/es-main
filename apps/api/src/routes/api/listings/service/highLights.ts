import { ResponseService } from '@/common/service/response'

import { REQUIRED_VALUE_EMPTY, USER_NOT_EXIST } from '@/common/constants'
import { Z_Highlights } from '@repo/contract'
import { Request, Response } from 'express'

import { prisma } from '@/common/helpers/prismaClient'
const response = new ResponseService()

export const getAllHighLights = async (req: Request, res: Response) => {
  try {
    const getAllHighlights = await prisma.highLights.findMany({
      where: {
        deletedAt: null,
      },
    })
    if (getAllHighlights.length !== 0) {
      res.json(
        response.success({
          items: getAllHighlights,
          allItemCount: getAllHighlights.length,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          items: getAllHighlights,
          allItemCount: getAllHighlights.length,
          message: 'No highlights data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const getHighLight = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const getHighLightById = await prisma.highLights.findUnique({
      where: {
        id: id,
      },
    })
    if (getHighLightById !== null) {
      res.json(
        response.success({
          item: getHighLightById,
          allItemCount: 1,
          message: '',
        })
      )
    } else {
      res.json(
        response.success({
          item: getHighLightById,
          allItemCount: 0,
          message: 'No data found',
        })
      )
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const addHighLight = async (req: Request, res: Response) => {
  const { title, detail, icon } = req.body
  const userId = Number(req.params.userId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (getUser) {
      if (title && detail && icon) {
        const inputIsValid = Z_Highlights.safeParse(req.body)
        if (inputIsValid.success) {
          const newHighLight = await prisma.highLights.create({
            data: {
              title: title,
              details: detail,
              icon: icon,
            },
          })
          res.json(
            response.success({
              item: newHighLight,
              allItemCount: 1,
              message: 'New highlight successfully created',
            })
          )
        } else {
          res.json(
            response.error({
              message: JSON.parse(inputIsValid.error.message),
            })
          )
        }
      } else {
        res.json(
          response.error({
            message: REQUIRED_VALUE_EMPTY,
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

export const updateHighLight = async (req: Request, res: Response) => {
  const { title, detail, icon } = req.body
  const userId = Number(req.params.userId)
  const highLightId = Number(req.params.highLightId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getHighLight = await prisma.highLights.findUnique({
      where: {
        id: highLightId,
      },
    })
    if (getUser) {
      if (getHighLight) {
        if (title || detail || icon) {
          const updateHighLightById = await prisma.highLights.update({
            where: {
              id: highLightId,
            },
            data: {
              title: title,
              details: detail,
              icon: icon,
            },
          })
          res.json(
            response.success({
              item: updateHighLightById,
              allItemCount: 1,
              message: 'Highlight successfully updated',
            })
          )
        } else {
          res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
        }
      } else {
        res.json(response.error({ message: 'Hightligt not exist' }))
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

export const deleteHighLight = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const highlightId = Number(req.params.highLightId)
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    const getHighLight = await prisma.highLights.findUnique({
      where: {
        id: highlightId,
      },
    })
    if (getUser) {
      if (getHighLight) {
        const deleteHighLight = await prisma.highLights.delete({
          where: {
            id: highlightId,
          },
        })
        res.json(
          response.success({
            item: deleteHighLight,
            allItemCount: 1,
            message: 'Highlight sucessfully deleted',
          })
        )
      } else {
        res.json(response.error({ message: 'Highlight already deleted' }))
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(response.error({ message: err.message }))
  }
}

import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_EXIST,
} from '@/common/constants'
import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'

const response = new ResponseService()
import { prisma } from '@/common/helpers/prismaClient'
export const addPaymentMethod = async (req: Request, res: Response) => {
  const { cardInfo, cardType, lastFour } = req.body
  const userId = Number(req.params.userId)
  try {
    const isUserExist =
      (await prisma.user.findUnique({
        where: {
          id: userId,
          deletedAt: null,
        },
      })) !== null
    if (isUserExist) {
      if (cardInfo) {
        const newPaymentMethod = await prisma.paymentMethod.create({
          data: {
            cardInfo,
            userId,
            cardType,
            lastFour,
          },
          include: {
            user: true,
          },
        })
        res.json(
          response.success({
            item: newPaymentMethod,
            message: 'Payment method successfully added',
          })
        )
      } else {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getPaymentMethods = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  try {
    const isUserExist =
      (await prisma.user.findUnique({
        where: {
          id: userId,
          deletedAt: null,
        },
      })) !== null
    if (isUserExist) {
      const getPaymentsMethod = await prisma.paymentMethod.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: {
            include: {
              guest: true,
            },
          },
        },
      })
      const modifyResult = getPaymentsMethod.map((paymentMethod: any) => ({
        ...paymentMethod,
        user: {
          ...paymentMethod.user,
          personalInfo: {
            ...paymentMethod.user.guest,
            confirm: paymentMethod.user.guest?.confirm
              ? JSON.parse(paymentMethod.user.guest?.confirm)
              : null,
            governmentId: paymentMethod.user.guest?.governmentId
              ? JSON.parse(paymentMethod.user.guest.governmentId)
              : null,
          },
        },
      }))
      res.json(
        response.success({
          items: modifyResult,
          allItemCount: getPaymentsMethod.length,
        })
      )
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const removePaymentMethod = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const paymentMethodId = Number(req.params.paymentMethodId)
  try {
    const isUserExist =
      (await prisma.user.findFirst({
        where: {
          id: userId,
          deletedAt: null,
        },
      })) !== null
    if (isUserExist) {
      const isPaymentMethodExist =
        (await prisma.paymentMethod.findFirst({
          where: {
            id: paymentMethodId,
            userId: userId,
            deletedAt: null,
          },
        })) !== null
      if (isPaymentMethodExist) {
        const deletePayementMethod = await prisma.paymentMethod.delete({
          where: {
            id: paymentMethodId,
            userId: userId,
          },
        })
        res.json(
          response.success({
            item: deletePayementMethod,
            message: 'Payment method successfully removed',
          })
        )
      } else {
        res.json(response.error({ message: 'Payment Method already deleted' }))
      }
    } else {
      res.json(response.error({ message: 'user not exists to our system' }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updatePaymentMethod = async (req: Request, res: Response) => {
  let successDefault = null
  const { cardInfo, isDefault } = req.body
  const userId = Number(req.params.userId)
  const paymentMethodId = Number(req.params.paymentMethodId)
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
      include: {
        paymentMethod: true,
      },
    })
    if (getUser) {
      const getPaymentMethod = await prisma.paymentMethod.findFirst({
        where: {
          id: paymentMethodId,
          userId: userId,
        },
        include: {
          user: true,
        },
      })
      if (getPaymentMethod) {
        if (cardInfo || isDefault || !isDefault) {
          if (isDefault) {
            const updateCurrentDefault = await prisma.paymentMethod.updateMany({
              where: {
                userId: userId,
                isDefault: true,
              },
              data: {
                isDefault: false,
              },
            })
            successDefault = updateCurrentDefault
          }
          const updatePaymentMethod = await prisma.paymentMethod.update({
            where: {
              id: paymentMethodId,
              userId: userId,
            },
            data: {
              cardInfo: cardInfo,
              isDefault: isDefault,
            },
          })
          res.json(
            response.success({
              item: [updatePaymentMethod, successDefault],
              message: 'Sucessfully updated',
            })
          )
        } else {
          res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
        }
      } else {
        res.json(
          response.error({ message: 'Payment method not exist to our system' })
        )
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

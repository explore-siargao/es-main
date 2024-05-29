import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_EXIST,
} from '@/common/constants'
import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'

const response = new ResponseService()
import { prisma } from '@/common/helpers/prismaClient'
export const getUsedCoupons = async (req: Request, res: Response) => {
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
      const getUsedCoupons = await prisma.coupon.findMany({
        where: {
          usedBy: userId,
        },
        include: {
          user: {
            include: {
              guest: true,
            },
          },
        },
      })
      const modifyResult = getUsedCoupons.map((coupon: any) => ({
        ...coupon,
        user: {
          ...coupon.user,
          personalInfo: {
            ...coupon.user?.guest,
            confirm: coupon.user?.guest?.confirm
              ? JSON.parse(coupon.user?.guest?.confirm)
              : null,
            governmentId: coupon.user?.guest?.governmentId
              ? JSON.parse(coupon.user.guest.governmentId)
              : null,
          },
        },
      }))
      res.json(
        response.success({
          items: modifyResult,
          allItemCount: getUsedCoupons.length,
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

export const addCoupon = async (req: Request, res: Response) => {
  const { code, expirationDate, reward } = req.body
  const userId = Number(req.params.userId)
  try {
    const isUserExist =
      (await prisma.user.findUnique({
        where: {
          id: userId,
          OR: [{ role: 'Admin' }, { isHost: true }],
        },
      })) !== null
    if (isUserExist) {
      if (code && reward && expirationDate) {
        const newCoupon = await prisma.coupon.create({
          data: {
            code: code,
            reward: reward,
            expirationDate: expirationDate,
            createdBy: userId,
            usedBy: null,
            isUsed: false,
          },
          include: {
            user: true,
          },
        })
        res.json(
          response.success({
            item: newCoupon,
            message: 'New coupon successfully created',
          })
        )
      } else {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      }
    } else {
      res.json(
        response.error({
          message: 'User Admin or Host is not exist from our system',
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateCoupon = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId)
  const { code, reward, expirationDate, usedBy, isUsed } = req.body
  try {
    const isUserExist =
      (await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })) !== null
    if (isUserExist) {
      if (code || reward || expirationDate || usedBy || isUsed) {
        const getCoupon = await prisma.coupon.findFirst({
          where: {
            code: req.body.code,
            isUsed: false,
          },
        })
        if (getCoupon !== null) {
          const updateCoupon = await prisma.coupon.update({
            where: {
              id: getCoupon.id,
            },
            data: {
              code: code,
              reward: reward,
              expirationDate: expirationDate,
              usedBy: usedBy,
              isUsed: isUsed,
            },
            include: {
              user: true,
            },
          })
          res.json(
            response.success({
              item: updateCoupon,
              message: 'Coupon successfully updated',
            })
          )
        } else {
          res.json(
            response.error({ message: 'Invalid code or code already in used' })
          )
        }
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

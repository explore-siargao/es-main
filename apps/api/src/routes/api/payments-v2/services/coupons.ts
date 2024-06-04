import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_EXIST,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbCoupons, dbUsers } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const getUsedCoupons = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const isUserExist =
      (await dbUsers.findOne({
        _id: userId,
        deletedAt: null,
      })) !== null
    console.log('user exists: ', isUserExist)
    if (isUserExist) {
      const getUsedCoupons = await dbCoupons.find({ usedBy: userId }).populate([
        {
          path: 'createdBy',
          populate: [
            {
              path: 'guest',
            },
          ],
        },
        {
          path: 'usedBy',
          populate: [
            {
              path: 'guest',
            },
          ],
        },
      ])

      let modifyResult = getUsedCoupons.map((coupon: any) => ({
        code: coupon.code,
        expirationDate: coupon.expirationDate,
        reward: coupon.reward,
        isUsed: coupon.isUsed,
        createdAt: coupon.createdAt,

        createdBy: {
          email: coupon.createdBy.email,
          password: coupon.createdBy.password,
          changePasswordAt: coupon.createdBy.changePasswordAt,
          role: coupon.createdBy.role,
          isHost: coupon.createdBy.isHost,
          RegistrationType: coupon.createdBy.RegistrationType,
          deactivated: coupon.createdBy.deactivated,
          canReceiveEmail: coupon.createdBy.canReceiveEmail,
          personalInfo: coupon.createdBy.guest,
          createdAt: coupon.createdBy.createdAt,
          deletedAt: coupon.createdBy.deletedAt,
        },
        usedBy: {
          email: coupon.usedBy.email,
          password: coupon.usedBy.password,
          changePasswordAt: coupon.usedBy.changePasswordAt,
          role: coupon.usedBy.role,
          isHost: coupon.usedBy.isHost,
          RegistrationType: coupon.usedBy.RegistrationType,
          deactivated: coupon.usedBy.deactivated,
          canReceiveEmail: coupon.usedBy.canReceiveEmail,
          personalInfo: coupon.usedBy.guest,
          createdAt: coupon.usedBy.createdAt,
          deletedAt: coupon.usedBy.deletedAt,
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
  const userId = req.params.userId
  try {
    const isUserExist =
      (await dbUsers.findOne({
        _id: userId,
        $or: [{ role: 'Admin' }, { isHost: true }],
      })) !== null

    if (isUserExist) {
      if (code && reward && expirationDate) {
        const newCoupon = new dbCoupons({
          code: code,
          reward: reward,
          expirationDate: expirationDate,
          createdBy: userId,
          usedBy: null,
          isUsed: false,
        })
        await newCoupon.save()
        const populatedCoupon = await dbCoupons
          .findById(newCoupon._id)
          .populate('createdBy')

        res.json(
          response.success({
            item: populatedCoupon,
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
  const userId = res.locals.user?.id
  const { code, reward, expirationDate, usedBy, isUsed } = req.body
  try {
    const isUserExist =
      (await dbUsers.findOne({
        _id: userId,
      })) !== null
    if (isUserExist) {
      if (code || reward || expirationDate || usedBy || isUsed) {
        const getCoupon = await dbCoupons.findOne({
          code: code,
          isUsed: false,
        })
        if (getCoupon !== null) {
          const updateCoupon = await dbCoupons.findOneAndUpdate(
            {
              _id: getCoupon._id,
            },
            {
              $set: {
                code: code,
                reward: reward,
                expirationDate: expirationDate,
                usedBy: usedBy,
                isUsed: isUsed,
                updatedAt: Date.now(),
              },
            },
            { new: true }
          )
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

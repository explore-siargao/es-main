import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_EXIST,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbUsers, dbPaymentMethods } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const addPaymentMethod = async (req: Request, res: Response) => {
  const { cardInfo, cardType, lastFour } = req.body
  const userId = req.params.userId
  try {
    const isUserExist =
      (await dbUsers.findOne({
        _id: userId,
        deletedAt: null,
      })) !== null
    if (isUserExist) {
      if (cardInfo) {
        const newPaymentMethod = new dbPaymentMethods({
          cardInfo: cardInfo,
          user: userId,
          cardType: cardType,
          lastFour: lastFour,
        })
        await (await newPaymentMethod).save()
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

export const updatePaymentMethod = async (req: Request, res: Response) => {
  let successDefault = null
  const { cardInfo, isDefault } = req.body
  const userId = res.locals.user?.id
  const paymentMethodId = req.params.paymentMethodId

  try {
    const getUser = await dbUsers.findOne({
      _id: userId,
    })

    console.log(userId)
    if (getUser) {
      const getPaymentMethod = await dbPaymentMethods.findOne({
        _id: paymentMethodId,
        user: userId,
      })
      if (getPaymentMethod) {
        if (cardInfo || isDefault || !isDefault) {
          if (isDefault) {
            const updateCurrentDefault = await dbPaymentMethods.updateMany(
              {
                user: userId,
                isDefault: true,
              },
              {
                $set: {
                  isDefault: false,
                },
              }
            )
            successDefault = updateCurrentDefault
          }
          const updatePaymentMethod = await dbPaymentMethods.findOneAndUpdate(
            {
              _id: paymentMethodId,
              user: userId,
            },
            {
              $set: {
                cardInfo: cardInfo,
                isDefault: isDefault,
              },
            }
          )
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

export const getPaymentMethods = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  try {
    const isUserExist =
      (await dbUsers.findOne({
        _id: userId,
        deletedAt: null,
      })) !== null
    if (isUserExist) {
      const getPaymentsMethod = await dbPaymentMethods
        .find({ user: userId })
        .populate({
          path: 'user',
          populate: [{ path: 'guest' }],
        })
      const modifyResult = getPaymentsMethod.map((paymentMethod: any) => ({
        id: paymentMethod._id,
        cardInfo: paymentMethod.cardInfo,
        cardType: paymentMethod.cardType,
        lastFour: paymentMethod.lastFour,
        isDefault: paymentMethod.isDefault,
        createdAt: paymentMethod.createdAt,
        updatedAt: paymentMethod.updatedAt,

        user: {
          email: paymentMethod.user.email,
          password: paymentMethod.user.password,
          changePasswordAt: paymentMethod.user.changePasswordAt,
          role: paymentMethod.user.role,
          isHost: paymentMethod.user.isHost,
          registrationType: paymentMethod.user.registrationType,
          deactivated: paymentMethod.user.deactivated,
          canReceiveEmail: paymentMethod.user.canReceiveEmail,
          guest: paymentMethod.user.guest,
          createdAt: paymentMethod.user.createdAt,
          deletedAt: paymentMethod.user.deletedAt,

          personalInfo: {
            // ...paymentMethod.user.guest,
            confirm: paymentMethod.user.guest?.confirm
              ? paymentMethod.user.guest?.confirm
              : null,
            governmentId: paymentMethod.user.guest?.governmentId
              ? paymentMethod.user.guest.governmentId
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
  const userId = req.params.userId
  const paymentMethodId = req.params.paymentMethodId
  try {
    const updatedPaymentMethod = await dbPaymentMethods.findOneAndUpdate(
      { _id: paymentMethodId, user: userId, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    )
    if (updatedPaymentMethod) {
      res.json(
        response.success({
          item: updatedPaymentMethod,
          message: 'Payment method successfully removed',
        })
      )
    } else {
      res.json(
        response.error({
          message: 'Payment Method not found or already deleted!',
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

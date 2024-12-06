import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { API_URL } from '@/common/constants/ev'
import { ResponseService } from '@/common/service/response'
import { T_CardInfo, Z_CardInfo } from '@repo/contract'
import {
  T_Add_To_Cart,
  T_Cart_Item,
  Z_Add_CartItems,
} from '@repo/contract-2/cart'
import { dbPaymentMethods, dbReservations } from '@repo/database'
import { EncryptionService } from '@repo/services'
import { Request, Response } from 'express'

const response = new ResponseService()
const encryptionService = new EncryptionService('card')
export const gcashMultipleCheckout = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user?.id
    const cartItems: T_Add_To_Cart[] = req.body
    if (!cartItems || cartItems.length === 0) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else if (!Array.isArray(cartItems)) {
      res.json(response.error({ message: 'Invalid Item on cart' }))
    } else {
      const parseCartItems = Z_Add_CartItems.safeParse(cartItems)
      if (!parseCartItems.success) {
        res.json(
          response.error({
            items: parseCartItems.error.errors,
            message: 'Invalid Item on cart',
          })
        )
      } else {
        const amount = cartItems.reduce(
          (total, item) => total + (item.price || 0),
          0
        )
        const gcashResponse = await fetch(
          `${API_URL}/api/v1/xendit/gcash-create-payment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
          }
        )

        const gcashData = await gcashResponse.json()
        if (gcashResponse.ok) {
          const reservationItems = cartItems.map((item) => ({
            activityIds: item.activityIds || null,
            rentalIds: item.rentalIds || null,
            propertyIds: item.propertyIds || null,
            startDate: item.startDate,
            endDate: item.endDate,
            guest: userId,
            xendItPaymentMethodId: gcashData.item.payment_method.id,
            xendItPaymentRequestId: gcashData.item.id,
            xendItPaymentReferenceId: gcashData.item.reference_id,
            guestCount: item.guestCount,
            status: 'For-Payment',
            cartId: item._id,
          }))
          const addReservations =
            await dbReservations.insertMany(reservationItems)
          if (addReservations) {
            res.json(
              response.success({
                item: {
                  reservations: reservationItems,
                  action: {
                    type: 'PAYMENT',
                    link: gcashData.item.actions[0].url,
                  },
                  message: 'Pending payment',
                },
              })
            )
          } else {
            res.json(
              response.error({
                items: addReservations,
                message: 'Invalid items',
              })
            )
          }
        } else {
          res.json(response.error({ message: gcashData.message }))
        }
      }
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const cardMultipleCheckout = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user?.id
    const customer = res.locals.user.personalInfo
    const cartItems: T_Add_To_Cart[] = req.body.cartItems
    if (!cartItems || cartItems.length === 0) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else if (!Array.isArray(cartItems)) {
      res.json(response.error({ message: 'Invalid Item on cart' }))
    } else {
      const parseCartItems = Z_Add_CartItems.safeParse(cartItems)
      if (!parseCartItems.success) {
        res.json(
          response.error({
            items: parseCartItems.error.errors,
            message: 'Invalid Item on cart',
          })
        )
      } else {
        const amount = cartItems.reduce(
          (total, item) => total + (item.price || 0),
          0
        )

        const paymentMethod = await dbPaymentMethods.findOne({
          user: userId,
          isDefault: true,
        })
        const cardInfo = encryptionService.decrypt(
          paymentMethod?.cardInfo as string
        ) as T_CardInfo
        const cardResponse = await fetch(
          `${API_URL}/api/v1/xendit/card-payment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: amount,
              cardNumber: cardInfo.cardNumber,
              expirationMonth: cardInfo.expirationMonth,
              expirationYear: cardInfo.expirationYear,
              cardHolderName: cardInfo.cardholderName,
              country: cardInfo.country,
              cvv: cardInfo.cvv,
              customer: customer,
              userId: userId,
            }),
          }
        )

        const cardData = await cardResponse.json()
        if (cardData.item.actions) {
          const reservationItems = cartItems.map((item) => ({
            activityIds: item.activityIds || null,
            rentalIds: item.rentalIds || null,
            propertyIds: item.propertyIds || null,
            startDate: item.startDate,
            endDate: item.endDate,
            guest: userId,
            xendItPaymentMethodId: cardData.item.payment_method.id,
            xendItPaymentRequestId: cardData.item.id,
            xendItPaymentReferenceId: cardData.item.reference_id,
            guestCount: item.guestCount,
            status: 'For-Payment',
            cartId: item.id,
          }))
          const addReservations =
            await dbReservations.insertMany(reservationItems)

          if (addReservations) {
            res.json(
              response.success({
                item: {
                  reservations: addReservations,
                  action: {
                    type: 'PAYMENT',
                    link: cardData.item.actions[0].url,
                  },
                  message: 'Pending payment',
                },
              })
            )
          } else {
            res.json(response.error({ message: 'Invalid card details' }))
          }
        } else {
          res.json(
            response.error({
              message: cardData.item.message || UNKNOWN_ERROR_OCCURRED,
            })
          )
        }
      }
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message
          ? err.message + ' ' + err.stack
          : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const manualCardMultipleCheckout = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user?.id
    const customer = res.locals.user.personalInfo
    const cardInfo:T_CardInfo = req.body.cardInfo
    const cartItems: T_Add_To_Cart[] = req.body.cartItems
    const validCardInfo = Z_CardInfo.safeParse(cardInfo)
    if(validCardInfo.error){
      console.error(validCardInfo.error)
      res.json(response.error({message:REQUIRED_VALUE_EMPTY}))
    }
    if (!cartItems || cartItems.length === 0 || !cardInfo) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else if (!Array.isArray(cartItems)) {
      res.json(response.error({ message: 'Invalid Item on cart' }))
    } else {
      const parseCartItems = Z_Add_CartItems.safeParse(cartItems)
      if (!parseCartItems.success) {
        res.json(
          response.error({
            items: parseCartItems.error.errors,
            message: 'Invalid Item on cart',
          })
        )
      } else {
        const amount = cartItems.reduce(
          (total, item) => total + (item.price || 0),
          0
        )
       
        const cardResponse = await fetch(
          `${API_URL}/api/v1/xendit/card-payment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: amount,
              cardNumber: cardInfo.cardNumber,
              expirationMonth: cardInfo.expirationMonth,
              expirationYear: cardInfo.expirationYear,
              cardHolderName: cardInfo.cardholderName,
              country: cardInfo.country,
              cvv: cardInfo.cvv,
              customer: customer,
              userId: userId,
            }),
          }
        )

        const cardData = await cardResponse.json()
        if (cardData.item.actions) {
          const reservationItems = cartItems.map((item) => ({
            activityIds: item.activityIds || null,
            rentalIds: item.rentalIds || null,
            propertyIds: item.propertyIds || null,
            startDate: item.startDate,
            endDate: item.endDate,
            guest: userId,
            xendItPaymentMethodId: cardData.item.payment_method.id,
            xendItPaymentRequestId: cardData.item.id,
            xendItPaymentReferenceId: cardData.item.reference_id,
            guestCount: item.guestCount,
            status: 'For-Payment',
            cartId: item.id,
          }))
          const addReservations =
            await dbReservations.insertMany(reservationItems)

          if (addReservations) {
            res.json(
              response.success({
                item: {
                  reservations: addReservations,
                  action: {
                    type: 'PAYMENT',
                    link: cardData.item.actions[0].url,
                  },
                  message: 'Pending payment',
                },
              })
            )
          } else {
            res.json(response.error({ message: 'Invalid card details' }))
          }
        } else {
          res.json(
            response.error({
              message: cardData.item.message || UNKNOWN_ERROR_OCCURRED,
            })
          )
        }
      }
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message
          ? err.message + ' ' + err.stack
          : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}
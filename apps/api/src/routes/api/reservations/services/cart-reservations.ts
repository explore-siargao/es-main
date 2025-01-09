import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { API_URL } from '@/common/constants/ev'
import { ResponseService } from '@/common/service/response'
import { T_CardInfo, Z_CardInfo } from '@repo/contract'
import {
  T_Add_To_Cart,
  Z_Add_To_Cart,
  Z_Add_To_Carts,
} from '@repo/contract-2/cart'
import { dbPaymentMethods, dbReservations } from '@repo/database'
import { EncryptionService, HMACService } from '@repo/services'
import { Request, Response } from 'express'
import { format, differenceInSeconds, differenceInCalendarDays } from 'date-fns'
import { totalPrice } from '../helpers/totalPrice'

const response = new ResponseService()
const hmacService = new HMACService()
const encryptionService = new EncryptionService('card')
export const gcashMultipleCheckout = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user?.id
    const cartItems: T_Add_To_Cart[] = req.body.cartItems
    if (!cartItems || cartItems.length === 0) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else if (!Array.isArray(cartItems)) {
      console.error(typeof cartItems, cartItems)
      res.json(response.error({ message: 'Invalid Item on cart' }))
    } else {
      const parseCartItems = Z_Add_To_Carts.safeParse(cartItems)
      if (!parseCartItems.success) {
        console.error(JSON.parse(parseCartItems.error.message))
        res.json(
          response.error({
            items: parseCartItems.error.errors,
            message: 'Invalid Item on cart',
          })
        )
      } else {
        const amount = await totalPrice(cartItems)
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
        console.log(gcashData)
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
            cartId: item.id,
            forPaymenttId: null,
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
    console.error(err)
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const cardMultipleCheckout = async (req: Request, res: Response) => {
  try {
    let paymentMethod
    const userId = res.locals.user?.id
    const customer = res.locals.user.personalInfo
    const cartItems: T_Add_To_Cart[] = req.body.cartItems
    const cvv: string = req.body.cvv
    const hmac: string = req.body.hmac
    const expirationDate: string = req.body.expirationDate
    const paymentMethodId: string = req.body.paymentMethodId
    if (
      !cartItems ||
      cartItems.length === 0 ||
      !cvv ||
      !expirationDate ||
      !hmac
    ) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else if (!Array.isArray(cartItems)) {
      res.json(response.error({ message: 'Invalid Item on cart' }))
    } else {
      const recreateHMAC = hmacService.generateHMAC({ cvv })
      const currentDate = new Date()
      const utcDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'")
      const expiredDate = format(expirationDate, "yyyy-MM-dd'T'HH:mm:ss'Z'")
      if (hmac !== recreateHMAC) {
        res.json(response.error({ message: 'Invalid HMAC. Data tampered.' }))
      } else {
        const computedDate = differenceInSeconds(utcDate, expiredDate)
        if (computedDate > 30) {
          res.json(response.error({ message: 'Request expired' }))
        } else {
          const parseCartItems = Z_Add_To_Carts.safeParse(cartItems)
          if (!parseCartItems.success) {
            res.json(
              response.error({
                items: parseCartItems.error.errors,
                message: 'Invalid Item on cart',
              })
            )
          } else {
            const amount = await totalPrice(cartItems)
            if (!paymentMethodId) {
              paymentMethod = await dbPaymentMethods.findOne({
                user: userId,
                isDefault: true,
              })
            } else {
              paymentMethod = await dbPaymentMethods.findOne({
                user: userId,
                _id: paymentMethodId,
              })
            }

            if (!paymentMethod) {
              res.json(
                response.error({ message: 'No Card linked setted to default' })
              )
            } else {
              const cardInfo = encryptionService.decrypt(
                paymentMethod?.cardInfo as string
              ) as T_CardInfo
              if (cardInfo && cardInfo && cardInfo.cvv === cvv) {
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
                    forPaymenttId: null,
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
                    res.json(
                      response.error({ message: 'Invalid card details' })
                    )
                  }
                } else {
                  res.json(
                    response.error({
                      message: cardData.item.message || UNKNOWN_ERROR_OCCURRED,
                    })
                  )
                }
              } else {
                res.json(
                  response.error({
                    message: 'Invalid card details',
                  })
                )
              }
            }
          }
        }
      }
    }
  } catch (err: any) {
    console.error(err)
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const manualCardMultipleCheckout = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.id
    const customer = res.locals.user.personalInfo
    const cardInfo = req.body.cardInfo
    const cartItems: T_Add_To_Cart[] = req.body.cartItems
    const hmac = req.body.hmac
    const expirationDate = req.body.expirationDate

    const decryptCard: any = encryptionService.decrypt(cardInfo)
    if (!decryptCard) {
      res.json(response.error({ message: 'Invalid card' }))
    } else {
      const validCardInfo = Z_CardInfo.safeParse(decryptCard)
      if (validCardInfo.error) {
        console.error(validCardInfo.error)
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      } else {
        if (!cartItems || cartItems.length === 0 || !cardInfo || !hmac) {
          res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
        } else if (!Array.isArray(cartItems)) {
          res.json(response.error({ message: 'Invalid Item on cart' }))
        } else {
          const parseCartItems = Z_Add_To_Carts.safeParse(cartItems)
          if (!parseCartItems.success) {
            res.json(
              response.error({
                items: parseCartItems.error.errors,
                message: 'Invalid Item on cart',
              })
            )
          } else {
            const amount = await totalPrice(cartItems)

            const recreateHMAC = hmacService.generateHMAC(decryptCard)
            console.log(recreateHMAC)
            if (hmac !== recreateHMAC) {
              res.json(
                response.error({ message: 'Invalid HMAC. Data tampered.' })
              )
            } else {
              const currentDate = new Date()
              const utcDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'")
              const expiredDate = format(
                expirationDate,
                "yyyy-MM-dd'T'HH:mm:ss'Z'"
              )
              console.log(expiredDate)
              const computedTime = differenceInSeconds(utcDate, expiredDate)
              console.log(computedTime)
              if (computedTime > 30) {
                res.json(response.error({ message: 'Request expired' }))
              } else {
                const payloadCard = {
                  amount: amount,
                  cardNumber: decryptCard.cardNumber.trim(),
                  expirationMonth: decryptCard.expirationMonth,
                  expirationYear: decryptCard.expirationYear,
                  cardHolderName: decryptCard.cardholderName,
                  country: decryptCard.country,
                  cvv: decryptCard.cvv,
                  customer: customer,
                  userId: userId,
                }

                const cardResponse = await fetch(
                  `${API_URL}/api/v1/xendit/card-payment`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payloadCard),
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
                    forPaymenttId: null,
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
                    res.json(
                      response.error({ message: 'Invalid card details' })
                    )
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
          }
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

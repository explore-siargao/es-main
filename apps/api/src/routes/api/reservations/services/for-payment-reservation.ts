import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { API_URL } from '@/common/constants/ev'
import { ResponseService } from '@/common/service/response'
import { T_CardInfo, Z_CardInfo } from '@repo/contract'
import {
  Z_Add_For_Payment,
  Z_Linked_Card_Payment,
  Z_Manual_Card_Payment,
} from '@repo/contract-2/for-payment-listings'
import { dbPaymentMethods, dbReservations } from '@repo/database'
import { EncryptionService, HMACService } from '@repo/services'
import { Request, Response } from 'express'
import { format, differenceInSeconds } from 'date-fns'
import { totalPayment } from '../helpers/totalPrice'

const response = new ResponseService()
const hmacService = new HMACService()
const encryptionService = new EncryptionService('card')
export const gcashPayment = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const {
    id,
    propertyIds = undefined,
    rentalIds = undefined,
    activityIds = undefined,
    guestCount,
    startDate,
    endDate,
  } = req.body
  try {
    if (
      (!propertyIds && !rentalIds && !activityIds) ||
      !guestCount ||
      !startDate ||
      !endDate
    ) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const validForPaymentInput = Z_Add_For_Payment.safeParse({
        _id: id,
        userId: userId,
        propertyIds,
        rentalIds,
        activityIds,
        guestCount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      })
      const price = await totalPayment(req.body)
      if (validForPaymentInput.success) {
        const gcashResponse = await fetch(
          `${API_URL}/api/v1/xendit/gcash-create-payment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: price }),
          }
        )

        const gcashData = await gcashResponse.json()
        if (gcashResponse.ok) {
          const reservationItem = new dbReservations({
            activityIds: activityIds || null,
            rentalIds: rentalIds || null,
            propertyIds: propertyIds || null,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            guest: userId,
            xendItPaymentMethodId: gcashData.item.payment_method.id,
            xendItPaymentRequestId: gcashData.item.id,
            xendItPaymentReferenceId: gcashData.item.reference_id,
            guestCount: guestCount,
            status: 'For-Payment',
            cartId: null,
            forPaymenttId: id,
          })
          const addReservations: any = await reservationItem.save()
          if (addReservations) {
            res.json(
              response.success({
                item: {
                  reservations: reservationItem,
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
      } else {
        console.error(JSON.parse(validForPaymentInput.error.message))
        res.json(response.error({ message: 'Invalid payloads' }))
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

export const manualCardPayment = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const customer = res.locals.user.personalInfo
  const {
    id,
    propertyIds = undefined,
    rentalIds = undefined,
    activityIds = undefined,
    guestCount,
    startDate,
    endDate,
    cardInfo,
    expirationDate,
    hmac,
  } = req.body

  try {
    const recreateHMAC = hmacService.generateHMAC(cardInfo)
    console.log(recreateHMAC)
    if (
      (!propertyIds && !rentalIds && !activityIds) ||
      !guestCount ||
      !startDate ||
      !endDate ||
      !hmac ||
      !expirationDate ||
      !cardInfo
    ) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const decryptCard: any = encryptionService.decrypt(cardInfo)
      if (!decryptCard) {
        res.json(response.error({ message: 'Invalid Card' }))
      } else {
        const currentDate = new Date()
        const utcDate = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'")
        const expiredDate = format(expirationDate, "yyyy-MM-dd'T'HH:mm:ss'Z'")
        if (hmac !== recreateHMAC) {
          res.json(response.error({ message: 'Invalid HMAC. Data tampered.' }))
        } else {
          const computedDate = differenceInSeconds(utcDate, expiredDate)
          console.log(computedDate, expiredDate)
          if (computedDate > 30) {
            res.json(response.error({ message: 'Request expired' }))
          } else {
            const price = await totalPayment(req.body)
            const validForPaymentInput = Z_Manual_Card_Payment.safeParse({
              _id: id,
              userId: userId,
              propertyIds,
              rentalIds,
              price,
              activityIds,
              guestCount,
              startDate: new Date(startDate),
              endDate: new Date(endDate),
              cardInfo: decryptCard,
            })
            if (validForPaymentInput.success) {
              const payloadCard = {
                amount: price,
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
                const reservationItem = new dbReservations({
                  activityIds: activityIds || null,
                  rentalIds: rentalIds || null,
                  propertyIds: propertyIds || null,
                  startDate: startDate,
                  endDate: endDate,
                  guest: userId,
                  xendItPaymentMethodId: cardData.item.payment_method.id,
                  xendItPaymentRequestId: cardData.item.id,
                  xendItPaymentReferenceId: cardData.item.reference_id,
                  guestCount: guestCount,
                  status: 'For-Payment',
                  cartId: null,
                  forPaymenttId: id,
                })
                const addReservations: any = await reservationItem.save()
                if (addReservations) {
                  res.json(
                    response.success({
                      item: {
                        reservations: reservationItem,
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
                    response.error({
                      items: addReservations,
                      message: 'Invalid items',
                    })
                  )
                }
              } else {
                res.json(response.error({ message: cardData.item.message }))
              }
            } else {
              console.error(JSON.parse(validForPaymentInput.error.message))
              res.json(response.error({ message: 'Invalid payloads' }))
            }
          }
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

export const linkedCardPayment = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const customer = res.locals.user.personalInfo
  let paymentMethod
  const {
    id,
    propertyIds = undefined,
    rentalIds = undefined,
    activityIds = undefined,
    guestCount,
    startDate,
    endDate,
    cvv,
    paymentMethodId,
    expirationDate,
    hmac,
  } = req.body

  try {
    if (
      (!propertyIds && !rentalIds && !activityIds) ||
      !guestCount ||
      !startDate ||
      !endDate
    ) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const recreateHMAC = hmacService.generateHMAC({ cvv })
      const price = await totalPayment(req.body)
      const validForPaymentInput = Z_Linked_Card_Payment.safeParse({
        _id: id,
        userId: userId,
        propertyIds,
        rentalIds,
        activityIds,
        price,
        guestCount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        cvv,
      })
      if (validForPaymentInput.success) {
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
            const computedTime = differenceInSeconds(utcDate, expiredDate)
            if (computedTime > 30) {
              res.json(response.error({ message: 'Request expired' }))
            } else {
              const cardInfo = encryptionService.decrypt(
                paymentMethod?.cardInfo as string
              ) as T_CardInfo
              if (cardInfo && cardInfo.cvv === cvv) {
                const cardResponse = await fetch(
                  `${API_URL}/api/v1/xendit/card-payment`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      amount: price,
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
                  const reservationItem = new dbReservations({
                    activityIds: activityIds || null,
                    rentalIds: rentalIds || null,
                    propertyIds: propertyIds || null,
                    startDate: startDate,
                    endDate: endDate,
                    guest: userId,
                    xendItPaymentMethodId: cardData.item.payment_method.id,
                    xendItPaymentRequestId: cardData.item.id,
                    xendItPaymentReferenceId: cardData.item.reference_id,
                    guestCount: guestCount,
                    status: 'For-Payment',
                    cartId: null,
                    forPaymenttId: id,
                  })
                  const addReservations =
                    await dbReservations.insertMany(reservationItem)
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
      } else {
        console.error(JSON.parse(validForPaymentInput.error.message))
        res.json(response.error({ message: 'Invalid payloads' }))
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

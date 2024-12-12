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
import {
  dbForPaymentListing,
  dbPaymentMethods,
  dbReservations,
} from '@repo/database'
import { EncryptionService } from '@repo/services'
import { Request, Response } from 'express'

const response = new ResponseService()
const encryptionService = new EncryptionService('card')
export const gcashPayment = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const {
    id,
    propertyIds = undefined,
    rentalIds = undefined,
    activityIds = undefined,
    price,
    guestCount,
    startDate,
    endDate,
  } = req.body
  try {
    if (
      (!propertyIds && !rentalIds && !activityIds) ||
      !price ||
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
        price,
        guestCount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      })
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
        console.log(gcashResponse)
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
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
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
    price,
    guestCount,
    startDate,
    endDate,
    cardInfo,
  } = req.body

  try {
    if (
      (!propertyIds && !rentalIds && !activityIds) ||
      !price ||
      !guestCount ||
      !startDate ||
      !endDate
    ) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
      const validForPaymentInput = Z_Manual_Card_Payment.safeParse({
        _id: id,
        userId: userId,
        propertyIds,
        rentalIds,
        activityIds,
        price,
        guestCount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        cardInfo,
      })
      if (validForPaymentInput.success) {
        const payloadCard = {
          amount: price,
          cardNumber: cardInfo.cardNumber.trim(),
          expirationMonth: cardInfo.expirationMonth,
          expirationYear: cardInfo.expirationYear,
          cardHolderName: cardInfo.cardholderName,
          country: cardInfo.country,
          cvv: cardInfo.cvv,
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
          res.json(response.error({ message: cardData.message }))
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

export const linkedCardPayment = async (req: Request, res: Response) => {
  const userId = res.locals.user.id
  const customer = res.locals.user.personalInfo
  const {
    id,
    propertyIds = undefined,
    rentalIds = undefined,
    activityIds = undefined,
    price,
    guestCount,
    startDate,
    endDate,
    cvv,
  } = req.body

  try {
    if (
      (!propertyIds && !rentalIds && !activityIds) ||
      !price ||
      !guestCount ||
      !startDate ||
      !endDate
    ) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else {
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
        const paymentMethod = await dbPaymentMethods.findOne({
          user: userId,
          isDefault: true,
        })

        if(!paymentMethod){
            res.json(response.error({message:"No Card linked setted to default"}))
        }else{
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
              res.json(response.error({ message: 'Invalid card details' }))
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

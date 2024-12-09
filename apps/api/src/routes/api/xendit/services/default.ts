import { ApiService } from '@/common/service/api'
import { ResponseService } from '@/common/service/response'
import { Response, Request } from 'express'
import { randomUUID } from 'crypto'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { EncryptionService } from '@repo/services'
import { T_CardInfo } from '@repo/contract'
import { WEB_URL } from '@/common/constants/ev'

const response = new ResponseService()
const apiXendit = new ApiService('xendit')

const encryptionService = new EncryptionService('card')

export const getPaymentRequest = async (req: Request, res: Response) => {
  const id = req.query.id
  if (id) {
    try {
      const pr = await apiXendit.get(`/payment_requests/${id}`, undefined, true)
      res.json(
        response.success({
          item: pr,
        })
      )
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.json(response.error({ message }))
    }
  } else {
    res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  }
}

export const getPaymentMethod = async (req: Request, res: Response) => {
  const id = req.query.id
  if (id) {
    try {
      const pm = await apiXendit.get(`/payment_methods/${id}`, undefined, true)
      res.json(
        response.success({
          item: pm,
        })
      )
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.json(response.error({ message }))
    }
  } else {
    res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  }
}

export const cardSingleUse = async (req: Request, res: Response) => {
  const { cardInfo, cvv, bookingId } = req.body
  if (cardInfo && bookingId) {
    const { cardNumber, expirationMonth, expirationYear, cardholderName } =
      encryptionService.decrypt(cardInfo) as T_CardInfo
    try {
      const data = {
        type: 'CARD',
        card: {
          currency: 'PHP',
          channel_properties: {
            success_return_url: `${WEB_URL}/bookings/${bookingId}/success-payment`,
            failure_return_url: `${WEB_URL}/bookings/${bookingId}/error-payment`,
          },
          card_information: {
            card_number: cardNumber,
            expiry_month: expirationMonth,
            expiry_year: expirationYear,
            card_expiry: '07/25',
            cvv: cvv,
            cardholder_name: cardholderName,
          },
        },
        reusability: 'ONE_TIME_USE',
      }
      const req = await apiXendit.post(`/v1/payment_methods`, data, false, true)
      res.json(response.success({ item: req }))
    } catch (err: any) {
      res.json(response.error({ message: err.message }))
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const cardCreatePayment = async (req: Request, res: Response) => {
  const { paymentMethodId, amount } = req.body
  if (paymentMethodId && amount) {
    try {
      const data = {
        amount: Number(amount),
        currency: 'PHP',
        payment_method_id: paymentMethodId,
      }
      const req = await apiXendit.post(`/payment_requests`, data, false, true)
      res.json(response.success({ item: req }))
    } catch (err: any) {
      res.json(response.error({ message: err.message }))
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const cardInitiatePayment = async (req: Request, res: Response) => {
  const { paymentRequestId, amount } = req.body
  if (paymentRequestId && amount) {
    try {
      const data = {
        capture_amount: amount,
        reference_id: `capture-reference-${randomUUID}`,
      }
      const req = await apiXendit.post(
        `/payment_requests/${paymentRequestId}/captures`,
        data,
        false,
        true
      )
      res.json(response.success({ item: req }))
    } catch (err: any) {
      res.json(response.error({ message: err.message }))
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const gcashCreatePayment = async (req: Request, res: Response) => {
  const { amount } = req.body
  const refId = `${randomUUID()}`
  if (amount) {
    try {
      const data = {
        reference_id: refId,
        amount: amount,
        currency: 'PHP',
        country: 'PH',
        payment_method: {
          type: 'EWALLET',
          ewallet: {
            channel_code: 'GCASH',
            channel_properties: {
              success_return_url: `${WEB_URL}/bookings/${refId}/success-payment`,
              failure_return_url: `${WEB_URL}/bookings/${refId}/error-payment`,
            },
          },
          reusability: 'ONE_TIME_USE',
        },
      }
      const req = await apiXendit.post(`/payment_requests`, data, false, true)
      res.json(response.success({ item: req }))
    } catch (err: any) {
      res.json(response.error({ message: err.message }))
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const cardPayment = async (req: Request, res: Response) => {
  const {
    amount,
    cardNumber,
    cardHolderName,
    country,
    expirationMonth,
    expirationYear,
    cvv,
    customer,
    userId,
  } = req.body
  const refId = `${randomUUID()}`
  if (
    amount &&
    cardNumber &&
    expirationMonth &&
    cardHolderName &&
    country &&
    expirationYear &&
    cvv &&
    customer
  ) {
    try {
      const data = {
        reference_id: refId,
        amount: amount,
        currency: 'PHP',
        country: 'PH',
        customer_id: `cust-${userId}`,
        payment_method: {
          type: 'CARD',
          card: {
            card_information: {
              cardholder_name: cardHolderName,
              card_number: cardNumber,
              expiry_month: expirationMonth,
              expiry_year: expirationYear,
              cvv: cvv,
            },
            channel_properties: {
              success_return_url: `${WEB_URL}/bookings/${refId}/success-payment`,
              failure_return_url: `${WEB_URL}/bookings/${refId}/error-payment`,
              cancel_return_url: `${WEB_URL}/bookings/${refId}/cancel-payment`,
            },
          },
          reusability: 'ONE_TIME_USE',
        },
        metadata: {
          description: 'Card payment for booking',
        },
      }
      const req = await apiXendit.post(`/payment_requests`, data, false, true)
      res.json(response.success({ item: req }))
    } catch (err: any) {
      res.json(response.error({ item: req.body, message: err.message }))
    }
  } else {
    res.json(
      response.error({
        item: req.body,
        message: 'Missing required fields for card payment',
      })
    )
  }
}

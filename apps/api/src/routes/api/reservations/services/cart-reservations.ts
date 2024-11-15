import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { API_URL } from '@/common/constants/ev'
import { ResponseService } from '@/common/service/response'
import { T_CartItem } from '@repo/contract-2/cart'
import { Request, Response } from 'express'

const response = new ResponseService()
export const multipleCheckout = async (req: Request, res: Response) => {
  try {
    const cartItems: T_CartItem[] = req.body.cartItems
    if (!cartItems || cartItems.length === 0) {
      res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    } else if (!Array.isArray(cartItems)) {
      res.json(response.error({ message: 'Invalid Item on cart' }))
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
        res.json(
          response.success({
            item: {
              xendit: gcashData,
              action: {
                type: 'PAYMENT',
                link: gcashData.item.actions[0].url,
              },
              message: 'Pending payment',
            },
          })
        )
      } else {
        res.json(response.error({ message: gcashData.message }))
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

import { Response, Request } from 'express'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  XENDIT_ROOT_URL,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { prisma } from '@/common/helpers/prismaClient'
import {
  E_TransactionStatus,
  T_AddTransaction,
  Z_AddTransaction,
  Z_Transaction,
} from '@repo/contract'
import { ApiService } from '@/common/service/api'

const apiService = new ApiService()

const response = new ResponseService()
export const getTransaction = async (req: Request, res: Response) => {
  const id = req.query.id
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        id: Number(id),
        deletedAt: null,
      },
    })
    res.json(
      response.success({
        item: transactions,
        allItemCount: transactions.length,
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(response.error({ message }))
  }
}

export const updateTransaction = async (req: Request, res: Response) => {
  const bookingId = Number(req.params.bookingId)
  if (bookingId) {
    try {
      const booking = await prisma.booking.findFirst({
        where: {
          id: Number(bookingId),
          deletedAt: null,
        },
      })
      const paymentRequest = await apiService.get(
        `${XENDIT_ROOT_URL}/payment-request`,
        { id: booking?.xenditPaymentRequestId }
      )
      const statusOption = {
        AWAITING_CAPTURE: E_TransactionStatus.Pending,
        FAILED: E_TransactionStatus.Failed,
        SUCCEEDED: E_TransactionStatus.Succeed,
        REFUNDED: E_TransactionStatus.Refunded,
      }
      const prStatus = paymentRequest.item?.status as
        | 'AWAITING_CAPTURE'
        | 'FAILED'
        | 'SUCCEEDED'
        | 'REFUNDED'
      const status = statusOption[prStatus ?? 'AWAITING_CAPTURE']
      const updatedTransaction = await prisma.transaction.update({
        where: {
          id: Number(booking?.transactionId),
        },
        data: {
          earnings: paymentRequest.item?.amount,
          status: status,
        },
      })
      res.json(
        response.success({
          item: updatedTransaction,
          message: 'Successfully updated transaction',
        })
      )
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      res.json(response.error({ message: message }))
    }
  } else {
    res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  }
}

import { z } from "zod"
import { Z_Booking } from ".."
import { E_TransactionStatus } from "./enum"

export const Z_Transaction = z.object({
  id: z.number(),
  bookingId: z.number(),
  booking: Z_Booking,
  earnings: z.number(),
  xenditPaymentRequestId: z.string(),
  status: z.nativeEnum(E_TransactionStatus),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_AddTransaction = z.object({
  bookingId: z.number(),
})

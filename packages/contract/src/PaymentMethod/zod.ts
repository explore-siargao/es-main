import { z } from "zod"
import { Z_User } from ".."

export const Z_PaymentMethod = z.object({
  id: z.number(),
  userId: z.number(),
  user: Z_User,
  cardInfo: z.string(),
  cvv: z.string().optional(),
  cardType: z.string(),
  lastFour: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_AddPaymentMethod = z.object({
  userId: z.number().optional(),
  cardInfo: z.string(),
  cardType: z.string(),
  lastFour: z.string(),
})

export const Z_CardInfo = z.object({
  cvv: z.string().optional(),
  cardNumber: z.string(),
  expirationMonth: z.string(),
  expirationYear: z.string(),
  cardholderName: z.string(),
  country: z.string(),
  zipCode: z.string(),
})

import { z } from "zod"
import { E_PaymentType, Z_Listing, Z_User } from ".."

export const Z_Booking = z.object({
  id: z.number(),
  userId: z.number(),
  listingId: z.number(),
  user: Z_User,
  listing: Z_Listing,
  adultCount: z.number(),
  childrenCount: z.number(),
  infantCount: z.number(),
  paymentType: z.nativeEnum(E_PaymentType),
  cardInfo: z.string().optional(),
  lastFour: z.string().optional(),
  cardType: z.string().optional(),
  PaymentMethod: z.any().optional(),
  paymentMethodId: z.number().optional(),
  xenditPaymentMethodId: z.number().optional(),
  xenditPaymentRequestId: z.string().optional(),
  xenditPaymentReferenceId: z.string().optional(),
  xenditPaymentMethod: z.any().optional(), // this is not in db
  xenditPaymentRequest: z.any().optional(), // this is not in db
  fromDate: z.union([z.string(), z.date()]),
  toDate: z.union([z.string(), z.date()]),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_AddBooking = z.object({
  listingId: z.number(),
  adultCount: z.number(),
  childrenCount: z.number(),
  infantCount: z.number(),
  paymentType: z.nativeEnum(E_PaymentType),
  fromDate: z.union([z.string(), z.date()]),
  toDate: z.union([z.string(), z.date()]),
  cardInfo: z.string().optional(),
  cvv: z.string().optional(),
  paymentMethodId: z.number().optional(),
  lastFour: z.string().optional(),
  cardType: z.string().optional(),
})

import { z } from "zod"
export const Z_ListingPrice = z.object({
  id: z.number().optional(),
  fee: z.string(),
  cleaningFee: z.string(),
  serviceFee: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  countGuest: z.number(),
  isNight: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

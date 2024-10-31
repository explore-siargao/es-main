import { z } from "zod"

export const Z_Carts = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  listingId: z.number(),
  guestCounts: z.number(),
  totalFee: z.number(),
  dateFrom: z.string(),
  dateTo: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

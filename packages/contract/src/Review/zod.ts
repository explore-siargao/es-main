import { z } from "zod"

export const Z_Review = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  listingId: z.number(),
  cleanLinessRates: z.number().min(1).max(5),
  accuracyRates: z.number().min(1).max(5),
  checkInRates: z.number().min(1).max(5),
  communicationRates: z.number().min(1).max(5),
  locationRates: z.number().min(1).max(5),
  valueRates: z.number().min(1).max(5),
  comment: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

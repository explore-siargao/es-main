import { z } from "zod"

export const Z_HouseRule = z.object({
  id: z.number().optional(),
  title: z.string(),
  listingId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

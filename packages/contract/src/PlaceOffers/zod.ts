import { z } from "zod"

export const Z_PlaceOffers = z.object({
  id: z.number().optional(),
  title: z.string(),
  category: z.string(),
  icon: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

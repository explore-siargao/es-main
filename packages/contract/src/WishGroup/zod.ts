import { z } from "zod"
export const Z_WishGroup = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  title: z.string().optional(),
  newTitle: z.string().optional(),
  oldTitle: z.string().optional(),
  listingId: z.number().optional(),
  note: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

import { z } from "zod"

export const Z_CancellationPolicy = z.object({
  id: z.number().optional(),
  title: z.string(),
  listingId: z.number(),
  cancelationDueDate: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

import { z } from "zod"

export const Z_Feature = z.object({
  id: z.number().optional(),
  feature: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

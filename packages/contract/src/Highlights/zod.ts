import { z } from "zod"

export const Z_Highlights = z.object({
  id: z.number().optional(),
  title: z.string(),
  detail: z.string(),
  icon: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

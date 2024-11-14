import { string, z } from "zod"

export const Z_Property_Policy = z.object({
  _id: z.string().optional(),
  index: z.number(),
  category: z.string(),
  reason: z.string().nullable().optional(),
  policy: z.string(),
  isSelected: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

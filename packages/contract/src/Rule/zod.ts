import { z } from "zod"

export const Z_Rule = z.object({
  id: z.number().optional(),
  listingId: z.number(),
  title: z.string(),
  icon: z.string(),
  rule: z.string(),
  description: z.string(),
  cancelationDueDate: z.string().optional(),
  safePropertyId: z.number().optional().nullable(),
  houseRuleId: z.number().optional().nullable(),
  cancellationPolicyId: z.number().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

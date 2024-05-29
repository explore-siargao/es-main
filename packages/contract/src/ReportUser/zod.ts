import { z } from "zod"

export const Z_ReportUser = z.object({
  id: z.number().optional(),
  report: z.array(z.string()),
  reportedBy: z.number().optional(),
  reportedUserId: z.number(),
  reportedByUser: z
    .object({
      name: z.string(),
      email: z.string(),
      profilePicture: z.string().nullable().optional(),
    })
    .optional(),
  reportedUser: z
    .object({
      name: z.string(),
      email: z.string(),
      profilePicture: z.string().nullable().optional(),
    })
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

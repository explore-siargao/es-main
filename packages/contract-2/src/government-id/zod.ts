import { string, z } from "zod"

export const Z_GovernmentId = z.object({
  fileKey: z.string(),
  type: z.string(),
  createdAt: z.string(),
  _id: z.string(),
})

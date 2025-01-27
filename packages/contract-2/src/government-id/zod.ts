import { string, z } from "zod"

const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && val.toString().length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => val.toString())

export const Z_GovernmentId = z.object({
  fileKey: z.string(),
  type: z.string(),
  createdAt: z.union([z.string(), z.date()]),
  _id:  z.union([z.string(), objectIdSchema]),
})

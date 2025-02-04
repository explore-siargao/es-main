import { z } from "zod"

const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && val.toString().length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => val.toString())
export const Z_Address = z.object({
  _id: objectIdSchema.optional(),
  country: z.string(),
  city: z.string(),
  stateProvince: z.string(),
  streetAddress: z.string().nullable().optional(),
  aptSuite: z.string().nullable().optional(),
  zipCode: z.number(),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]).optional().nullable(),
})

export const Z_Location = z.object({
  _id: objectIdSchema.optional(),
  city: z.string().optional(),
  streetAddress: z.string().optional(),
  barangay: z.string().optional(),
  longitude: z.union([z.number(), z.string()]).optional(),
  latitude: z.union([z.number(), z.string()]).optional(),
  howToGetThere: z.string().optional(),
  createdAt: z.union([z.string(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
  deletedAt: z.union([z.string(), z.date()]).nullable().optional(),
})

import { string, z } from "zod"

export const Z_Address = z.object({
  _id: z.string().optional(),
  country: z.string(),
  city: z.string(),
  stateProvince: z.string(),
  streetAddress: z.string().nullable().optional(),
  aptSuite: z.string().nullable().optional(),
  zipCode: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
})

export const Z_Location = z.object({
  _id: z.string().optional(),
  city: z.string().optional(),
  streetAddress: z.string(),
  barangay: z.string(),
  longitude: z.union([z.number(), z.string()]).optional(),
  latitude: z.union([z.number(), z.string()]).optional(),
  howToGetThere: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

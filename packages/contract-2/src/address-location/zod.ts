import { string, z } from "zod"

export const Z_Address = z.object({
  _id: z.string(),
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
  city: z.string(),
  streetAddress: z.string(),
  barangay: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  howToGetThere: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

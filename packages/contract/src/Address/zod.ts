import { z } from "zod"

export const Z_Address = z.object({
  id: z.union([z.number(), z.string()]),
  personalInfoId: z.string(),
  streetAddress: z.string(),
  city: z.string(),
  stateProvince: z.string(),
  aptSuite: z.string().optional(),
  zipCode: z.number(),
  country: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_AddUpdateAddress = z.object({
  streetAddress: z.string(),
  city: z.string(),
  stateProvince: z.string(),
  aptSuite: z.string().optional(),
  zipCode: z.number(),
  country: z.string(),
})

export const Z_UpdatePropertyAddress = z.object({
  street: z.string().optional(),
  barangay: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.number().optional(),
  province: z.string().optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  howToGetThere: z.string().optional(),
})

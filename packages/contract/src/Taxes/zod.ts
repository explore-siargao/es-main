import z from "zod"

export const Z_Taxes = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  countryRegion: z.string(),
  vatId: z.string(),
  nameOnRegistration: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  city: z.string(),
  provinceRegion: z.string(),
  zipPostalCode: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

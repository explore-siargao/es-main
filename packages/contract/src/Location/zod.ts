import { z } from "zod"

export const Z_Location = z.object({
  _id: z.string().optional(),
  street: z.string(),
  barangay: z.string(),
  city: z.string(),
  howToGetThere: z.string(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

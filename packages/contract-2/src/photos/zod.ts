import { z } from "zod"

export const Z_Photo = z.object({
  _id: z.string().optional(),
  bookableUnitId: z.string().nullable().optional(),
  propertyId: z.string().nullable().optional(),
  rentalId: z.string().nullable().optional(),
  activityId: z.string().nullable().optional(),
  key: z.string(),
  thumbKey: z.string(),
  isMain: z.boolean(),
  description: z.string(),
  tags: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

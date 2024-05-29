import z from "zod"

export const Z_Photo = z.object({
  id: z.number().optional(),
  bookableUnitTypeId: z.number().optional(),
  propertyId: z.number().optional(),
  key: z.string().optional(),
  thumbKey: z.string().nullable().optional(),
  description: z.string(),
  tags: z.string(),
  isMain: z.boolean().optional(),
  file: z.record(z.any()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

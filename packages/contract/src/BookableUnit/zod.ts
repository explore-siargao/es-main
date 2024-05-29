import { z } from "zod"

export const Z_BookableUnit = z.object({
  id: z.number().optional(),
  propertyId: z.number().optional(),
  bookableUnitTypeId: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

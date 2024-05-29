import z from "zod"

export const Z_BookableUnitBedConfig = z.object({
  id: z.number().optional(),
  roomName: z.string(),
  bedType: z.string(),
  bedQty: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

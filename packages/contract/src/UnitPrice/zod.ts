import z from "zod"
import { Z_BookableUnitTypes } from "../BookableUnitType"

export const Z_UnitPrice = z.object({
  _id: z.string().optional(),
  baseRate: z.number(),
  baseRateMaxCapacity: z.number(),
  maximumCapacity: z.number(),
  pricePerAdditionalPerson: z.number(),
  discountedWeekLyRate: z.number(),
  discountMonthlyRate: z.number().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

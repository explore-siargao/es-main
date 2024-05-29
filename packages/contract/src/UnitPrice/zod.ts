import z from "zod"
import { Z_BookableUnitTypes } from "../BookableUnitType"

export const Z_UnitPrice = z.object({
  id: z.number().optional(),
  baseRate: z.number(),
  baseRateMaxcapacity: z.number(),
  maximumCapacity: z.number(),
  pricePerAdditionalPerson: z.number(),
  discountedWeekLyRate: z.number(),
  discountMonthlyRate: z.number(),
  BookableUnitType: Z_BookableUnitTypes.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

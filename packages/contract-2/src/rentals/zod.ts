import { z } from "zod"

export const Z_RentalDetails = z.object({
  _id: z.string().optional(),
  engineCapacityLiter: z.number().nullable(),
  engineCapacityCc: z.number().nullable(),
  condition: z.string(),
  exteriorColor: z.string(),
  interiorColor: z.string().nullable().optional(),
  seatingCapacity: z.number().nullable(),
  isRegistered: z.string(),
  weightCapacityKg: z.number().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_RentalPrice = z.object({
  _id: z.string().optional(),
  dayRate: z.number(),
  requiredDeposit: z.number(),
  adminBookingCharge: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_RentalAddOns = z.object({
  _id: z.string().optional(),
  roofRack: z.boolean(),
  boardRack: z.boolean(),
  babySeat: z.boolean(),
  dashCam: z.boolean(),
  includesHelmet: z.boolean(),
  others: z.array(z.string()).nullable().optional(),
})

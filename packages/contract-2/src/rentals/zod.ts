import { z } from "zod"
import { Z_Host } from "../host"
import {
  E_Rental_Category,
  E_Rental_Vehicle_Fuel,
  E_Rental_Vehicle_Transmission,
} from "./enum"
import { Z_Photo } from "../photos"
import { Z_Location } from "../address-location"

const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && val.toString().length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => val.toString())

export const Z_Rental_Details = z.object({
  _id: z.string().optional(),
  engineCapacityLiter: z.number().nullable(),
  engineCapacityCc: z.number().nullable(),
  condition: z.string(),
  exteriorColor: z.string(),
  interiorColor: z.string().nullable().optional(),
  seatingCapacity: z.number().nullable(),
  isRegistered: z.string().optional(),
  haveDriverLicense: z.string().optional(),
  weightCapacityKg: z.number().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_Rental_Price = z.object({
  _id: objectIdSchema.optional(),
  dayRate: z.number(),
  requiredDeposit: z.number(),
  adminBookingCharge: z.number(),
  createdAt: z.union([z.string(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.date()]).nullable().optional(),
  deletedAt: z.union([z.string(), z.date()]).nullable().optional(),
})

export const Z_Rental_AddOns = z.object({
  _id: z.string().optional(),
  roofRack: z.boolean(),
  boardRack: z.boolean(),
  babySeat: z.boolean(),
  dashCam: z.boolean(),
  includesHelmet: z.boolean(),
  others: z.array(z.string()).nullable().optional(),
})

export const Z_Rental_PricePerDate = z.object({
  fromDate: z.string(),
  _id: z.string().optional(),
  toDate: z.string(),
  price: Z_Rental_Price.nullable().optional(),
})

export const Z_Rental = z.object({
  _id: z.string().optional(),
  details: Z_Rental_Details.nullable(),
  pricing: Z_Rental_Price.nullable(),
  host: Z_Host.nullable().optional(),
  category: z.nativeEnum(E_Rental_Category),
  make: z.string(),
  modelBadge: z.string().optional().nullable(),
  bodyType: z.string().optional().nullable(),
  fuel: z.nativeEnum(E_Rental_Vehicle_Fuel).nullable(),
  transmission: z.nativeEnum(E_Rental_Vehicle_Transmission).nullable(),
  year: z.string().optional().nullable(),
  qty: z.number(),
  addOns: Z_Rental_AddOns.nullable(),
  photos: z.array(Z_Photo),
  location: Z_Location.nullable(),
  status: z.enum(["Pending", "Incomplete", "Live"]),
  finishedSections: z.array(z.string()),
  qtyIds: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .nullable(),
  pricePerDates: z.array(Z_Rental_PricePerDate),
  rentalNote: z.string().optional(),
  average: z.number().optional(),
  reviewsCount: z.number().optional(),
  reviews: z.array(z.string()).optional().nullable(),
  daysCanCancel: z.number().optional(),
  updatedAt: z.string().optional().nullable(),
})

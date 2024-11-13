import { string, z } from "zod"
import { Z_RentalPrice } from "../rentals"
import { Z_UnitPrice } from "../property-bookable"

export const Z_Activity_PricePerDate = z.object({
  _id: z.string().optional(),
  fromDate: z.string(),
  toDate: z.string(),
  price: z.number().nullable().optional(),
})

export const Z_Rental_PricePerDate = z.object({
  _id: z.string().optional(),
  fromDate: z.string(),
  toDate: z.string(),
  price: Z_RentalPrice.nullable().optional(),
})

export const Z_Bookable_PricePerDate = z.object({
  _id: z.string().optional(),
  fromDate: z.string(),
  toDate: z.string(),
  price: Z_UnitPrice.nullable().optional(),
})

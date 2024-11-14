import z from "zod"
import {
  Z_Activity_PricePerDate,
  Z_Rental_PricePerDate,
  Z_Bookable_PricePerDate,
} from "./zod"

export type T_Activity_PricePerDate = z.infer<typeof Z_Activity_PricePerDate>
export type T_Rental_PricePerDate = z.infer<typeof Z_Rental_PricePerDate>
export type T_Bookable_PricePerDate = z.infer<typeof Z_Bookable_PricePerDate>

import { z } from "zod"
import {
  Z_Rental,
  Z_Rental_Details,
  Z_Rental_AddOns,
  Z_Rental_Pricing,
  Z_Rental_Basic_Info,
  Z_Rental_Status,
} from "./zod"

export type T_Rentals = z.infer<typeof Z_Rental>
export type T_Rental_Details = z.infer<typeof Z_Rental_Details>
export type T_Rental_AddOns = z.infer<typeof Z_Rental_AddOns>
export type T_Rental_Pricing = z.infer<typeof Z_Rental_Pricing>
export type T_Rental_Basic_Info = z.infer<typeof Z_Rental_Basic_Info>
export type T_Rental_Status = z.infer<typeof Z_Rental_Status>

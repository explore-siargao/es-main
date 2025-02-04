import z from "zod"
import {
  Z_Properties_Search,
  Z_Activities_Search,
  Z_Rentals_Search,
  Z_Category_Highest_Price,
  Z_Rental_Filtered,
  Z_Activity_Filtered,
  Z_Property_Filtered,
} from "./zod"

export type T_Properties_Search = z.infer<typeof Z_Properties_Search>
export type T_Activities_Search = z.infer<typeof Z_Activities_Search>
export type T_Rentals_Search = z.infer<typeof Z_Rentals_Search>
export type T_Category_Highest_Price = z.infer<typeof Z_Category_Highest_Price>
export type T_Rental_Filtered = z.infer<typeof Z_Rental_Filtered>
export type T_Activity_Filtered = z.infer<typeof Z_Activity_Filtered>
export type T_Property_Filtered = z.infer<typeof Z_Property_Filtered>

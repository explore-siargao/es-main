import z from "zod"
import { Z_Rental_Details, Z_Rental_AddOns, Z_Rental_Price, Z_Rental_Additional_Info } from "./zod"
import { Z_Rental } from "./zod"

export type T_Rental_Details = z.infer<typeof Z_Rental_Details>
export type T_Rental_AddOns = z.infer<typeof Z_Rental_AddOns>
export type T_Rental_Price = z.infer<typeof Z_Rental_Price>
export type T_Rental = z.infer<typeof Z_Rental>
export type T_Rental_Additional_Info = z.infer<typeof Z_Rental_Additional_Info>

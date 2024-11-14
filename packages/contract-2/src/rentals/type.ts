import z from "zod"
import { Z_RentalDetails, Z_RentalAddOns, Z_RentalPrice } from "./zod"

export type T_RentalDetails = z.infer<typeof Z_RentalDetails>
export type T_RentalAddOns = z.infer<typeof Z_RentalAddOns>
export type T_RentalPrice = z.infer<typeof Z_RentalPrice>

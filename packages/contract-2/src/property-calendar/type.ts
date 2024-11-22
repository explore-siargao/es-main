import z from "zod"
import { Z_Bookable_Unit, Z_Property_Reservation, Z_Unit_Qty } from "./zod"

export type T_Unit_Qty = z.infer<typeof Z_Unit_Qty>
export type T_Property_Reservation = z.infer<typeof Z_Property_Reservation>
export type T_Bookable_Unit = z.infer<typeof Z_Bookable_Unit>

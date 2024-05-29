import { z } from "zod"
import { Z_AddBooking, Z_Booking } from "./zod"

export type T_Booking = z.infer<typeof Z_Booking>
export type T_AddBooking = z.infer<typeof Z_AddBooking>

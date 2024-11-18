import z from "zod"
import { Z_ReservationCalendar, Z_Add_Reservation } from "./zod"

export type T_ReservationCalendar = z.infer<typeof Z_ReservationCalendar>
export type T_Add_Reservation = z.infer<typeof Z_Add_Reservation>

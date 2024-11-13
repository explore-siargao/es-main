import z from "zod"
import { Z_ReservationCalendar } from "./zod"

export type T_ReservationCalendar = z.infer<typeof Z_ReservationCalendar>

import z from "zod"
import {
  Z_ReservationCalendar,
  Z_Add_Reservation,
  Z_Add_Reservations,
  Z_Reservation,
  Z_Reservations,
  Z_Grouped_Reservation,
  Z_Grouped_Reservations,
} from "./zod"

export type T_ReservationCalendar = z.infer<typeof Z_ReservationCalendar>
export type T_Add_Reservation = z.infer<typeof Z_Add_Reservation>
export type T_Add_Reservations = z.infer<typeof Z_Add_Reservations>
export type T_Reservation = z.infer<typeof Z_Reservation>
export type T_Reservations = z.infer<typeof Z_Reservations>
export type T_Grouped_Reservation = z.infer<typeof Z_Grouped_Reservation>
export type T_Grouped_Reservations = z.infer<typeof Z_Grouped_Reservations>

import z from "zod"
import {
  Z_Joiner_Reservation,
  Z_Joiner_Activity,
  Z_Slot_Joiner,
  Z_Private_Activity,
  Z_Private_Reservation,
} from "./zod"

export type T_Joiner_Reservation = z.infer<typeof Z_Joiner_Reservation>
export type T_Joiner_Activity = z.infer<typeof Z_Joiner_Activity>
export type T_Slot_Joiner = z.infer<typeof Z_Slot_Joiner>
export type T_Private_Activity = z.infer<typeof Z_Private_Activity>
export type T_Private_Reservation = z.infer<typeof Z_Private_Reservation>

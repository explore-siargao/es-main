import { z } from "zod"
import {
  Z_Activity_Segment,
  Z_Activity,
  Z_Update_Activity_Additional_Info,
  Z_Update_Activity_Basic_Info,
  Z_Update_Activity_Inclusions,
  Z_Activity_Status,
  Z_Update_Activity_Pice_Slots,
  Z_Calendar_Private_Activity,
  Z_Calendar_Activity,
  Z_Calendar_Date_Price,
  Z_Calendar_Reservation,
  Z_Calendar_Joiner_Activity,
  Z_Joiner_Activity,
  Z_Joiner_Slot,
} from "./zod"

export type T_Activity_Segment = z.infer<typeof Z_Activity_Segment>
export type T_Activity = z.infer<typeof Z_Activity>

export type T_Update_Activity_Additional_Info = z.infer<
  typeof Z_Update_Activity_Additional_Info
>
export type T_Update_Activity_Inclusions = z.infer<
  typeof Z_Update_Activity_Inclusions
>
export type T_Update_Activity_Basic_Info = z.infer<
  typeof Z_Update_Activity_Basic_Info
>
export type T_Activity_Status = z.infer<typeof Z_Activity_Status>

export type T_Update_Activity_Price_Slots = z.infer<
  typeof Z_Update_Activity_Pice_Slots
>

export type T_Calendar_Private_Activity = z.infer<
  typeof Z_Calendar_Private_Activity
>

export type T_Calendar_Activity = z.infer<typeof Z_Calendar_Activity>

export type T_Calendar_Date_Price = z.infer<typeof Z_Calendar_Date_Price>

export type T_Calendar_Reservation = z.infer<
  typeof Z_Calendar_Reservation
>

export type T_Calendar_Joiner_Activity = z.infer<
  typeof Z_Calendar_Joiner_Activity
>

export type T_Joiner_Activity = z.infer<
  typeof Z_Joiner_Activity
>

export type T_Joiner_Slot = z.infer<
  typeof Z_Joiner_Slot
>

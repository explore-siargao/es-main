import z from "zod"
import { Z_Activity_Schedule, Z_Activity_Day, Z_Activity_Slot, Z_Activity_Segment, Z_Activity_PricePerDate, Z_Activity } from "./zod"

export type T_Activity_Segment = z.infer<typeof Z_Activity_Segment>
export type T_Activity_PricePerDate = z.infer<typeof Z_Activity_PricePerDate>
export type T_Activity_Slot = z.infer<typeof Z_Activity_Slot>
export type T_Activity_Day = z.infer<typeof Z_Activity_Day>
export type T_Activity_Schedule = z.infer<typeof Z_Activity_Schedule>
export type T_Activity = z.infer<typeof Z_Activity>

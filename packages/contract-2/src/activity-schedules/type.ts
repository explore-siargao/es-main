import z from "zod"
import { Z_Activity_Schedule, Z_Activity_Day, Z_Activity_Slot } from "./zod"

export type T_Activity_Slot = z.infer<typeof Z_Activity_Slot>
export type T_Activity_Day = z.infer<typeof Z_Activity_Day>
export type T_Activity_Schedule = z.infer<typeof Z_Activity_Schedule>

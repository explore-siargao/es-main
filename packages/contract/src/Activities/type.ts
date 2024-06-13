import { z } from "zod"
import {
  Z_Activity_Segment,
  Z_Activity,
  Z_Update_Activity_Additional_Info,
  Z_Update_Activity_Basic_Info,
  Z_Update_Activity_Inclusions,
  Z_Activity_Status,
} from "./zod"

export type T_Activity_Segment = z.infer<typeof Z_Activity_Segment>
export type T_Activity = z.infer<typeof Z_Activity>
export type T_UpdateActivityAdditionalInfo = z.infer<
  typeof Z_Update_Activity_Additional_Info
>
export type T_Update_Activity_Inclusions = z.infer<
  typeof Z_Update_Activity_Inclusions
>
export type T_Update_Activity_Basic_Info = z.infer<
  typeof Z_Update_Activity_Basic_Info
>
export type T_Activity_Status = z.infer<typeof Z_Activity_Status>

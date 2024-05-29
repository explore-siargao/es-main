import { z } from "zod"
import {
  Z_Activities,
  Z_ActivitiesAdd,
  Z_UpdateActivities,
  Z_UpdateActivityAdditionalInfo,
  Z_Update_Activity_Basic_Info,
  Z_Update_Activity_Inclusions,
  Z_Activity_Status,
} from "./zod"

export type T_Activities = z.infer<typeof Z_Activities>
export type T_ActivitiesAdd = z.infer<typeof Z_ActivitiesAdd>
export type T_UpdateActivities = z.infer<typeof Z_UpdateActivities>
export type T_UpdateActivityAdditionalInfo = z.infer<
  typeof Z_UpdateActivityAdditionalInfo
>

export type T_Update_Activity_Inclusions = z.infer<
  typeof Z_Update_Activity_Inclusions
>
export type T_Update_Activity_Basic_Info = z.infer<
  typeof Z_Update_Activity_Basic_Info
>
export type T_Activity_Status = z.infer<typeof Z_Activity_Status>

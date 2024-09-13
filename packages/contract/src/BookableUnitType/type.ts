import { z } from "zod"
import {
  Z_AddBedUnit,
  Z_AddRoomUnit,
  Z_AddWholePlaceUnit,
  Z_BookableUnitTypes,
  Z_Update_Bed_Basic_Info,
  Z_UpdateBookableUnitTypes,
} from "./zod"

export type T_BookableUnitType = z.infer<typeof Z_BookableUnitTypes>

export type T_AddWholePlaceUnit = z.infer<typeof Z_AddWholePlaceUnit>
export type T_AddBedUnit = z.infer<typeof Z_AddBedUnit>
export type T_AddRoomUnit = z.infer<typeof Z_AddRoomUnit>
export type T_UpdateBookableUnitTypes = z.infer<
  typeof Z_UpdateBookableUnitTypes
>
export type T_Update_Bed_Basic_Info = z.infer<typeof Z_Update_Bed_Basic_Info>

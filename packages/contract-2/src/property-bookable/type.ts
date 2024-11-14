import z from "zod"
import {
  Z_UnitPrice,
  Z_Amenity,
  Z_Bed,
  Z_Bedroom,
  Z_BookableUnit,
  Z_Facility,
  Z_Policy,
} from "./zod"

export type T_UnitPrice = z.infer<typeof Z_UnitPrice>
export type T_Amenity = z.infer<typeof Z_Amenity>
export type T_Bed = z.infer<typeof Z_Bed>
export type T_Bedroom = z.infer<typeof Z_Bedroom>
export type T_BookableUnit = z.infer<typeof Z_BookableUnit>
export type T_Facility = z.infer<typeof Z_Facility>
export type T_Policy = z.infer<typeof Z_Policy>

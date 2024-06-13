import { z } from "zod"
import {
  Z_Property,
  Z_Property_Basic_Info,
  Z_Property_Policy,
  Z_Property_Facility,
  Z_Property_Amenity,
  Z_Property_Status,
} from "./zod"

export type T_Property = z.infer<typeof Z_Property>
export type T_Property_Basic_Info = z.infer<typeof Z_Property_Basic_Info>
export type T_Property_Policy = z.infer<typeof Z_Property_Policy>
export type T_Property_Facility = z.infer<typeof Z_Property_Facility>
export type T_Property_Amenity = z.infer<typeof Z_Property_Amenity>
export type T_Property_Status = z.infer<typeof Z_Property_Status>
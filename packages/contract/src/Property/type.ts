import { z } from "zod"
import {
  Z_Property,
  Z_Property_Basic_Info,
  Z_Property_Policy,
  Z_Property_Facility,
  Z_Property_Amenity,
  Z_Property_Status,
  Z_Calendar_Property_Price,
  Z_Calendar_Property_Date_Price,
  Z_Calendar_Property_Reservation,
  Z_Calendar_Property_Unit,
  Z_Calendar_Property_Unit_Group,
  Z_Calendar_Property,
} from "./zod"

export type T_Property = z.infer<typeof Z_Property>
export type T_Property_Basic_Info = z.infer<typeof Z_Property_Basic_Info>
export type T_Property_Policy = z.infer<typeof Z_Property_Policy>
export type T_Property_Facility = z.infer<typeof Z_Property_Facility>
export type T_Property_Amenity = z.infer<typeof Z_Property_Amenity>
export type T_Property_Status = z.infer<typeof Z_Property_Status>

export type T_Calendar_Property_Price = z.infer<typeof Z_Calendar_Property_Price>
export type T_Calendar_Property_Date_Price = z.infer<typeof Z_Calendar_Property_Date_Price>
export type T_Calendar_Property_Reservation = z.infer<typeof Z_Calendar_Property_Reservation>
export type T_Calendar_Property_Unit_Group = z.infer<typeof Z_Calendar_Property_Unit_Group>
export type T_Calendar_Property_Unit = z.infer<typeof Z_Calendar_Property_Unit>
export type T_Calendar_Property = z.infer<typeof Z_Calendar_Property>


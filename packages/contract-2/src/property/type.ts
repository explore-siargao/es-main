import z from "zod"
import {
  Z_Bookable_PricePerDate,
  Z_Property,
  Z_Unit_Price,
  Z_Amenity,
  Z_Bed,
  Z_Bedroom,
  Z_Bookable_Unit,
  Z_Facility,
  Z_Policy,
  Z_Add_Property,
  Z_Bookable_Units,
} from "./zod"

export type T_Property = z.infer<typeof Z_Property>
export type T_Add_Property = z.infer<typeof Z_Add_Property>
export type T_Bookable_PricePerDate = z.infer<typeof Z_Bookable_PricePerDate>
export type T_Unit_Price = z.infer<typeof Z_Unit_Price>
export type T_Amenity = z.infer<typeof Z_Amenity>
export type T_Bed = z.infer<typeof Z_Bed>
export type T_Bedroom = z.infer<typeof Z_Bedroom>
export type T_Bookable_Unit = z.infer<typeof Z_Bookable_Unit>
export type T_Facility = z.infer<typeof Z_Facility>
export type T_Policy = z.infer<typeof Z_Policy>
export type T_Bookable_Units = z.infer<typeof Z_Bookable_Units>

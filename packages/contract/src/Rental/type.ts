import { z } from "zod"
import {
  Z_Rental,
  Z_Rental_Details,
  Z_Rental_AddOns,
  Z_Rental_Pricing,
  Z_Rental_Basic_Info,
  Z_Rental_Status,
  Z_UpdateRentalLocation,
  Z_Calendar_Bike_Rental,
  Z_Calendar_Rental,
  Z_Calendar_Rental_Date_Price,
  Z_Calendar_Rental_Reservation,
  Z_Calendar_Car_Rental,
} from "./zod"

export type T_Rentals = z.infer<typeof Z_Rental>
export type T_Rental_Details = z.infer<typeof Z_Rental_Details>
export type T_Rental_AddOns = z.infer<typeof Z_Rental_AddOns>
export type T_Rental_Pricing = z.infer<typeof Z_Rental_Pricing>
export type T_Rental_Basic_Info = z.infer<typeof Z_Rental_Basic_Info>
export type T_Rental_Status = z.infer<typeof Z_Rental_Status>
export type T_UpdateRentalLocation = z.infer<typeof Z_UpdateRentalLocation>

export type T_Calendar_Bike_Rental = z.infer<
  typeof Z_Calendar_Bike_Rental
>

export type T_Calendar_Car_Rental = z.infer<
  typeof Z_Calendar_Car_Rental
>

export type T_Calendar_Rental = z.infer<typeof Z_Calendar_Rental>

export type T_Calendar_Rental_Date_Price = z.infer<typeof Z_Calendar_Rental_Date_Price>

export type T_Calendar_Rental_Reservation = z.infer<typeof Z_Calendar_Rental_Reservation>

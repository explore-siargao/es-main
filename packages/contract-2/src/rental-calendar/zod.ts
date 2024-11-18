import { z } from "zod"
import { Z_ReservationCalendar } from "../reservations"
import { Z_Rental_PricePerDate } from "../rentals"

export const Z_Car = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["available", "occupied"]),
  reservations: z.array(Z_ReservationCalendar),
})

export const Z_CarReservation = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Rental_PricePerDate),
  cars: z.array(Z_Car),
})

export const Z_Bike = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["available", "occupied"]),
  reservations: z.array(Z_ReservationCalendar),
})

export const Z_BikeReservation = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Rental_PricePerDate),
  bicycles: z.array(Z_Bike),
})

export const Z_Motor = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["available", "occupied"]),
  reservations: z.array(Z_ReservationCalendar),
})

export const Z_MotorReservation = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Rental_PricePerDate),
  motorcycles: z.array(Z_Motor),
})

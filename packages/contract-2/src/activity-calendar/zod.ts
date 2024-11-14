import { z } from "zod"
import { Z_ReservationCalendar } from "../reservations"
import { Z_Activity_PricePerDate } from "../price-per-dates"

export const Z_Slot_Joiner = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.enum(["occupied", "available"]),
  reservations: z.array(Z_ReservationCalendar),
})

export const Z_Joiner_Activity = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Activity_PricePerDate),
  slots: z.array(Z_Slot_Joiner),
})

export const Z_Joiner_Reservation = z.object({
  id: z.string().optional(),
  name: z.string(),
  joinerActivities: z.array(Z_Joiner_Activity),
})

export const Z_Private_Activity = z.object({
  id: z.string().optional(),
  name: z.string(),
  note: z.string(),
  status: z.enum(["available", "occupied"]),
  reservations: z.array(Z_ReservationCalendar),
})

export const Z_Private_Reservation = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Activity_PricePerDate),
  privateActivities: z.array(Z_Private_Activity),
})

import { z } from "zod"
import { Z_ReservationCalendar } from "../reservations"
import { Z_Bookable_PricePerDate, Z_Unit_Price } from "../property/zod"

export const Z_Unit_Qty = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.enum(["available", "occupied"]),
  reservations: z.array(Z_ReservationCalendar),
})

export const Z_Bookable_Unit = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: Z_Unit_Price,
  pricePerDates: z.array(Z_Bookable_PricePerDate),
  wholePlaces: z.array(Z_Unit_Qty).optional(),
  rooms: z.array(Z_Unit_Qty).optional(),
  beds: z.array(Z_Unit_Qty).optional(),
})

export const Z_Property_Reservation = z.object({
  propertyTitle: z.string(),
  bookableUnitTypes: z.array(Z_Bookable_Unit),
})

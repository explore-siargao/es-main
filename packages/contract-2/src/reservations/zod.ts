import { z } from "zod"

export const Z_ReservationCalendar = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  name: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  guestCount: z.number(),
  status: z.enum([
    "Confirmed",
    "Not-Confirmed",
    "Cancelled",
    "Checked-In",
    "Checked-Out",
    "No-Show",
    "Blocked-Dates",
    "Out-of-Service-Dates",
  ]),
  notes: z.string().nullable(),
})

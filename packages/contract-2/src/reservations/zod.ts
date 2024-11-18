import { Z_Update_Activity_Additional_Info } from "@repo/contract"
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
    "For-Payment",
  ]),
  notes: z.string().nullable(),
})

export const Z_Add_Reservation = z.object({
  _id: z.string().optional(),
  rentalIds: z
    .object({
      rentalId: z.string(),
      qtyIdsId: z.string(),
      _id: z.string().optional(),
    })
    .optional()
    .nullable(),
  propertyIds: z
    .object({
      unitId: z.string(),
      propertyId: z.string(),
      _id: z.string().optional(),
    })
    .optional()
    .nullable(),
  activityIds: z
    .object({
      activityId: z.string(),
      dayId: z.string(),
      timeSlotId: z.string(),
      slotIdsId: z.string().optional(),
      _id: z.string().optional(),
    })
    .optional()
    .nullable(),
  startDate: z.string(),
  endDate: z.string(),
  guestName: z.string().optional().nullable(),
  guest: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  paymentMethod: z.string().optional().nullable(),
  xendItPaymentMethodId: z.string().optional().nullable(),
  xendItPaymentRequestId: z.string().optional().nullable(),
  xendItPaymentReferenceId: z.string().optional().nullable(),
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
    "For-Payment",
  ]),
  hostHavePenalty: z.boolean(),
  cancelledBy: z.enum(["host", "guest"]),
  cancellationDate: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
  updatedAt: z.string().optional().nullable(),
  deletedAt: z.string().optional().nullable(),
})

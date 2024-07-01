import z from "zod"
import { Z_Activity, Z_BookableUnitTypes, Z_PaymentMethod, Z_PersonalInfo, Z_Rental } from ".."

export const Z_Reservation = z.object({
  _id: z.string().optional(),
  unitId:  z.union([Z_BookableUnitTypes, z.string()]).optional(),
  rentalId: z.union([Z_Rental, z.string()]).optional(),
  activityId:  z.union([Z_Activity, z.string()]).optional(),
  guest: z.union([Z_PersonalInfo, z.string()]),
  paymentType: z.string().optional(),
  cardType: z.string().optional(),
  cardInfo: z.string().optional(),
  paymentMethod: Z_PaymentMethod,
  xendItPaymentMethodId: z.string(),
  xendItPaymentRequestId: z.string(),
  xendItPaymentReferenceId: z.string(),
  guestCount: z.number(),
  status: z.enum([
    "Confirmed",
    "Not-Confirmed",
    "Cancelled",
    "Checked-In",
    "Checked-Out",
    "No-Show",
  ]).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

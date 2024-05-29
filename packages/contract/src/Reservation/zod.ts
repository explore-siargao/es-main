import z from "zod"
import { Z_BookableUnit, Z_PersonalInfo, Z_Property } from ".."

export const Z_Reservation = z.object({
  id: z.number().optional(),
  propertyId: z.number().optional(),
  property: Z_Property.optional(),
  mainGuestId: z.number().optional(),
  status: z.enum(["Approved", "Pending", "Declined", "Refund"]).optional(),
  startDate: z.string(),
  endDate: z.string(),
  guestList: z.array(Z_PersonalInfo).optional(),
  bookedUnits: z.array(Z_BookableUnit).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

import { z } from "zod"
import { Z_Address } from "../Address"
import { Z_EmergencyContact } from "../EmergencyContact"
import { Z_GovernmentId } from ".."

export const Z_PersonalInfo = z.object({
  id: z.number(),
  userId: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  birthDate: z.string(),
  governmentId: z.array(Z_GovernmentId),
  Address: Z_Address,
  currency: z.string(),
  language: z.string(),
  emergencyContacts: z.array(Z_EmergencyContact),
  phoneNumber: z.string(),
  profile: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

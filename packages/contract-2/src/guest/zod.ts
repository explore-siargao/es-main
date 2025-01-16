import { string, z } from "zod"
import { E_RegistrationType, E_UserRole } from "./enum"
import { Z_Address } from "../address-location"
import { Z_GovernmentId } from "../government-id"
import { Z_EmergencyContact } from "@repo/contract"

const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && val.toString().length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => val.toString())

export const Z_Guest = z.object({
  _id: objectIdSchema.optional(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  language: z.string().optional(),
  currency: z.string().optional(),
  gender: z.string().optional(),
  phone: z.string().optional(),
  cellPhone: z.string().optional(),
  governmentId: z.union([z.array(z.string()), z.array(objectIdSchema),z.array(Z_GovernmentId)]).optional(),
  country: z.string().optional(),
  address: z.union([z.string(), Z_Address]).optional(),
  emergencyContacts: z.union([z.array(z.string()), z.array(objectIdSchema), z.array(Z_EmergencyContact)]).optional(),
  birthDate: z.union([z.string(), z.date()]).optional(),
  documentType: z.string().optional(),
  documentNumber: z.string().optional(),
  documentIssueDate: z.string().optional(),
  documentIssuingCountry: z.string().optional(),
  documentExpirationDate: z.string().optional(),
  companyTaxId: z.number().optional(),
  companyName: z.string().optional(),
  confirm: z.string().optional(),
  profile: z.string().optional(),
  createdAt: z.union([z.string(), z.date()]).optional(),
  updatedAt: z.union([z.string(), z.date()]).optional(),
  deletedAt: z.union([z.string(), z.date()]).optional(),
})

import { z } from "zod"
import { Z_Address } from "../address-location"
import { Z_GovernmentId } from "../government-id"

const objectIdSchema = z
  .any()
  .refine((val) => typeof val === "object" && val.toString().length === 24, {
    message: "Invalid ObjectId",
  })
  .transform((val) => val.toString())

export const Z_Host = z.object({
  _id: z.union([z.string(), objectIdSchema]).optional(),
  email: z.string().optional(),
  role: z.string(),
  isHost: z.boolean(),
  profilePicture: z.string(),
  guest: z.object({
    _id: z.union([z.string(), objectIdSchema]).optional(),
    firstName: z.string(),
    middleName: z.string().nullable().optional(),
    lastName: z.string(),
    language: z.string(),
    currency: z.string(),
    phone: z.string().optional(),
    cellPhone: z.string().optional(),
    country: z.string(),
    birthDate: z.union([z.string(), z.date()]).optional(),
    confirm: z.string().optional(),
    governmentId: z.array(Z_GovernmentId).nullable().optional(),
    address: Z_Address,
    createdAt: z.union([z.string(), z.date()]),
    updatedAt: z.union([z.string(), z.date()]).optional().nullable(),
    deletedAt: z.union([z.string(), z.date()]).optional().nullable(),
  }),
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]).optional().nullable(),
  deletedAt: z.union([z.string(), z.date()]).optional().nullable(),
})

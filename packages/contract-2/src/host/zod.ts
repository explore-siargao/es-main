import { z } from "zod"
import { Z_Address } from "../address-location"
import { Z_GovernmentId } from "../government-id"

export const Z_Host = z.object({
  _id: z.string(),
  email: z.string().optional(),
  role: z.string(),
  isHost: z.boolean(),
  guest: z.object({
    _id: z.string(),
    firstName: z.string(),
    middleName: z.string().nullable().optional(),
    lastName: z.string(),
    language: z.string(),
    currency: z.string(),
    phone: z.string().optional(),
    cellPhone: z.string().optional(),
    country: z.string(),
    birthDate: z.string().optional(),
    confirm: z.string().optional(),
    governmentId: z.array(Z_GovernmentId).nullable().optional(),
    address: Z_Address,
    createdAt: z.string().optional(),
    updatedAt: z.string().nullable().optional(),
    deletedAt: z.string().nullable().optional(),
  }),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

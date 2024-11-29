import { string, z } from "zod"
import { E_RegistrationType, E_UserRole } from "./enum"

export const Z_User = z.object({
  _id: z.string().optional(),
  id: z.number().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  changePasswordAt: z.string().optional(),
  role: z.nativeEnum(E_UserRole),
  isHost: z.boolean().optional().default(false),
  registrationType: z.nativeEnum(E_RegistrationType),
  deactivated: z.boolean().optional(),
  profilePicture: z.string().optional(),
  canReceiveEmail: z.boolean().optional(),
  guest: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional(),
})

export const Z_UserRegister = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string(),
  country: z.string(),
  password: z.string().min(8).nullable(),
  registrationType: z.nativeEnum(E_RegistrationType),
  canReceiveEmail: z.boolean(),
})

export const Z_Auth_User = z.object({
  id: z.number(),
  profilePicture: z.string(),
  role: z.nativeEnum(E_UserRole),
  email: z.string().email(),
  password: z.string().min(8).optional(),
  changePasswordAt: string().optional().nullable(),
  canReceiveEmail: z.boolean(),
  registrationType: z.nativeEnum(E_RegistrationType),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

import z from "zod"
import { Z_Photo } from "../Photo"
import { Z_Address } from "../Address"
import { Z_Itineraries } from "../Itineraries"
import { Z_User } from "../User"
import { E_Activity_Status } from "./enum"

export const Z_Activities = z.object({
  id: z.number().optional(),
  host: Z_User.optional(),
  finishedSections: z.string().optional(),
  meetingPointDescription: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  highLights: z.string().optional(),
  durationHour: z.number().optional(),
  durationMinute: z.number().optional(),
  language: z.string().optional(),
  isFoodIncluded: z.boolean().optional(),
  isNonAlcoholicDrinkIncluded: z.boolean().optional(),
  isAlcoholicDrinkIncluded: z.boolean().optional(),
  otherInclusion: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  address: z.array(Z_Address).optional(),
  howToGetThere: z.string().optional(),
  isBuilderEnabled: z.boolean().optional(),
  itineraries: z.array(Z_Itineraries).optional().nullable(),
  notIncluded: z.string().optional(),
  whatToBrings: z.string().optional(),
  notAllowed: z.string().optional(),
  activityPolicies: z.string().optional(),
  cancellationPolicies: z.string().optional(),
  activityPhotos: z.array(Z_Photo).optional(),
  status: z.nativeEnum(E_Activity_Status).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_ActivitiesAdd = z.object({
  id: z.number().optional().nullable(),
  host: Z_User.optional().nullable(),
  finishedSections: z.string().optional().nullable(),
  meetingPointDescription: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  highLights: z.string().optional().nullable(),
  durationHour: z.number().optional().nullable(),
  durationMinute: z.number().optional().nullable(),
  language: z.string().optional().nullable(),
  isFoodIncluded: z.boolean().optional().nullable(),
  isNonAlcoholicDrinkIncluded: z.boolean().optional().nullable(),
  isAlcoholicDrinkIncluded: z.boolean().optional().nullable(),
  otherInclusion: z.string().optional().nullable(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  address: z.array(Z_Address).optional().nullable(),
  howToGetThere: z.string().optional().nullable(),
  isBuilderEnabled: z.boolean(),
  itineraries: z.array(Z_Itineraries).optional().nullable(),
  notIncluded: z.string().optional().nullable(),
  whatToBrings: z.string().optional().nullable(),
  notAllowed: z.string().optional().nullable(),
  activityPolicies: z.string().optional().nullable(),
  cancellationPolicies: z.string().optional().nullable(),
  activityPhotos: z.array(Z_Photo).optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_UpdateActivities = z.object({
  id: z.number().optional().nullable(),
  meetingPointDescription: z.string().optional().nullable(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  address: z.array(Z_Address).optional().nullable(),
  howToGetThere: z.string().optional().nullable(),
  isBuilderEnabled: z.boolean(),
  itineraries: z.array(Z_Itineraries).optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_UpdateActivityAdditionalInfo = z.object({
  whatToBring: z.array(z.string()).optional(),
  notAllowed: z.array(z.string()).optional(),
  policies: z.array(z.string()).optional(),
  cancellationDays: z.number().optional(),
})

export const Z_Update_Activity_Inclusions = z.object({
  isFoodIncluded: z.boolean(),
  selectedFoodOptions: z.array(z.string()).optional().nullable(),
  isNonAlcoholicDrinkIncluded: z.boolean(),
  isAlcoholicDrinkIncluded: z.boolean(),
  selectedAlcoholicDrinkOptions: z.array(z.string()),
  otherInclusion: z.array(z.string()),
  notIncluded: z.array(z.string()),
})

export const Z_Update_Activity_Basic_Info = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  highLights: z.array(z.string()).optional(),
  durationHour: z.number().optional(),
  durationMinute: z.number().optional(),
  languages: z.array(z.string()).optional(),
})

export const Z_Activity_Status = z.object({
  status: z.nativeEnum(E_Activity_Status),
})

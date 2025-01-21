import z from "zod"
import { Z_Photo } from "../Photo"
import { Z_User } from "../User"
import {
  E_Activity_Experience_Type,
  E_Activity_Status,
  E_Calendar_Activity_Status,
} from "./enum"
import { Z_Location } from "../Location"

export const Z_Activity_Segment = z.object({
  index: z.number().optional(),
  activities: z.array(z.string()).optional(),
  durationHour: z.number(),
  durationMinute: z.number(),
  location: z.string().optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  optional: z.boolean(),
  hasAdditionalFee: z.boolean(),
  transfer: z.string().optional(),
})

export const Z_Activity_Price = z.object({
  basePrice: z.number().optional(),
  exceedPersonPrice: z.number().optional(),
})

export const Z_Activity_Slots = z.object({
  time: z.string().optional(),
  minimumGuestCount: z.number().optional(),
})

export const Z_Activity = z.object({
  id: z.string().optional(),
  host: Z_User.optional(),
  finishedSections: z.array(z.string()).optional(),
  title: z.string().optional(),
  experienceType: z.nativeEnum(E_Activity_Experience_Type),
  description: z.string().optional(),
  highLights: z.string().optional(),
  durationHour: z.number().optional(),
  durationMinute: z.number().optional(),
  languages: z.array(z.string()).optional(),
  isFoodIncluded: z.boolean().optional(),
  isNonAlcoholicDrinkIncluded: z.boolean().optional(),
  isAlcoholicDrinkIncluded: z.boolean().optional(),
  otherInclusion: z.string().optional(),
  isSegmentBuilderEnabled: z.boolean(),
  segments: z.array(Z_Activity_Segment).optional(),
  meetingPoint: Z_Location.optional(),
  notIncluded: z.string().optional(),
  whatToBrings: z.string().optional(),
  notAllowed: z.string().optional(),
  policies: z.string().optional(),
  cancellationPolicies: z.string().optional(),
  photos: z.array(Z_Photo).optional(),
  price: Z_Activity_Price.optional(),
  slots: z.array(Z_Activity_Slots).optional(),
  status: z.nativeEnum(E_Activity_Status).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_Calendar_Reservation = z.object({
  id: z.string(),
  name: z.string(),
  notes: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  guestCount: z.number(),
  status: z.string(),
})

export const Z_Calendar_Activity = z.object({
  id: z.string(),
  name: z.string(),
  note: z.string(),
  status: z.nativeEnum(E_Calendar_Activity_Status),
  reservations: z.array(Z_Calendar_Reservation),
})

export const Z_Calendar_Date_Price = z.object({
  fromDate: z.string(),
  toDate: z.string(),
  price: z.number(),
})

export const Z_Calendar_Private_Activity = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Calendar_Date_Price),
  privateActivities: z.array(Z_Calendar_Activity),
})

export const Z_Joiner_Slot = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  reservations: z.array(Z_Calendar_Reservation),
})

export const Z_Joiner_Activity = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Calendar_Date_Price).optional(),
  slots: z.array(Z_Joiner_Slot),
})

export const Z_Calendar_Joiner_Activity = z.object({
  id: z.string(),
  name: z.string(),
  joinerActivities: z.array(Z_Joiner_Activity),
})

export const Z_Update_Activity_Additional_Info = z.object({
  whatToBring: z.array(z.string()).optional(),
  notAllowed: z.array(z.string()).optional(),
  policies: z.array(z.string()).optional(),
  cancellationDays: z.number().nullable().optional(),
})

export const Z_Update_Activity_Inclusions = z.object({
  isFoodIncluded: z.boolean(),
  includedFoods: z.array(z.string()).optional().nullable(),
  isNonAlcoholicDrinkIncluded: z.boolean(),
  isAlcoholicDrinkIncluded: z.boolean(),
  includedAlcoholicDrinks: z.array(z.string()),
  otherInclusion: z.array(z.string()),
  notIncluded: z.array(z.string()),
})

export const Z_Update_Activity_Basic_Info = z.object({
  title: z.string().optional(),
  experienceType: z.nativeEnum(E_Activity_Experience_Type).optional(),
  activityType: z.array(z.string()),
  description: z.string().optional(),
  highLights: z.array(z.string()).optional(),
  durationHour: z.number().optional(),
  durationMinute: z.number().optional(),
  languages: z.array(z.string()).optional(),
})

export const Z_Update_Activity_Pice_Slots = z.object({
  experienceType: z.nativeEnum(E_Activity_Experience_Type),
  schedule: z.object({
    monday: z
      .object({
        slots: z
          .array(z.object({ startTime: z.string(), endTime: z.string() }))
          .optional(),
      })
      .optional(),
    tuesday: z
      .object({
        slots: z
          .array(z.object({ startTime: z.string(), endTime: z.string() }))
          .optional(),
      })
      .optional(),
    wednesday: z
      .object({
        slots: z
          .array(z.object({ startTime: z.string(), endTime: z.string() }))
          .optional(),
      })
      .optional(),
    thursday: z
      .object({
        slots: z
          .array(z.object({ startTime: z.string(), endTime: z.string() }))
          .optional(),
      })
      .optional(),
    friday: z
      .object({
        slots: z
          .array(z.object({ startTime: z.string(), endTime: z.string() }))
          .optional(),
      })
      .optional(),
    saturday: z
      .object({
        slots: z
          .array(z.object({ startTime: z.string(), endTime: z.string() }))
          .optional(),
      })
      .optional(),
    sunday: z
      .object({
        slots: z
          .array(z.object({ startTime: z.string(), endTime: z.string() }))
          .optional(),
      })
      .optional(),
  }),
  slotCapacity: z.object({
    minimum: z.number(),
    maximum: z.number(),
  }),
  pricePerSlot: z.number().optional(),
  pricePerPerson: z.number()
})

export const Z_Activity_Status = z.object({
  status: z.nativeEnum(E_Activity_Status),
})

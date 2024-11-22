import z from "zod"
import { Z_Host } from "../host"
import { Z_Location } from "../address-location"
import { Z_Photo } from "../photos"

export const Z_Activity_Segment = z.object({
  _id: z.string().optional(),
  index: z.number(),
  activities: z.array(z.string()),
  durationHour: z.number(),
  durationMinute: z.number(),
  location: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  optional: z.boolean(),
  hasAdditionalFee: z.boolean(),
  transfer: z.string().nullable().optional(),
})

export const Z_Activity_Slot = z.object({
  _id: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  note: z.string(),
  slotIdsId: z.array(
    z
      .object({
        _id: z.string().optional(),
        name: z.string(),
      })
      .nullable()
      .optional()
  ),
})

export const Z_Activity_Day = z.object({
  _id: z.string().optional(),
  slots: z.array(Z_Activity_Slot).nullable().optional(),
})

export const Z_Activity_Schedule = z.object({
  _id: z.string().optional(),
  monday: Z_Activity_Day.nullable().optional(),
  tuesday: Z_Activity_Day.nullable().optional(),
  wednesday: Z_Activity_Day.nullable().optional(),
  thursday: Z_Activity_Day.nullable().optional(),
  friday: Z_Activity_Day.nullable().optional(),
  saturday: Z_Activity_Day.nullable().optional(),
  sunday: Z_Activity_Day.nullable().optional(),
})

export const Z_Activity_PricePerDate = z.object({
  _id: z.string().optional(),
  fromDate: z.string(),
  toDate: z.string(),
  price: z.number().nullable().optional(),
})

export const Z_Activity = z.object({
  _id: z.string().optional(),
  host: Z_Host,
  title: z.string().optional(),
  activityType: z.array(z.string()).nullable(),
  experienceType: z.enum(["Joiner", "Private"]),
  description: z.string().optional(),
  highLights: z.array(z.string()).nullable(),
  durationHour: z.number(),
  durationMinute: z.number(),
  languages: z.array(z.string()),
  isFoodIncluded: z.boolean(),
  includedFoods: z.array(z.string()),
  isNonAlcoholicDrinkIncluded: z.boolean(),
  isAlcoholicDrinkIncluded: z.boolean(),
  includedAlcoholicDrinks: z.array(z.string()),
  otherInclusion: z.array(z.string()),
  notIncluded: z.array(z.string()),
  whatToBring: z.array(z.string()),
  notAllowed: z.array(z.string()),
  policies: z.array(z.string()),
  isSegmentBuilderEnabled: z.boolean(),
  segments: z.array(Z_Activity_Segment),
  meetingPoint: Z_Location.nullable(),
  photos: z.array(Z_Photo),
  slotCapacity: z.object({
    _id: z.string().optional(),
    minimum: z.number(),
    maximum: z.number(),
  }),
  schedule: Z_Activity_Schedule.nullable().optional(),
  pricePerPerson: z.number().nullable().optional(),
  pricePerSlot: z.number().nullable().optional(),
  daysCanCancel: z.number(),
  status: z.enum(["Pending", "Incomplete", "Live"]),
  finishedSections: z.array(z.string()),
  pricePerDates: z.array(Z_Activity_PricePerDate),
  activityNote: z.string().nullable(),
  average: z.number(),
  reviewsCount: z.number(),
})

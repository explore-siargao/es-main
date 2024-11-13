import { string, z } from "zod"

import { Z_Host } from "../host"
import { Z_Location } from "../address-location"
import { Z_Photo } from "../photos"
import { Z_Activity_Segment } from "../activity-segments"
import { Z_Activity_Schedule } from "../activity-schedules"
import {
  Z_Activity_PricePerDate,
  Z_Rental_PricePerDate,
} from "../price-per-dates"
import { Z_RentalAddOns, Z_RentalDetails, Z_RentalPrice } from "../rentals"
import { Z_BookableUnit, Z_Facility, Z_Policy } from "../property-bookable"

export const Z_Properties_Search = z.object({
  location: z.string().default("any"),
  propertyType: z.string().default("any"),
  priceFrom: z.number().min(0).or(z.literal("any")).default(0),
  priceTo: z.number().min(0).or(z.literal("any")).default(0),
  bedroomCount: z.number().min(1).or(z.literal("any")).default(0),
  bedCount: z.number().min(1).or(z.literal("any")).default(0),
  bathroomCount: z.number().min(1).or(z.literal("any")).default(0),
  facilities: z.string().default("any"),
  amenities: z.string().default("any"),
  starRating: z.number().int().min(1).max(5).or(z.literal("any")).default(1),
  checkIn: z
    .string()
    .refine((date) => date === "any" || !isNaN(new Date(date).getTime()), {
      message: "Invalid date format",
    })
    .default("any"),
  checkOut: z
    .string()
    .refine((date) => date === "any" || !isNaN(new Date(date).getTime()), {
      message: "Invalid date format",
    })
    .default("any"),
  numberOfGuest: z.number().min(1).or(z.literal("any")).default(1),
})

export const Z_Activities_Search = z.object({
  location: z.string().default("any"),
  activityType: z.string().default("any"),
  experienceType: z.string().default("any"),
  priceFrom: z.number().min(0).or(z.literal("any")).default(0),
  priceTo: z.number().min(0).or(z.literal("any")).default(0),
  duration: z.number().min(1).or(z.literal("any")).default(1),
  starRating: z.number().int().min(1).max(5).or(z.literal("any")).default(1),
  date: z
    .string()
    .refine((date) => date === "any" || !isNaN(new Date(date).getTime()), {
      message: "Invalid date format",
    })
    .default("any"),
  numberOfGuest: z.number().min(1).or(z.literal("any")).default(1),
})

export const Z_Rentals_Search = z.object({
  location: z.string().default("any"),
  vehicleType: z.string().default("any"),
  transmissionType: z.string().default("any"),
  priceFrom: z.number().min(0).or(z.literal("any")).default(0),
  priceTo: z.number().min(0).or(z.literal("any")).default(0),
  seatCount: z.number().min(1).or(z.literal("any")).default(1),
  starRating: z.number().int().min(1).max(5).or(z.literal("any")).default(1),
  pickUpDate: z
    .string()
    .refine((date) => date === "any" || !isNaN(new Date(date).getTime()), {
      message: "Invalid date format",
    })
    .default("any"),
  dropOffDate: z
    .string()
    .refine((date) => date === "any" || !isNaN(new Date(date).getTime()), {
      message: "Invalid date format",
    })
    .default("any"),
})

export const Z_Category_Highest_Price = z.object({
  amount: z.number(),
})

export const Z_Rental_Filtered = z.object({
  _id: z.string().optional(),
  details: Z_RentalDetails.nullable(),
  pricing: Z_RentalPrice.nullable(),
  host: Z_Host,
  category: z.enum(["Car", "Motorbike", "Bicycle"]),
  make: z.string(),
  modelBadge: z.string().optional().nullable(),
  bodyType: z.string().optional().nullable(),
  fuel: z.enum(["Petrol", "Diesel", "Electric"]).nullable(),
  transmission: z.enum(["Automatic", "Semi-Automatic", "Manual"]).nullable(),
  year: z.string().optional().nullable(),
  qty: z.number(),
  addOns: Z_RentalAddOns.nullable(),
  photos: Z_Photo.nullable(),
  location: Z_Location.nullable(),
  status: z.enum(["Pending", "Incomplete", "Live"]),
  finishedSections: z.array(z.string()),
  qtyIds: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .nullable(),
  pricePerDates: z.array(Z_Rental_PricePerDate),
  rentalNote: z.string().optional(),
  average: z.number().optional(),
  reviewsCount: z.number().optional(),
})

export const Z_Activity_Filtered = z.object({
  _id: string().optional(),
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

export const Z_Property_Filtered = z.object({
  _id: z.string(),
  offerBy: Z_Host,
  status: z.enum(["Pending", "Incomplete", "Live"]),
  title: z.string(),
  description: z.string(),
  currency: z.string().nullable(),
  primaryLanguage: z.string().nullable(),
  photos: z.array(Z_Photo),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  location: Z_Location,
  checkInTime: z.string().nullable(),
  checkOutTime: z.string().nullable(),
  isLateCheckOutAllowed: z.boolean(),
  lateCheckOutType: z.string().nullable(),
  lateCheckOutValue: z.number().nullable(),
  termsAndConditions: z.string().nullable(),
  taxId: z.string().nullable(),
  taxId2: z.string().nullable(),
  companyLegalName: z.string().nullable(),
  type: z.string(),
  wholeplaceType: z.string().nullable(),
  facilities: z.array(Z_Facility),
  policies: z.array(Z_Policy),
  bookableUnits: z.array(Z_BookableUnit),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

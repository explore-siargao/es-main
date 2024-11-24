import { z } from "zod"

import { Z_Host } from "../host"
import { Z_Location } from "../address-location"
import { Z_Photo } from "../photos"
import {
  Z_Rental_PricePerDate,
  Z_Rental_AddOns,
  Z_Rental_Details,
  Z_Rental_Price,
} from "../rentals"
import { E_Location } from "./enum"
import {
  E_Rental_Category,
  E_Rental_Vehicle_Fuel,
  E_Rental_Vehicle_Transmission,
} from "../rentals/enum"
import { E_Property_Type, E_Whole_Place_Property_Type } from "../property"
import {
  Z_Activity_PricePerDate,
  Z_Activity_Schedule,
  Z_Activity_Segment,
} from "../activity"

export const Z_Properties_Search = z.object({
  page: z.number().min(1).default(1),
  location: z.nativeEnum(E_Location).default(E_Location.any),
  propertyTypes: z.string().default("any"), // TODO: ENUMS
  priceFrom: z.number().min(0).or(z.literal("any")).default(0),
  priceTo: z.number().min(0).or(z.literal("any")).default(0),
  bedroomCount: z.number().min(1).or(z.literal("any")).default(0),
  bedCount: z.number().min(1).or(z.literal("any")).default(0),
  bathroomCount: z.number().min(1).or(z.literal("any")).default(0),
  facilities: z.string().default("any"),
  amenities: z.string().default("any"),
  starRating: z.number().int().min(1).max(5).or(z.literal("any")).default(1),
  checkIn: z
    .union([
      z.literal("any"),
      z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      }),
    ])
    .default("any"),
  checkOut: z
    .union([
      z.literal("any"),
      z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      }),
    ])
    .default("any"),
  numberOfGuest: z.number().min(1).or(z.literal("any")).default("any"),
})

export const Z_Activities_Search = z.object({
  page: z.number().min(1).default(1),
  location: z.nativeEnum(E_Location).default(E_Location.any),
  activityTypes: z.string().default("any"), // TODO: ENUMS
  experienceTypes: z.string().default("any"), // TODO: ENUMS
  priceFrom: z.number().min(0).or(z.literal("any")).default(0),
  priceTo: z.number().min(0).or(z.literal("any")).default(0),
  durations: z.number().min(1).or(z.literal("any")).default(1),
  starRating: z.number().int().min(1).max(5).or(z.literal("any")).default(1),
  activityDate: z
    .union([
      z.literal("any"),
      z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      }),
    ])
    .default("any"),
  numberOfGuest: z.number().min(1).or(z.literal("any")).default(1),
})

export const Z_Rentals_Search = z.object({
  page: z.number().min(1).default(1),
  location: z.nativeEnum(E_Location).default(E_Location.any),
  vehicleTypes: z.string().default("any"), // TODO: ENUMS
  transmissionTypes: z.string().default("any"), // TODO: ENUMS
  priceFrom: z.number().min(0).or(z.literal("any")).default(0),
  priceTo: z.number().min(0).or(z.literal("any")).default(0),
  seatCount: z.number().min(1).or(z.literal("any")).default(1),
  starRating: z.number().int().min(1).max(5).or(z.literal("any")).default(1),
  pickUpDate: z
    .union([
      z.literal("any"),
      z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      }),
    ])
    .default("any"),
  dropOffDate: z
    .union([
      z.literal("any"),
      z.string().refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      }),
    ])
    .default("any"),
})

export const Z_Category_Highest_Price = z.object({
  amount: z.number(),
})

export const Z_Rental_Filtered = z.object({
  // TODO: REMOVE ALL THE UNNECCESSARY DATA, ONLY THE CARD VALUES SAME OF PROPERTY
  _id: z.string().optional(),
  details: Z_Rental_Details.nullable(),
  pricing: Z_Rental_Price.nullable(),
  host: Z_Host,
  category: z.nativeEnum(E_Rental_Category),
  make: z.string(),
  modelBadge: z.string().optional().nullable(),
  bodyType: z.string().optional().nullable(),
  fuel: z.nativeEnum(E_Rental_Vehicle_Fuel).nullable(),
  transmission: z.nativeEnum(E_Rental_Vehicle_Transmission).nullable(),
  year: z.string().optional().nullable(),
  qty: z.number(),
  addOns: Z_Rental_AddOns.nullable(),
  photos: z.array(Z_Photo),
  location: Z_Location.nullable(),
  status: z.string(),
  finishedSections: z.array(z.string()),
  qtyIds: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      })
    )
    .nullable(),
  pricePerDates: z.array(Z_Rental_PricePerDate).nullable(),
  rentalNote: z.string().optional(),
  average: z.number().optional(),
  reviewsCount: z.number().optional(),
})

export const Z_Activity_Filtered = z.object({
  // TODO: REMOVE ALL THE UNNECCESSARY DATA, ONLY THE CARD VALUES SAME OF PROPERTY
  _id: z.string().optional(),
  host: Z_Host,
  title: z.string().optional(),
  activityType: z.array(z.string()).nullable(),
  experienceType: z.string(),
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
  status: z.string(),
  finishedSections: z.array(z.string()),
  pricePerDates: z.array(Z_Activity_PricePerDate),
  activityNote: z.string().nullable(),
  average: z.number(),
  reviewsCount: z.number(),
})

export const Z_Property_Filtered = z.object({
  listingId: z.string(),
  type: z.nativeEnum(E_Property_Type),
  wholeplaceType: z.nativeEnum(E_Whole_Place_Property_Type).optional(),
  location: Z_Location,
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  photos: z.array(Z_Photo),
  average: z.number().optional(),
  reviewsCount: z.number().optional(),
  price: z.number(),
})

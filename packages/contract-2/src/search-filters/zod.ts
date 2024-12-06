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

    const objectIdSchema = z
    .any()
    .refine(
        (val) => typeof val === "object" && val.toString().length === 24,
        { message: "Invalid ObjectId" }
    )
    .transform((val) => val.toString());

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
  _id: objectIdSchema.optional(),
  category:z.nativeEnum(E_Rental_Category),
  make: z.string(),
  modelBadge: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
  location: Z_Location.nullable(),
  pricing: Z_Rental_Price.nullable(),
  photos: z.array(Z_Photo),
  average: z.number().optional(),
  reviewsCount: z.number().optional(),
  transmission: z.nativeEnum(E_Rental_Vehicle_Transmission).nullable(),
  fuel: z.nativeEnum(E_Rental_Vehicle_Fuel).nullable(),
})

export const Z_Rental_Filtered_Result = z.array(Z_Rental_Filtered)

export const Z_Activity_Filtered = z.object({
  // TODO: REMOVE ALL THE UNNECCESSARY DATA, ONLY THE CARD VALUES SAME OF PROPERTY
  _id: objectIdSchema.optional(),
  title: z.string().optional(),
  activityType: z.array(z.string()).nullable(),
  meetingPoint: Z_Location.nullable(),
  photos: z.array(Z_Photo),
  pricePerPerson: z.number().nullable().optional(),
  pricePerSlot: z.number().nullable().optional(),
  average: z.number(),
  reviewsCount: z.number(),
})

export const Z_Activity_Filtered_Results = z.array(Z_Activity_Filtered)

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

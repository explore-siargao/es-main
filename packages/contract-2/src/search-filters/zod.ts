import { z } from "zod"
import { E_Location } from "./enum"

const Z_Properties_Search = z.object({
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
  checkIn: z.union([
    z.literal("any"),
    z
      .string()
      .refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      }),
  ]).default("any"),
  checkOut: z.union([
    z.literal("any"),
    z
      .string()
      .refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      }),
  ]).default("any"),
  numberOfGuest: z.number().min(1).or(z.literal("any")).default("any"),
});

const Z_Activities_Search = z.object({
  page: z.number().min(1).default(1),
  location: z.nativeEnum(E_Location).default(E_Location.any),
  activityTypes: z.string().default("any"), // TODO: ENUMS
  experienceTypes: z.string().default("any"), // TODO: ENUMS
  priceFrom: z.number().min(0).or(z.literal("any")).default(0),
  priceTo: z.number().min(0).or(z.literal("any")).default(0),
  durations: z.number().min(1).or(z.literal("any")).default(1),
  starRating: z.number().int().min(1).max(5).or(z.literal("any")).default(1),
  activityDate: z.union([
    z.literal("any"),
    z
      .string()
      .refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      }),
  ]).default("any"),
  numberOfGuest: z.number().min(1).or(z.literal("any")).default(1),
});

const Z_Rentals_Search = z.object({
  page: z.number().min(1).default(1),
  location: z.nativeEnum(E_Location).default(E_Location.any),
  vehicleTypes: z.string().default("any"), // TODO: ENUMS
  transmissionTypes: z.string().default("any"), // TODO: ENUMS
  priceFrom: z.number().min(0).or(z.literal("any")).default(0),
  priceTo: z.number().min(0).or(z.literal("any")).default(0),
  seatCount: z.number().min(1).or(z.literal("any")).default(1),
  starRating: z.number().int().min(1).max(5).or(z.literal("any")).default(1),
  pickUpDate: z.union([
    z.literal("any"),
    z
      .string()
      .refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      }),
  ]).default("any"),
  dropOffDate: z.union([
    z.literal("any"),
    z
      .string()
      .refine((date) => !isNaN(new Date(date).getTime()), {
        message: "Invalid date format",
      }),
  ]).default("any"),
})

const Z_Category_Highest_Price = z.object({
  amount: z.number(),
})

export {
  Z_Properties_Search,
  Z_Activities_Search,
  Z_Rentals_Search,
  Z_Category_Highest_Price,
}

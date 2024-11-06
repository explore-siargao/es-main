import { z } from "zod";

const Z_Properties_Search = z.object({
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
  checkIn: z.string().refine((date) => date === "any" || !isNaN(new Date(date).getTime()), {
    message: "Invalid date format",
  }).default("any"),
  checkOut: z.string().refine((date) => date === "any" || !isNaN(new Date(date).getTime()), {
    message: "Invalid date format",
  }).default("any"),
  numberOfGuest: z.number().min(1).or(z.literal("any")).default(1),
});

const Z_Activities_Search = z.object({
  location: z.string().default("any"),
  activityType: z.string().default("any"),
  experienceType: z.string().default("any"),
  priceFrom: z.number().min(0).or(z.literal("any")).default(0),
  priceTo: z.number().min(0).or(z.literal("any")).default(0),
  duration: z.number().min(1).or(z.literal("any")).default(1),
  starRating: z.number().int().min(1).max(5).or(z.literal("any")).default(1),
  date: z.string().refine((date) => date === "any" || !isNaN(new Date(date).getTime()), {
    message: "Invalid date format",
  }).default("any"),
  numberOfGuest: z.number().min(1).or(z.literal("any")).default(1),
});

const Z_Rentals_Search = z.object({
  location: z.string().default("any"),
  vehicleType: z.string().default("any"),
  transmissionType: z.string().default("any"),
  priceFrom: z.number().min(0).or(z.literal("any")).default(0),
  priceTo: z.number().min(0).or(z.literal("any")).default(0),
  seatCount: z.number().min(1).or(z.literal("any")).default(1),
  starRating: z.number().int().min(1).max(5).or(z.literal("any")).default(1),
  pickUpDate: z.string().refine((date) => date === "any" || !isNaN(new Date(date).getTime()), {
    message: "Invalid date format",
  }).default("any"),
  dropOffDate: z.string().refine((date) => date === "any" || !isNaN(new Date(date).getTime()), {
    message: "Invalid date format",
  }).default("any"),
});

const Z_Category_Highest_Price = z.object({
  amount: z.number(),
});

export { Z_Properties_Search, Z_Activities_Search, Z_Rentals_Search, Z_Category_Highest_Price };
import z from "zod"
import { Z_User } from "../User"
import { Z_Photo } from "../Photo"
import {
  E_Calendar_Rental_Status,
  E_Rental_Condition,
  E_Rental_Status,
  E_Rental_Vehicle_Fuel,
  E_Rental_Vehicle_Transmission,
} from "./enum"
import { Z_Listing_Location } from "../ListingLocation/zod"

export const Z_Rental_Details = z.object({
  id: z.number().optional(),
  engineCapacityLiter: z.number().optional().nullable(),
  engineCapacityCc: z.number().optional().nullable(),
  condition: z.nativeEnum(E_Rental_Condition),
  exteriorColor: z.string(),
  interiorColor: z.string().optional().nullable(),
  seatingCapacity: z.number().optional().nullable(),
  weightCapacity: z.number(),
  haveDriverLicense: z.enum(["Yes", "No"]).optional().nullable(),
  isRegistered: z.enum(["Yes", "No"]).optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_Rental_AddOns = z.object({
  id: z.number().optional(),
  roofRack: z.boolean().optional(),
  boardRack: z.boolean().optional(),
  babySeat: z.boolean().optional(),
  dashCam: z.boolean().optional(),
  includesHelmet: z.boolean().optional(),
  others: z.array(z.string()),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
  _id: z.string().optional(),
})

export const Z_Rental_Pricing = z.object({
  id: z.number().optional(),
  dayRate: z.number(),
  requiredDeposit: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_Rental = z.object({
  id: z.number().optional(),
  hostId: z.number().optional(),
  Host: Z_User.optional(),
  rentalDetailsId: z.number().optional(),
  Details: Z_Rental_Details.optional(),
  rentalsPricingId: z.number().optional(),
  RentalPricing: Z_Rental_Pricing.optional(),
  category: z.string().optional(),
  make: z.string().optional(),
  modelBadge: z.string().optional(),
  bodyType: z.nativeEnum(E_Rental_Condition).optional(),
  fuel: z.nativeEnum(E_Rental_Vehicle_Fuel).optional(),
  transmission: z.nativeEnum(E_Rental_Vehicle_Transmission).optional(),
  year: z.string().optional(),
  RentalPhotos: z.array(Z_Photo),
  RentalLocation: Z_Listing_Location,
  daysCanCancel: z.number(),
  section: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_Calendar_Rental_Reservation = z.object({
  id: z.string(),
  name: z.string(),
  notes: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  guestCount: z.number(),
  status: z.string(),
})

export const Z_Calendar_Rental = z.object({
  id: z.string(),
  name: z.string(),
  notes: z.string(),
  status: z.nativeEnum(E_Calendar_Rental_Status),
  reservations: z.array(Z_Calendar_Rental_Reservation),
})

export const Z_Calendar_Rental_Date_Price = z.object({
  fromDate: z.string(),
  toDate: z.string(),
  price: Z_Rental_Pricing,
})

export const Z_Calendar_Bike_Rental = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Calendar_Rental_Date_Price),
  bicycles: z.array(Z_Calendar_Rental),
})

export const Z_Calendar_Car_Rental = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Calendar_Rental_Date_Price),
  cars: z.array(Z_Calendar_Rental),
})

export const Z_Calendar_Motor_Rental = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Calendar_Rental_Date_Price),
  motorcycles: z.array(Z_Calendar_Rental),
})

export const Z_Rental_Basic_Info = z.object({
  category: z.string(),
  make: z.string(),
  modelBadge: z.string().optional().nullable(),
  bodyType: z.string().optional().nullable(),
  fuel: z.nativeEnum(E_Rental_Vehicle_Fuel).optional().nullable(),
  transmission: z
    .nativeEnum(E_Rental_Vehicle_Transmission)
    .optional()
    .nullable(),
  year: z.string().optional().nullable(),
  qty: z.number(),
})

export const Z_UpdateRentalLocation = z.object({
  streetAddress: z.string(),
  city: z.string(),
  barangay: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  howToGetThere: z.string().optional().nullable(),
})

export const Z_Rental_Status = z.object({
  status: z.nativeEnum(E_Rental_Status),
})

export const Z_Rental_Additional_Info = z.object({
  policies: z.array(z.string()),
  daysCanCancel: z.string(),
})

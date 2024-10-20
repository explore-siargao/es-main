import { z } from "zod"
import { Z_Photo } from "../Photo"
import { Z_BookableUnit } from "../BookableUnit"
import { Z_User } from "../User"
import { E_Property_Status, E_Property_Type } from "./enum"
import { Z_Listing_Location } from "../ListingLocation/zod"

export const Z_Property_Basic_Info = z.object({
  title: z.string(),
  description: z.string(),
})

export const Z_Property_Policy = z.object({
  index: z.number(),
  _id: z.string().optional().nullable(),
  category: z.string(),
  reason: z.string().optional().nullable(),
  policy: z.string(),
  isSelected: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_Property_Facility = z.object({
  id: z.number().optional().nullable(),
  _id: z.string().optional().nullable(),
  index: z.number(),
  category: z.string(),
  propertyId: z.number().optional().nullable(),
  facility: z.string(),
  isSelected: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_Property_Amenity = z.object({
  id: z.number().optional().nullable(),
  _id: z.string().optional().nullable(),
  index: z.number(),
  category: z.string(),
  bookableUnitTypeId: z.number().optional().nullable(),
  amenity: z.string(),
  isSelected: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_Property = z.object({
  id: z.number().optional(),
  offerBy: Z_User.optional(),
  name: z.string(),
  description: z.string(),
  currency: z.string(),
  primaryLanguage: z.string(),
  Photos: z.array(Z_Photo),
  phone: z.string(),
  email: z.string(),
  Location: Z_Listing_Location,
  checkInTime: z.union([z.string(), z.date()]),
  checkOutTime: z.union([z.string(), z.date()]),
  lateCheckOutAllowed: z.boolean(),
  lateCheckOutType: z.string(),
  propertyLateCheckoutValue: z.number(),
  termsAndConditions: z.string(),
  Amenities: z.array(Z_Property_Amenity).optional(),
  Facilities: z.array(Z_Property_Facility).optional(),
  Policies: z.array(Z_Property_Policy).optional(),
  BookableUnit: z.array(Z_BookableUnit).optional(),
  taxId: z.number(),
  taxId2: z.number(),
  companyLegalName: z.string(),
  type: z.nativeEnum(E_Property_Type),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_Property_Status = z.object({
  status: z.nativeEnum(E_Property_Status),
})

export const Z_Calendar_Property_Price = z.object({
  _id: z.string(),
  baseRate: z.number(),
  baseRateMaxCapacity: z.number(),
  maximumCapacity: z.number(),
  pricePerAdditionalPerson: z.number(),
  createdAt: z.string(),
})

export const Z_Calendar_Property_Date_Price = z.object({
  fromDate: z.string(),
  toDate: z.string(),
  price: Z_Calendar_Property_Price,
  _id: z.string(),
})

export const Z_Calendar_Property_Reservation = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  guestCount: z.number(),
  notes: z.string(),
  status: z.string(), // TODO: CREATE ENUM
})

export const Z_Calendar_Property_Unit = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(), // TODO: CREATE ENUM
  reservations: z.array(Z_Calendar_Property_Reservation),
})

export const Z_Calendar_Property_Unit_Group = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  pricePerDates: z.array(Z_Calendar_Property_Date_Price).optional(),
  wholePlaces: z.array(Z_Calendar_Property_Unit).optional(),
  rooms: z.array(Z_Calendar_Property_Unit).optional(),
  beds: z.array(Z_Calendar_Property_Unit).optional(),
  units: z.array(Z_Calendar_Property_Unit).optional(),
})

export const Z_Calendar_Property = z.object({
  propertyTitle: z.string(),
  bookableUnitTypes: z.array(Z_Calendar_Property_Unit_Group),
})

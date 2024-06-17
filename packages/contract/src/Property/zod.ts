import { z } from "zod"
import { Z_Photo } from "../Photo"
import { Z_BookableUnit } from "../BookableUnit"
import { Z_User } from "../User"
import { E_PropertyStatus, E_Property_Type } from "./enum"
import { Z_Listing_Location } from "../ListingLocation/zod"

export const Z_Property_Basic_Info = z.object({
  title: z.string(),
  description: z.string(),
})

export const Z_Property_Policy = z.object({
  index: z.number(),
  id: z.number().optional().nullable(),
  category: z.string().optional(),
  reason: z.string().optional().nullable(),
  policy: z.string().optional(),
  propertyId: z.number().optional().nullable(),
  isSelected: z.boolean().optional(),
})

export const Z_Property_Facility = z.object({
  id: z.number().optional().nullable(),
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
  id: z.number().optional(),
  index: z.number(),
  category: z.string(),
  bookableUnitTypeId: z.number().optional().nullable(),
  amenity: z.string(),
  isSelected: z.boolean(),
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
  status: z.nativeEnum(E_PropertyStatus),
})

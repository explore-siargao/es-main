import { z } from "zod"
import { Z_Photo } from "../photos"
import { Z_Bookable_PricePerDate } from "../price-per-dates"

export const Z_UnitPrice = z.object({
  _id: z.string(),
  baseRate: z.number(),
  baseRateMaxCapacity: z.number(),
  maximumCapacity: z.number(),
  pricePerAdditionalPerson: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable().optional(),
  deletedAt: z.string().datetime().nullable().optional(),
  discountedWeekLyRate: z.number().nullable(),
})

export const Z_Amenity = z.object({
  _id: z.string(),
  category: z.string(),
  amenity: z.string(),
})

export const Z_Facility = z.object({
  _id: z.string(),
  category: z.string(),
  facility: z.string(),
})

export const Z_Policy = z.object({
  _id: z.string(),
  category: z.string(),
  reason: z.string().nullable(),
  policy: z.string(),
})

export const Z_Bed = z.object({
  name: z.string(),
  qty: z.number(),
  _id: z.string(),
})

export const Z_Bedroom = z.object({
  roomName: z.string(),
  beds: z.array(Z_Bed),
  _id: z.string(),
})

export const Z_BookableUnit = z.object({
  _id: z.string().optional(),
  category: z.enum(["Bed", "Room", "Whole-Place"]),
  title: z.string().optional(),
  subtitle: z.string().nullable(),
  totalSize: z.number(),
  isHaveSharedBathRoom: z.string().nullable().optional(),
  unitPrice: Z_UnitPrice,
  amenities: z.array(Z_Amenity),
  photos: z.array(Z_Photo),
  isPrivate: z.boolean(),
  maxGuests: z.number(),
  adultsIncluded: z.number().optional(),
  childrenIncluded: z.number().optional(),
  bedRooms: z.array(Z_Bedroom).nullable(),
  isMultiRoomUnit: z.boolean(),
  numBedrooms: z.number().optional(),
  numBathrooms: z.number().optional(),
  qty: z.number(),
  pricePerDates: z.array(Z_Bookable_PricePerDate),
  livingRooms: z.array(Z_Bedroom),
  bedroomStudio: z.array(Z_Bedroom),
  qtyIds: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
    })
  ),
  average: z.number(),
  reviewsCount: z.number(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

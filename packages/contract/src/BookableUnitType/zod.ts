import { z } from "zod"
import { Z_BookableUnit } from "../BookableUnit"
import { Z_Photo } from "../Photo"
import { Z_Feature } from "../Feature"
import { Z_BookableUnitBedConfig } from "../BookableUnitBedConfig"
import { Z_Property_Amenity } from "../Property"
export const Z_BookableUnitTypes = z.object({
  id: z.number().optional(),
  hostId: z.number().optional(),
  Host: z
    .object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
    })
    .optional(),
  category: z.string(),
  name: z.string(),
  description: z.string(),
  isPrivate: z.boolean().optional(),
  maxGuests: z.number(),
  adultsIncluded: z.number(),
  childrenIncluded: z.number(),
  isMultiRoomUnit: z.boolean(),
  Amenities: z.array(Z_Property_Amenity).optional(),
  Photos: z.array(Z_Photo).optional(),
  Features: z.array(Z_Feature).optional(),
  BedConfigs: z.array(Z_BookableUnitBedConfig).optional(),
  BookableUnit: z.array(Z_BookableUnit).optional(),
  numBedrooms: z.number().optional(),
  numBathrooms: z.number().optional(),
  minNightlyRate: z.number(),
  totalSize: z.string(),
  qty: z.number(),
  additionalPricePerPerson: z.number(),
  thresholdOccupancyForAdditionalCharge: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().nullable().optional(),
  deletedAt: z.date().nullable().optional(),
})

export const Z_UpdateBookableUnitTypes = z.object({
  id: z.number().optional().nullable(),
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  qty: z.number().optional().nullable(),
  Amenities: z.array(Z_Property_Amenity).optional(),
  Photos: z.array(Z_Photo).optional().nullable(),
})

export const Z_AddWholePlaceUnit = z.object({
  name: z.string(),
  numBedrooms: z.number(),
  numBathrooms: z.number(),
  bedConfig: z.array(Z_BookableUnitBedConfig).optional(),
  totalSize: z.string(),
  amenities: z.array(Z_Property_Amenity),
  qty: z.number(),
})

export const Z_AddRoomUnit = z.object({
  name: z.string(),
  bedConfig: z.string(),
  totalSize: z.string(),
  amenities: z.array(Z_Property_Amenity),
  qty: z.number(),
})

export const Z_AddBedUnit = z.object({
  name: z.string(),
  bedConfig: z.string(),
  amenities: z.array(Z_Property_Amenity),
  qty: z.number(),
})

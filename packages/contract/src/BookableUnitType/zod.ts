import { z } from "zod"
import { Z_BookableUnit } from "../BookableUnit"
import { Z_Photo } from "../Photo"
import { Z_Feature } from "../Feature"
import { Z_BookableUnitBedConfig } from "../BookableUnitBedConfig"
import { Z_Property_Amenity } from "../Property"
import { Z_UnitPrice } from "../UnitPrice"

export const Z_BookableUnitTypes: any = z.object({
  _id: z.string().optional(),
  unitPrice: z.union([z.string(), Z_UnitPrice]).optional(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  isPrivate: z.boolean().optional(),
  maxGuests: z.number(),
  adultsIncluded: z.number(),
  childrenIncluded: z.number(),
  isMultiRoomUnit: z.boolean(),
  amenities: z.array(Z_Property_Amenity).optional(),
  photos: z.array(Z_Photo).optional(),
  features: z.array(Z_Feature).optional(),
  bedConfigs: z.array(Z_BookableUnitBedConfig).optional(),
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

export const Z_Update_Bed_Basic_Info = z.object({
  _id: z.string().optional().nullable(),
  title: z.string(),
  subtitle: z.string(),
  qty: z.number(),
  daysCanCancel: z.number(),
  isHaveSharedBathRoom: z.enum(["Yes", "No"]).optional().nullable(),
  isSmokingAllowed: z.enum(["Yes", "No"]).optional().nullable(),
  totalSize: z.number(),
  amenities: z.array(Z_Property_Amenity).optional().nullable(),
})

import z from "zod"
import { Z_Host } from "../host"
import { Z_Photo } from "../photos"
import { Z_Location } from "../address-location"
import { E_Property_Status, E_Property_Type, E_Whole_Place_Property_Type } from "./enum"

export const Z_Unit_Price = z.object({
  _id: z.string().optional(),
  baseRate: z.number(),
  baseRateMaxCapacity: z.number(),
  maximumCapacity: z.number(),
  pricePerAdditionalPerson: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable().optional(),
  deletedAt: z.string().datetime().nullable().optional(),
  discountedWeeklyRate: z.number().nullable().optional(),
  discountedMonthlyRate: z.number().nullable().optional(),

})

export const Z_Bookable_PricePerDate = z.object({
  _id: z.string().optional(),
  fromDate: z.string(),
  toDate: z.string(),
  price: Z_Unit_Price.nullable().optional(),
})

export const Z_Amenity = z.object({
  _id: z.string().optional(),
  index:z.number().optional(),
  category: z.string(),
  amenity: z.string(),
  isSelected:z.boolean().optional()
})

export const Z_Facility = z.object({
  _id: z.string().optional(),
  index:z.number().optional(),
  category: z.string(),
  facility: z.string(),
  propertyId:z.string().nullable().optional(),
  isSelected:z.boolean().optional()
})

export const Z_Policy = z.object({
  _id: z.string().optional(),
  index:z.number().optional(),
  category: z.string(),
  reason: z.string().nullable(),
  policy: z.string(),
  isSelected:z.boolean().optional()
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

export const Z_Add_Property = z.object({
  _id: z.string().optional(),
  offerBy: z.string().nullable().optional(),
  type: z.nativeEnum(E_Property_Type).optional(),
  status: z.nativeEnum(E_Property_Status).optional(),
  title: z.string(),
  description: z.string(),
  currency: z.string().nullable(),
  primaryLanguage: z.string().nullable(),
  photos: z.array(z.string()),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  location: z.string().nullable().optional(),
  checkInTime: z.string().nullable(),
  checkOutTime: z.string().nullable(),
  isLateCheckOutAllowed: z.boolean(),
  lateCheckOutType: z.string().nullable(),
  lateCheckOutValue: z.number().nullable(),
  termsAndConditions: z.string().nullable(),
  taxId: z.string().nullable(),
  taxId2: z.string().nullable(),
  companyLegalName: z.string().nullable(),
  wholeplaceType: z
    .nativeEnum(E_Whole_Place_Property_Type)
    .optional()
    .nullable(),
  facilities: z.array(z.string()).optional(),
  policies: z.array(z.string()).optional(),
  bookableUnits: z.array(z.string()).optional(),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
  finishedSections: z.array(z.string()).optional(),
  reservations: z.array(z.string()).optional(),
})

export const Z_Bookable_Unit = z.object({
  _id: z.string().optional(),
  category: z.enum(["Bed", "Room", "Whole-Place"]),
  title: z.string().optional(),
  subtitle: z.string().nullable(),
  totalSize: z.number(),
  isHaveSharedBathRoom: z.string().nullable().optional(),
  unitPrice: Z_Unit_Price,
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

export const Z_Property = z.object({
  _id: z.string(),
  offerBy: Z_Host,
  status: z.enum(["Pending", "Incomplete", "Live"]),
  title: z.string(),
  description: z.string(),
  currency: z.string().nullable(),
  primaryLanguage: z.string().nullable(),
  photos: z.array(Z_Photo),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  location: Z_Location,
  checkInTime: z.string().nullable(),
  checkOutTime: z.string().nullable(),
  isLateCheckOutAllowed: z.boolean(),
  lateCheckOutType: z.string().nullable(),
  lateCheckOutValue: z.number().nullable(),
  termsAndConditions: z.string().nullable(),
  taxId: z.string().nullable(),
  taxId2: z.string().nullable(),
  companyLegalName: z.string().nullable(),
  type: z.string(),
  wholeplaceType: z.string().nullable(),
  facilities: z.array(Z_Facility),
  policies: z.array(Z_Policy),
  bookableUnits: z.array(Z_Bookable_Unit),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_Bookable_Units = z.object({
  category: z.string(),
  title: z.string(),
  subtitle: z.string(),
  unitNote: z.string().nullable().optional(),
  description: z.string(),
  totalSize: z.number(),
  isHaveSharedBathRoom: z.string(),
  isHaveSharedAmenities: z.string(),
  isSmokingAllowed: z.string(),
  bed: z.string(),
  unitPrice: z.array(z.string()).nullable().optional(),
  pricePerDates: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  photos: z.array(z.string()).optional(),
  isPrivate: z.boolean(),
  maxGuests: z.number(),
  adultsIncluded: z.number(),
  childrenIncluded: z.number(),
  bedRooms: z.array(z.string()).optional(),
  livingRooms: z.array(z.string()).optional(),
  bedroomStudio: z.array(z.string()).optional(),
  singleLivingRoom: z.string().nullable(),
  singleBedRoom: z.string().nullable(),
  isMultiRoomUnit: z.boolean(),
  numBedRooms: z.string(),
  numBathRooms: z.string(),
  bedConfigs: z.array(z.string()).optional(),
  qty: z.number(),
  qtyIds: z.array(z.string()).optional(),
  daysCanCancel: z.number().optional(),
  reviews: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().nullable().optional(),
})
import { z } from "zod"
import { Z_Host } from "../host"
import { Z_Location } from "../address-location"
import { Z_Photo } from "../photos"
import { Z_Property_Policy } from "../policies"
import {
  Z_Rental_AddOns,
  Z_Rental_Details,
  Z_Rental_Price,
  Z_Rental_PricePerDate,
} from "../rentals"
import { Z_Bookable_PricePerDate } from "../property"
import {
  Z_Activity_PricePerDate,
  Z_Activity_Schedule,
  Z_Activity_Segment,
} from "../activity"
const numberOrString = z.union([z.number(), z.string()])
const Z_Contact = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
})
export const Z_AddCart = z
  .object({
    id: z.string().optional(),
    _id: z.string().optional(),
    userId: z.union([z.string(), Z_Host]).optional(),
    propertyIds: z
      .object({
        propertyId: z.string().optional(),
        unitId: z.string().optional(),
      })
      .optional()
      .nullable(),
    rentalIds: z
      .object({
        rentalId: z.string().optional(),
        qtyIdsId: z.string().optional(),
      })
      .optional()
      .nullable(),
    activityIds: z
      .object({
        activityId: z.string().optional(),
        dayId: z.string().optional(),
        timeSlotId: z.string().optional(),
        slotIdsId: z.string().optional(),
      })
      .optional()
      .nullable(),
    guestCount: z.number(),
    price: z.number().optional(),
    startDate: z.string(),
    endDate: z.string(),
    createdAt: z.string().nullable().optional(),
    updatedAt: z.string().nullable().optional(),
    deletedAt: z.string().nullable().optional(),
  })
  .refine((data) => data.propertyIds || data.rentalIds || data.activityIds, {
    message:
      "At least one of propertyIds, rentalIds, or activityIds must be provided.",
    path: ["propertyIds", "rentalIds", "activityIds"],
  })

export const Z_UpdateCart = z.object({
  startDate: z.string(),
  endDate: z.string(),
  price: z.number(),
  contacts: z.array(Z_Contact).optional(),
})

export const Z_Amenities = z.object({
  _id: z.string().optional(),
  index: z.number(),
  category: z.string(),
  amenity: z.string(),
  isSelected: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_BedRoom = z.object({
  _id: z.string().optional(),
  roomName: z.string().optional(),
  beds: z
    .array(
      z.object({
        _id: z.string().optional(),
        name: z.string(),
        qty: z.number(),
      })
    )
    .nullable()
    .optional(),
})

export const Z_Facility = z.object({
  _id: z.string().optional(),
  index: z.number(),
  category: z.string(),
  facility: z.string(),
  isSelected: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_Review = z.object({
  _id: z.string().optional(),
  reviewerId: Z_Host,
  cleanlinessRates: z.number(),
  accuracyRates: z.number(),
  checkInRates: z.number(),
  communicationRates: z.number(),
  valueRates: z.number(),
  comment: z.string().nullable().optional(),
  totalRates: z.number(),
  property: z
    .object({
      propertyId: z.string().optional(),
      bookableUnitId: z.string().optional(),
    })
    .nullable()
    .optional(),
  rental: z.string().optional(),
  activity: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_CartItem = z.object({
  _id: z.string().optional(),
  userId: Z_Host.optional(),
  propertyIds: z
    .object({
      _id: z.string().optional(),
      unitId: z.object({
        _id: z.string().optional(),
        category: z.enum(["Bed", "Room", "Whole-Place"]),
        title: z.string().optional(),
        subtitle: z.string().optional(),
        totalSize: z.number(),
        unitPrice: z
          .object({
            _id: z.string().optional(),
            baseRate: z.number(),
            baseRateMaxCapacity: z.number(),
            maximumCapacity: z.number(),
            pricePerAdditionalPerson: z.number(),
            discountedWeeklyRate: z.number(),
            createdAt: z.string().optional(),
            updatedAt: z.string().nullable().optional(),
            deletedAt: z.string().nullable().optional(),
          })
          .nullable()
          .optional(),
        amenities: z.array(Z_Amenities).nullable().optional(),
        photos: z.array(Z_Photo).nullable().optional(),
        isPrivate: z.boolean(),
        maxGuests: z.number(),
        adultsIncluded: z.number(),
        childrenIncluded: z.number(),
        bedRooms: z.array(Z_BedRoom).nullable().optional(),
        isMultiRoomUnit: z.boolean().optional(),
        numBedrooms: z.number().optional(),
        numBathrooms: z.number().optional(),
        qty: z.number(),
        livingRooms: z.array(Z_BedRoom).nullable().optional(),
        bedroomStudio: z.array(Z_BedRoom).nullable().optional(),
        singleBedRoom: z
          .object({
            _id: z.string().optional(),
            name: z.string(),
            qty: z.number(),
          })
          .nullable()
          .optional(),
        singleLivingRoom: z
          .object({
            _id: z.string().optional(),
            name: z.string(),
            qty: z.number(),
          })
          .nullable()
          .optional(),
        qtyIds: z
          .array(
            z.object({
              _id: z.string().optional(),
              name: z.string(),
            })
          )
          .nullable()
          .optional(),
        pricePerDates: z.array(Z_Bookable_PricePerDate).nullable().optional(),
        reviews: Z_Review.nullable().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().nullable(),
        deletedAt: z.string().nullable(),
      }),
      propertyId: z.object({
        _id: z.string().optional(),
        offerBy: Z_Host,
        status: z.enum(["Pending", "Incomplete", "Live"]),
        finishedSections: z.array(z.string()).optional(),
        title: z.string().nullable().optional(),
        description: z.string(),
        currency: z.string().nullable().optional(),
        primaryLanguage: z.string().nullable().optional(),
        photos: z.array(Z_Photo).nullable().optional(),
        phone: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
        location: Z_Location.nullable().optional(),
        checkInTime: z.string().nullable().optional(),
        checkOutTime: z.string().nullable().optional(),
        isLateCheckOutAllowed: z.boolean(),
        lateCheckOutType: z.string().nullable().optional(),
        lateCheckOutValue: z.number().nullable().optional(),
        termsAndConditions: z.string().nullable().optional(),
        taxId: numberOrString,
        taxId2: numberOrString,
        companyLegalName: z.string().nullable().optional(),
        type: z.enum([
          "HOSTEL",
          "HOMESTAY",
          "HOTEL",
          "APARTMENT",
          "RESORT",
          "WHOLE_PLACE",
        ]),
        wholePlaceType: z
          .enum(["VILLA", "HOUSE", "BUNGALOW", "COTTAGE"])
          .nullable()
          .optional(),
        facilities: z.array(Z_Facility).nullable().optional(),
        policies: z.array(Z_Property_Policy).nullable().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().nullable(),
        deletedAt: z.string().nullable(),
      }),
    })
    .nullable()
    .optional(),
  rentalIds: z
    .object({
      _id: z.string().optional(),
      rentalId: z.object({
        _id: z.string().optional(),
        details: Z_Rental_Details,
        pricing: Z_Rental_Price.nullable().optional(),
        host: Z_Host.nullable().optional(),
        category: z.enum(["Car", "Motorbike", "Bicycle", ""]),
        make: z.string().nullable().optional(),
        modelBadge: z.string().nullable().optional(),
        bodyType: z.string().nullable().optional(),
        fuel: z.string().nullable().optional(),
        transmission: z.string().nullable().optional(),
        year: z.string().nullable().optional(),
        qty: z.number(),
        addOns: Z_Rental_AddOns,
        photos: z.array(Z_Photo).nullable().optional(),
        location: Z_Location.nullable().optional(),
        status: z.enum(["Pending", "Incomplete", "Live"]),
        finishedSections: z.array(z.string()).nullable().optional(),
        daysCanCancel: z.number().nullable().optional(),
        pricePerDates: z.array(Z_Rental_PricePerDate).nullable().optional(),
        qtyIds: z
          .array(z.object({ _id: z.string().optional(), name: z.string() }))
          .nullable()
          .optional(),
        rentalNote: z.string().nullable().optional(),
        reviews: Z_Review.nullable().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().nullable().optional(),
        deletedAt: z.string().nullable().optional(),
      }),
      qtyIdsId: z.string(),
    })
    .nullable()
    .optional(),
  activityIds: z
    .object({
      _id: z.string().optional(),
      activityId: z.object({
        _id: z.string().optional(),
        host: Z_Host.optional(),
        title: z.string().optional(),
        activityType: z.array(z.string()),
        experienceType: z.enum(["Private", "Joiner"]),
        description: z.string().optional(),
        highLights: z.array(z.string()),
        durationHour: z.number(),
        durationMinute: z.number(),
        languages: z.array(z.string()),
        isFoodIncluded: z.boolean(),
        includedFoods: z.array(z.string()),
        isNonAlcoholicDrinkIncluded: z.boolean(),
        isAlcoholicDrinkIncluded: z.boolean(),
        includedAlcoholicDrinks: z.array(z.string()),
        otherInclusion: z.array(z.string()),
        notIncluded: z.array(z.string()),
        whatToBring: z.array(z.string()),
        notAllowed: z.array(z.string()),
        policies: z.array(z.string()),
        isSegmentBuilderEnabled: z.boolean(),
        segments: z.array(Z_Activity_Segment).nullable().optional(),
        meetingPoint: Z_Location,
        photos: z.array(Z_Photo).nullable().optional(),
        slotCapacity: z.object({
          _id: z.string().optional(),
          minimum: z.number(),
          maximum: z.number(),
        }),
        schedule: Z_Activity_Schedule.optional(),
        pricePerPerson: z.number().nullable().optional(),
        pricePerSlot: z.number().nullable().optional(),
        daysCanCancel: z.number(),
        status: z.enum(["Pending", "Incomplete", "Live"]),
        finishedSections: z.array(z.string()),
        pricePerDates: z.array(Z_Activity_PricePerDate).nullable().optional(),
        activityNote: z.string().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().nullable().optional(),
        deletedAt: z.string().nullable().optional(),
      }),
      dayId: z.string(),
      timeSlotId: z.string(),
      slotIdsId: z.string(),
    })
    .nullable()
    .optional(),
  guestCount: z.number().optional(),
  price: z.number(),
  endDate: z.string(),
  startDate: z.string(),
  status: z.enum(["Active", "Completed", "Removed"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_Add_CartItems = z.array(Z_AddCart)

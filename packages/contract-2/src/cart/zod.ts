import { z } from "zod"
const numberOrString = z.union([z.number(), z.string()])
export const Z_AddCart = z
  .object({
    id: z.string().optional(),
    userId: z.string().optional(),
    propertyIds: z
      .object({
        propertyId: z.string(),
        unitId: z.string(),
      })
      .optional(),
    rentalIds: z
      .object({
        rentalId: z.string(),
        qtyIdsId: z.string(),
      })
      .optional(),
    activityIds: z
      .object({
        activityId: z.string(),
        dayId: z.string(),
        timeSlotId: z.string(),
        slotIdsId: z.string().optional(),
      })
      .optional(),
    price: z.number(),
    startDate: z.date(),
    endDate: z.date(),
    createdAt: z.date().optional(),
    updatedAt: z.date().nullable().optional(),
    deletedAt: z.date().nullable().optional(),
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
})

export const Z_GovernmentId = z.object({
  fileKey: z.string(),
  type: z.string(),
  createdAt: z.string(),
  _id: z.string(),
})

export const Z_Address = z.object({
  _id: z.string(),
  country: z.string(),
  city: z.string(),
  stateProvince: z.string(),
  streetAddress: z.string().nullable().optional(),
  aptSuite: z.string().nullable().optional(),
  zipCode: z.number(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
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

export const Z_Photo = z.object({
  _id: z.string().optional(),
  bookableUnitId: z.string().nullable().optional(),
  propertyId: z.string().nullable().optional(),
  rentalId: z.string().nullable().optional(),
  activityId: z.string().nullable().optional(),
  key: z.string(),
  thumbKey: z.string(),
  isMain: z.boolean(),
  description: z.string(),
  tags: z.string(),
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

export const Z_PricePerDate = z.object({
  _id: z.string().optional(),
  fromDate: z.string(),
  toDate: z.string(),
  price: z.string().nullable().optional(),
})

export const Z_User = z.object({
  _id: z.string(),
  email: z.string().optional(),
  role: z.string(),
  isHost: z.boolean(),
  guest: z.object({
    _id: z.string(),
    firstName: z.string(),
    middleName: z.string().nullable().optional(),
    lastName: z.string(),
    language: z.string(),
    currency: z.string(),
    phone: z.string().optional(),
    cellPhone: z.string().optional(),
    country: z.string(),
    birthDate: z.string().optional(),
    confirm: z.string().optional(),
    governmentId: z.array(Z_GovernmentId).nullable().optional(),
    address: Z_Address,
    createdAt: z.string().optional(),
    updatedAt: z.string().nullable().optional(),
    deletedAt: z.string().nullable().optional(),
  }),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_Location = z.object({
  _id: z.string().optional(),
  city: z.string(),
  streetAddress: z.string(),
  barangay: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  howToGetThere: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
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

export const Z_Policy = z.object({
  _id: z.string().optional(),
  index: z.number(),
  category: z.string(),
  reason: z.string().nullable().optional(),
  policy: z.string(),
  isSelected: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_RentalDetails = z.object({
  _id: z.string().optional(),
  engineCapacityLiter: z.number().nullable(),
  engineCapacityCc: z.number().nullable(),
  condition: z.string(),
  exteriorColor: z.string(),
  interiorColor: z.string().nullable().optional(),
  seatingCapacity: z.number().nullable(),
  isRegistered: z.string(),
  weightCapacityKg: z.number().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_RentalPrice = z.object({
  _id: z.string().optional(),
  dayRate: z.number(),
  requiredDeposit: z.number(),
  adminBookingCharge: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

export const Z_RentalAddOns = z.object({
  _id: z.string().optional(),
  roofRack: z.boolean(),
  boardRack: z.boolean(),
  babySeat: z.boolean(),
  dashCam: z.boolean(),
  includesHelmet: z.boolean(),
  others: z.array(z.string()).nullable().optional(),
})

export const Z_ActivitySegment = z.object({
  _id: z.string().optional(),
  index: z.number(),
  activities: z.array(z.string()),
  durationHour: z.number(),
  durationMinute: z.number(),
  location: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  optional: z.boolean(),
  hasAdditionalFee: z.boolean(),
  transfer: z.string().nullable().optional(),
})

export const Z_Review = z.object({
  _id: z.string().optional(),
  reviewerId: Z_User,
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

export const Z_ActivitySlot = z.object({
  _id: z.string().optional(),
  startTime: z.string(),
  endTime: z.string(),
  note: z.string(),
  slotIdsId: z.array(
    z
      .object({
        _id: z.string().optional(),
        name: z.string(),
      })
      .nullable()
      .optional()
  ),
})
export const Z_ActivityDay = z.object({
  _id: z.string().optional(),
  slots: z.array(Z_ActivitySlot).nullable().optional(),
})

export const Z_ActivitySchedule = z.object({
  _id: z.string().optional(),
  monday: Z_ActivityDay.nullable().optional(),
  tuesday: Z_ActivityDay.nullable().optional(),
  wednesday: Z_ActivityDay.nullable().optional(),
  thursday: Z_ActivityDay.nullable().optional(),
  friday: Z_ActivityDay.nullable().optional(),
  saturday: Z_ActivityDay.nullable().optional(),
  sunday: Z_ActivityDay.nullable().optional(),
})

export const Z_CartItem = z.object({
  _id: z.string(),
  userId: Z_User,
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
            discountedWeekLyRate: z.number(),
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
        pricePerDates: z.array(Z_PricePerDate).nullable().optional(),
        reviews: Z_Review.nullable().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().nullable(),
        deletedAt: z.string().nullable(),
      }),
      propertyId: z.object({
        _id: z.string().optional(),
        offerBy: Z_User,
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
        policies: z.array(Z_Policy).nullable().optional(),
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
        details: Z_RentalDetails,
        pricing: Z_RentalPrice.nullable().optional(),
        host: Z_User.nullable().optional(),
        category: z.enum(["Car", "Motorbike", "Bicycle", ""]),
        make: z.string().nullable().optional(),
        modelBadge: z.string().nullable().optional(),
        bodyType: z.string().nullable().optional(),
        fuel: z.string().nullable().optional(),
        transmission: z.string().nullable().optional(),
        year: z.string().nullable().optional(),
        qty: z.number(),
        addOns: Z_RentalAddOns,
        photos: z.array(Z_Photo).nullable().optional(),
        location: Z_Location.nullable().optional(),
        status: z.enum(["Pending", "Incomplete", "Live"]),
        finishedSections: z.array(z.string()).nullable().optional(),
        daysCanCancel: z.number().nullable().optional(),
        pricePerDates: z.array(Z_PricePerDate).nullable().optional(),
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
        host: Z_User.optional(),
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
        segments: z.array(Z_ActivitySegment).nullable().optional(),
        meetingPoint: Z_Location,
        photos: z.array(Z_Photo).nullable().optional(),
        slotCapacity: z.object({
          _id: z.string().optional(),
          minimum: z.number(),
          maximum: z.number(),
        }),
        schedule: Z_ActivitySchedule.optional(),
        pricePerPerson: z.number().nullable().optional(),
        pricePerSlot: z.number().nullable().optional(),
        daysCanCancel: z.number(),
        status: z.enum(["Pending", "Incomplete", "Live"]),
        finishedSections: z.array(z.string()),
        pricePerDates: z.array(Z_PricePerDate).nullable().optional(),
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
  price: z.number(),
  endDate: z.string(),
  startDate: z.string(),
  status: z.enum(["Active", "Completed", "Removed"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional(),
  deletedAt: z.string().nullable().optional(),
})

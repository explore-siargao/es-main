import mongoose, { Schema } from "mongoose"
const statusEnum = ["Pending", "Incomplete", "Live"]
const propertyTypeEnum = [
  "HOSTEL",
  "HOMESTAY",
  "HOTEL",
  "APARTMENT",
  "RESORT",
  "WHOLE_PLACE",
]

const wholePlaceType = ["VILLA", "HOUSE", "BUNGALOW", "COTTAGE"]

const facilities = new Schema({
  index: Number,
  category: String,
  facility: String,
  isSelected: Boolean,
})

const policies = new Schema({
  index: Number,
  category: String,
  reason: String,
  policy: String,
  isSelected: Boolean,
})

const properties = new Schema({
  offerBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  status: {
    type: String,
    enum: statusEnum,
    default: "Incomplete",
  },
  finishedSections: {
    type: [String],
    default: [],
  },
  title: String,
  description: String,
  currency: String,
  primaryLanguage: String,
  photos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Photos",
      required: false,
      default: null,
    },
  ],
  phone: String,
  email: String,
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "Locations",
  },
  checkInTime: Date,
  checkOutTime: Date,
  isLateCheckOutAllowed: {
    type: Boolean,
    default: false,
  },
  lateCheckOutType: String,
  lateCheckOutValue: Number,
  termsAndConditions: String,
  taxId: Number,
  taxId2: Number,
  companyLegalName: String,
  type: {
    type: String,
    enum: propertyTypeEnum,
    required: false,
    default: null,
  },
  wholeplaceType: {
    type: String,
    enum: wholePlaceType,
    default: null,
  },
  facilities: {
    type: [facilities],
    default: [],
  },
  policies: {
    type: [policies],
    default: [],
  },
  bookableUnits: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "BookableUnitTypes",
    },
  ],
  reservations: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Reservations",
    },
  ],
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "Reviews",
    required: false,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Properties", properties)

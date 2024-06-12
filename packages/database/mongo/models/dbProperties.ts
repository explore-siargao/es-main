import mongoose, { Schema } from "mongoose"
const statusEnum = ["Pending", "Incomplete", "Live"]
const propertyTypeEnum = [
  "Hostel",
  "Homestay",
  "Hotel",
  "Apartment",
  "Resort",
  "Villa",
]
const properties = new Schema({
  host: {
    type: mongoose.Schema.ObjectId,
    ret: "Users",
  },
  status: {
    type: String,
    enum: statusEnum,
    default: "Pending",
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
    ref: "Addresses",
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
  },
  facilities: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Facilities",
    },
  ],
  policies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Policies",
    },
  ],
  bookableUnits: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "BookableUnits",
    },
  ],
  reservations: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Reservations",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Properties", properties)

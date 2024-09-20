import mongoose, { Schema } from "mongoose"

const rentalCategoryEnum = ["Car", "Motorbike", "Bicycle", ""]
const bodyTypeEnum = ["Hatchback", "Sedan", "SUV", "Pickup", "Van", null]
const fuelEnum = ["Petrol", "Diesel", "Electric", null]
const transmissionEnum = ["Automatic", "Semi-Automatic", "Manual", null]
const statusEnum = ["Pending", "Incomplete", "Live"]

const pricePerDates = new Schema({
  fromDate:Date,
  toDate:Date,
  price:{
    type: mongoose.Schema.ObjectId,
    ref: "RentalRates",
  }
})

const rentals = new Schema({
  details: {
    type: mongoose.Schema.ObjectId,
    ref: "RentalDetails",
  },
  pricing: {
    type: mongoose.Schema.ObjectId,
    ref: "RentalRates",
  },
  host: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  category: {
    type: String,
    enum: rentalCategoryEnum,
    required: false,
    default: "",
  },
  make: String,
  modelBadge: {
    type: String,
    required: false,
  },
  bodyType: {
    type: String,
    enum: bodyTypeEnum,
    required: false,
    default: null,
  },
  fuel: {
    type: String,
    enum: fuelEnum,
    required: false,
    default: null,
  },
  transmission: {
    type: String,
    enum: transmissionEnum,
    required: false,
    default: null,
  },
  year: {
    type: String,
    required: false,
  },
  qty: Number,
  addOns: {
    type: mongoose.Schema.ObjectId,
    ref: "RentalAddOns",
  },
  photos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Photos",
      required: false,
      default: null,
    },
  ],
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "Locations",
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
  ids: [
    {
      _id: {
        type: mongoose.Schema.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  pricePerDates:{
    type:[pricePerDates],
    default:[]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Rentals", rentals)

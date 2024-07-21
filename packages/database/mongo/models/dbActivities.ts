import mongoose, { Schema } from "mongoose"

const statusEnum = ["Pending", "Incomplete", "Live"]

const segments = new Schema({
  index: Number,
  activities: {
    type: [String],
    default: [],
  },
  durationHour: Number,
  durationMinute: Number,
  location: String,
  longitude: Number,
  latitude: Number,
  optional: {
    type: Boolean,
    default: false,
    required: true,
  },
  hasAdditionalFee: {
    type: Boolean,
    default: false,
    required: true,
  },
  transfer: {
    type: String,
    default: null,
  },
})

const price = new Schema({
  basePrice: Number,
  exceedPersonPrice: Number,
})

const slots = new Schema({
  time: String,
  minimumGuestCount: Number,
})

const activities = new Schema({
  host: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  title: String,
  description: String,
  highLights: {
    type: [String],
    default: [],
  },
  durationHour: Number,
  durationMinute: Number,
  languages: {
    type: [String],
    default: [],
  },
  isFoodIncluded: {
    type: Boolean,
    default: false,
  },
  includedFoods: {
    type: [String],
    default: [],
  },
  isNonAlcoholicDrinkIncluded: {
    type: Boolean,
    default: false,
  },
  isAlcoholicDrinkIncluded: {
    type: Boolean,
    default: false,
  },
  includedAlcoholicDrinks: {
    type: [String],
    default: [],
  },
  otherInclusion: {
    type: [String],
    default: [],
  },
  notIncluded: {
    type: [String],
    default: [],
  },
  whatToBring: {
    type: [String],
    default: [],
  },
  notAllowed: {
    type: [String],
    default: [],
  },
  policies: {
    type: [String],
    default: [],
  },
  cancellationDays: String,
  isSegmentBuilderEnabled: {
    type: Boolean,
    default: false,
  },
  segments: {
    type: [segments],
    default: [],
  },
  meetingPoint: {
    type: mongoose.Schema.ObjectId,
    ref: "Locations",
  },
  photos: {
    type: [mongoose.Schema.ObjectId],
    ref: "Photos",
    default: [],
  },
  price: {
    type: price,
  },
  slots: {
    type: [slots],
    default: [],
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Activities", activities)

import mongoose, { Schema } from "mongoose"

const statusEnum = ["Pending", "Incomplete", "Live"]

const slotCapacity = new Schema({
  minimum: Number,
  maximum: Number,
})
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

const timeSlots = new Schema({
  startTime: String,
  endTime: String,
})

const schedule = new Schema({
  monday: {
    type: [timeSlots],
    default: [],
  },
  tuesday: {
    type: [timeSlots],
    default: [],
  },
  wednesday: {
    type: [timeSlots],
    default: [],
  },
  thursday: {
    type: [timeSlots],
    default: [],
  },
  friday: {
    type: [timeSlots],
    default: [],
  },
  saturday: {
    type: [timeSlots],
    default: [],
  },
  sunday: {
    type: [timeSlots],
    default: [],
  },
})

const pricePerDates = new Schema({
  fromDate: Date,
  toDate: Date,
  price: Number,
})

const activities = new Schema({
  host: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  title: String,
  activityType: {
    type: [String],
    default: "",
  },
  experienceType: {
    type: String,
    enum: ["private", "shared"],
    default: "private",
  },
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
  slotslotCapacity: {
    type: slotCapacity,
    required: true,
  },
  schedule: {
    type: schedule,
    default: null,
  },
  pricePerPerson: {
    type: Number,
    default: 0,
  },
  pricePerSlot: {
    type: Number,
    default: 0,
  },
  pricePerDates: {
    type: [pricePerDates],
    default: [],
  },

  daysCanCancel: {
    type: Number,
    required: true,
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

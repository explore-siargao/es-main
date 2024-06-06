import mongoose, { Schema } from "mongoose"
const statusEnum = ["Pending", "Incomplete", "Live"]
const activities = new Schema({
  host: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  meetingPointDescription: String,
  title: String,
  description: String,
  highLights: {
    type: [String],
    default: [],
  },
  durationHour: Number,
  durationMinute: Number,
  language: {
    type: [String],
    default: [],
  },
  isFoodIncluded: {
    type: Boolean,
    default: false,
  },
  selectedFoodOptions: {
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
  selectedAlcoholicDrinkOptions: {
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
  cancellationDays: {
    type: Number,
    required: false,
  },
  address: {
    type: mongoose.Schema.ObjectId,
    ref: "Addresses",
  },
  isBuilderEnabled: {
    type: Boolean,
    default: false,
  },
  itineraries: {
    type: [mongoose.Schema.ObjectId],
    ref: "ActivityItineraries",
  },
  activityPhotos: {
    type: [mongoose.Schema.ObjectId],
    ref: "Photos",
    required: false,
    default: null,
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Activities", activities)

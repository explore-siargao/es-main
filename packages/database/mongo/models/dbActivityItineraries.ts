import mongoose, { Schema } from "mongoose"
const itineraryType = ["Activity", "Transfer", ""]
const acivityItineraries = new Schema({
  destinationNumber: Number,
  type: {
    type: String,
    enum: itineraryType,
    default: "",
  },
  activities: {
    type: [String],
    default: [],
  },
  activityPlace: String,
  durationHour: Number,
  durationMinute: Number,
  isOptional: {
    type: Boolean,
    default: false,
  },
  isRequiredAdditionalFee: {
    type: Boolean,
    default: false,
  },
  additionalFee: {
    type: Number,
    default: 0,
  },
  vehicleType: {
    type: String,
    default: null,
  },
})

export default mongoose.model("ActivityItineraries", acivityItineraries)

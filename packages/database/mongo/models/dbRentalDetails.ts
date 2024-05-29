import mongoose, { Schema } from "mongoose"

const conditionEnum = ["Excellent", "Good", "Average", "Poor", ""]

const rentalDetails = new Schema({
  engineCapacityLiter: {
    type: Number,
    required: false,
  },
  engineCapacityCc: {
    type: Number,
    required: false,
  },
  condition: {
    type: String,
    enum: conditionEnum,
    required: false,
    default: "",
  },
  odometerKm: {
    type: Number,
    required: false,
  },
  exteriorColor: {
    type: String,
    required: false,
  },
  interiorColor: {
    type: String,
    required: false,
  },
  seatingCapacity: {
    type: Number,
    required: false,
  },
  weightCapacityKg: Number,
  minAgeReq: Number,
  isRegistered: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("RentalDetails", rentalDetails)

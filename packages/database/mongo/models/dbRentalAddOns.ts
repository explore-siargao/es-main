import mongoose, { Schema } from "mongoose"

const rentalAddOns = new Schema({
  roofRack: {
    type: Boolean,
    required: false,
    default: false,
  },
  boardRack: {
    type: Boolean,
    required: false,
    default: false,
  },
  babySeat: {
    type: Boolean,
    required: false,
    default: false,
  },
  dashCam: {
    type: Boolean,
    required: false,
    default: false,
  },
  includesHelmet: {
    type: Boolean,
    required: false,
    default: false,
  },
  others: {
    type: [String],
    default: [],
  },
})

export default mongoose.model("RentalAddOns", rentalAddOns)

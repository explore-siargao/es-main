import mongoose from "mongoose"
const { Schema } = mongoose

const addresses = new Schema({
  country: String,
  city: String,
  stateProvince: String,
  streetAddress: String,
  barangay: String,
  aptSuite: String,
  zipCode: Number,
  longitude: Number,
  latitude: Number,
  howToGetThere: {
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

export default mongoose.model("Addresses", addresses)

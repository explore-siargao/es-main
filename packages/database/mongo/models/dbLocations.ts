import mongoose from "mongoose"
const { Schema } = mongoose

const locations = new Schema({
  city: String,
  street: String,
  barangay: String,
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

export default mongoose.model("Locations", locations)

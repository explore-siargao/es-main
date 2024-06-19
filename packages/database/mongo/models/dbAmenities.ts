import mongoose, { Schema } from "mongoose"

const amenities = new Schema({
  index: Number,
  category: String,
  amenity: String,
  isSelected: Boolean,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Amenities", amenities)

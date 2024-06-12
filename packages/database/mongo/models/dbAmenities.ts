import mongoose, { Schema } from "mongoose"

const amenities = new Schema({
  category: String,
  amenity: String,
  bookableUnitTypeId: {
    type: mongoose.Schema.ObjectId,
    ref: "BookableUnitTypes",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Amenities", amenities)

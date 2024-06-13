import mongoose, { Schema } from "mongoose"

const photos = new Schema({
  bookableUnitId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  propertyId: {
    type: mongoose.Schema.ObjectId,
    ref: "Properties",
  },
  rentalId: {
    type: mongoose.Schema.ObjectId,
    ref: "Rentals",
  },
  activityId: {
    type: mongoose.Schema.ObjectId,
    ref: "Activities",
  },
  key: String,
  thumbKey: String,
  isMain: {
    type: Boolean,
    default: false,
  },
  description: String,
  tags: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Photos", photos)

import mongoose, { Schema } from "mongoose"

const facilities = new Schema({
  category: String,
  facility: String,
  isSelected: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Facilities", facilities)

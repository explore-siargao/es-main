import mongoose, { Schema } from "mongoose"

const policies = new Schema({
  index: Number,
  category: String,
  reason: String,
  policy: String,
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

export default mongoose.model("Policies", policies)

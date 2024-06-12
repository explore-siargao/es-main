import mongoose, { Schema } from "mongoose"

const policies = new Schema({
  category: String,
  policy: String,
  reason: String,
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

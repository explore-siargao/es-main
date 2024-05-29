import mongoose from "mongoose"
const { Schema } = mongoose

const coupons = new Schema({
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  usedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: false,
    default: null,
  },
  code: String,
  expirationDate: Date,
  reward: String,
  isUsed: {
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

export default mongoose.model("Coupons", coupons)

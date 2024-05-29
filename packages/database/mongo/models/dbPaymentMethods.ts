import mongoose from "mongoose"
const { Schema } = mongoose

const paymentMethods = new Schema({
  cardInfo: String,
  cardType: String,
  lastFour: String,
  isDefault: Boolean,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("PaymentMethods", paymentMethods)

import mongoose, { Schema } from "mongoose"

const rentalRates = new Schema({
  dayRate: Number,
  requiredDeposit: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("RentalRates", rentalRates)

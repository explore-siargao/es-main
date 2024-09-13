import mongoose, { Schema } from "mongoose"

const unitPrices = new Schema({
  baseRate: Number,
  baseRateMaxCapacity: Number,
  maximumCapacity: Number,
  pricePerAdditionalPerson: Number,
  discountedWeekLyRate: Number,
  discountedMonthlyRate: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("UnitPrices", unitPrices)

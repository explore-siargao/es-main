import mongoose from "mongoose"
const { Schema } = mongoose

const taxes = new Schema({
  countryRegion: String,
  vatId: String,
  nameOnRegistration: String,
  addressLine1: String,
  addressLine2: {
    type: String,
    required: false,
  },
  city: String,
  provinceRegion: String,
  zipPostalCode: String,
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

export default mongoose.model("Taxes", taxes)

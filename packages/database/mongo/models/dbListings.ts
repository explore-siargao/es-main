import mongoose from "mongoose"
const { Schema } = mongoose

const listings = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Listings", listings)

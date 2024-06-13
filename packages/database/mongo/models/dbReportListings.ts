import mongoose from "mongoose"
const { Schema } = mongoose

const reportListings = new Schema({
  reports: [String],
  reportedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  listing: {
    type: mongoose.Schema.ObjectId,
    ref: "Listings",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("ReportListings", reportListings)

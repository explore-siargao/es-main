import mongoose from "mongoose"
const { Schema } = mongoose

const carts = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  bookableUnitId: {
    type: mongoose.Schema.ObjectId,
    ref: "BookableUnitTypes",
    required: false,
    default: null,
  },
  rentalId: {
    type: mongoose.Schema.ObjectId,
    ref: "Rentals",
    required: false,
    default: null,
  },
  activityId: {
    type: mongoose.Schema.ObjectId,
    ref: "Activities",
    required: false,
    default: null,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Completed", "Removed"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Carts", carts)
import mongoose, { Schema } from "mongoose"

const bookableUnits = new Schema({
  bookableUnitTypes: {
    type: mongoose.Schema.ObjectId,
    ref: "BookableUnitTypes",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("BookableUnits", bookableUnits)

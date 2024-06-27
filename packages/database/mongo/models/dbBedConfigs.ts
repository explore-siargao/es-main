import mongoose, { Schema } from "mongoose"

const bedConfigs = new Schema({
  bedName: String,
  bedType: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("BedConfigs", bedConfigs)

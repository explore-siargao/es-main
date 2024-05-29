import mongoose, { Schema } from "mongoose"

const photos = new Schema({
  key: String,
  thumbKey: String,
  description: {
    type: String,
    required: false,
  },
  tag: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Photos", photos)

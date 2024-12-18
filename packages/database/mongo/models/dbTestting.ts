import mongoose from "mongoose"
const { Schema } = mongoose

const testing = new Schema({
  firstName: String,
  lastName: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Testing", testing)

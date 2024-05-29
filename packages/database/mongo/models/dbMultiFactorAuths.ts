import mongoose from "mongoose"
const { Schema } = mongoose

const multiFactorAuths = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  type: String,
  code: String,
  used: Boolean,
  expiredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
})

export default mongoose.model("MultiFactorAuths", multiFactorAuths)

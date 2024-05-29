import mongoose from "mongoose"
const { Schema } = mongoose

const forgotPasswords = new Schema({
  email: String,
  code: String,
  used: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
    expiredAt: Date,
  },
})

export default mongoose.model("ForgotPasswords", forgotPasswords)

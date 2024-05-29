import mongoose from "mongoose"
const { Schema } = mongoose

const roles = ["Admin", "User"]
const registrationTypeEnum = ["Manual", "Facebook", "Google"]
const users = new Schema({
  email: String,
  password: String,
  changePasswordAt: Date,
  role: {
    type: String,
    enum: roles,
    required: true,
  },
  isHost: {
    type: Boolean,
    default: false,
  },
  registrationType: {
    type: String,
    enum: registrationTypeEnum,
    required: true,
  },
  deactivated: Boolean,
  profilePicture: String,
  canReceiveEmail: Boolean,
  guest: {
    type: mongoose.Schema.ObjectId,
    ref: "Guests",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Users", users)

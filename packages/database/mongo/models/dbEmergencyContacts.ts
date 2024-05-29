import mongoose from "mongoose"
const { Schema } = mongoose

const emergencyContacts = new Schema({
  name: String,
  relationship: String,
  email: String,
  phoneNumber: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("emergencyContacts", emergencyContacts)

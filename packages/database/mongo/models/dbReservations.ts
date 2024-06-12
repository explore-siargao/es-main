import mongoose, { Schema } from "mongoose"
const statusEnum = [
  "Confirmed",
  "Not-Confirmed",
  "Cancelled",
  "Checked-In",
  "Checked-Out",
  "No-Show",
]
const reservations = new Schema({
  mainGuest: {
    type: mongoose.Schema.ObjectId,
    ref: "Guests",
  },
  status: {
    type: String,
    enum: statusEnum,
    default: "Not-Confirmed"
  },
  startDate: Date,
  endDate: Date
})

export default mongoose.model("Reservations", reservations)

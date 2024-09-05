import mongoose, { Schema } from "mongoose"
const statusEnum = [
  "Confirmed",
  "Not-Confirmed",
  "Cancelled",
  "Checked-In",
  "Checked-Out",
  "No-Show",
  "Blocked-Dates",
  "Out-of-Service",
]
const reservations = new Schema({
  unitId: {
    type: mongoose.Schema.ObjectId,
    ref: "BookableUnitTypes",
  },
  rentalId: {
    type: mongoose.Schema.ObjectId,
    ref: "Rentals",
  },
  activityId: {
    type: mongoose.Schema.ObjectId,
    ref: "Activities",
  },
  startDate: Date,
  endDate: Date,
  guest: {
    type: mongoose.Schema.ObjectId,
    ref: "Guests",
    required: false,
    default: null,
  },
  guestName: {
    type: String,
    required: false,
    default: "",
  },
  paymentType: String,
  cardType: String,
  cardInfo: String,
  paymentMethod: {
    type: mongoose.Schema.ObjectId,
    ref: "PaymentMethods",
    required: false,
    default: null,
  },
  xendItPaymentMethodId: {
    type: String,
    required: false,
    default: false,
  },
  xendItPaymentRequestId: {
    type: String,
    required: false,
    default: null,
  },
  xendItPaymentReferenceId: {
    type: String,
    required: false,
    default: null,
  },
  guestCount: {
    type: Number,
    required: false,
    default: 0,
  },
  status: {
    type: String,
    enum: statusEnum,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

reservations.pre("validate", function (next) {
  if (!this.unitId && !this.rentalId && !this.activityId) {
    this.invalidate(
      "unitId",
      "At least one of unitId, rentalId, or activityId is required."
    )
    this.invalidate(
      "rentalId",
      "At least one of unitId, rentalId, or activityId is required."
    )
    this.invalidate(
      "activityId",
      "At least one of unitId, rentalId, or activityId is required."
    )
  }
  next()
})

export default mongoose.model("Reservations", reservations)

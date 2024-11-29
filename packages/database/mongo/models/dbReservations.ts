import mongoose, { Schema } from "mongoose"
const statusEnum = [
  "Confirmed",
  "Not-Confirmed",
  "Cancelled",
  "Checked-In",
  "Checked-Out",
  "No-Show",
  "Blocked-Dates",
  "Out-of-Service-Dates",
  "For-Payment",
]
const reservations = new Schema({
  propertyIds: {
    type: {
      unitId: {
        type: mongoose.Schema.ObjectId,
        ref: "BookableUnitTypes",
      },
      propertyId: mongoose.Schema.ObjectId,
    },
  },
  rentalIds: {
    type: {
      rentalId: {
        type: mongoose.Schema.ObjectId,
        ref: "Rentals",
      },
      qtyIdsId: mongoose.Schema.ObjectId,
    },
  },
  activityIds: {
    type: {
      activityId: mongoose.Schema.ObjectId,
      dayId: mongoose.Schema.ObjectId,
      timeSlotId: mongoose.Schema.ObjectId,
      slotIdsId: {
        type: mongoose.Schema.ObjectId,
        required: false,
      },
    },
  },
  startDate: Date,
  endDate: Date,
  guestName: {
    type: String,
    required: false,
    default: "",
  },
  guest: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: false,
    default: null,
  },
  notes: String,
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
  hostHavePenalty: {
    type: Boolean,
    default: false,
  },
  cancelledBy: {
    type: String,
    enum: ["Host", "Guest"],
    default: null,
  },
  cancellationDate: {
    type: Date,
    required: false,
    default: null,
  },
  cartId:{
    type: mongoose.Schema.ObjectId,
    ref: "Carts",
    required: false,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

reservations.pre("validate", function (next) {
  if (!this.propertyIds && !this.rentalIds && !this.activityIds) {
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

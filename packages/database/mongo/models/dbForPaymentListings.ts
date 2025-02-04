import mongoose from "mongoose"
const { Schema } = mongoose

const contact = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
})

const forPaymentListings = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  propertyIds: {
    type: {
      unitId: {
        type: mongoose.Schema.ObjectId,
        ref: "BookableUnitTypes",
      },
      propertyId: mongoose.Schema.ObjectId,
    },
    required: false,
    default: null,
  },
  rentalIds: {
    type: {
      rentalId: {
        type: mongoose.Schema.ObjectId,
        ref: "Rentals",
      },
      qtyIdsId: mongoose.Schema.ObjectId,
    },
    required: false,
    default: null,
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
    required: false,
    default: null,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Completed", "Removed"],
  },
  contacts: {
    type: [contact],
    default: [],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  guestCount: {
    type: Number,
    required: true,
    default: 1,
  },
  guestComission: {
    type: Number,
    required: true,
  },
  hostComission: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("ForPaymentListings", forPaymentListings)

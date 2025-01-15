import mongoose from "mongoose"
const { Schema } = mongoose

const reviews = new Schema({
  reviewerId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  cleanlinessRates: {
    type: Number,
    required: true,
  },
  accuracyRates: {
    type: Number,
    required: true,
  },
  checkInRates: {
    type: Number,
    required: true,
  },
  communicationRates: {
    type: Number,
    required: true,
  },
  locationRates: {
    type: Number,
    required: false,
  },
  valueRates: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  totalRates: {
    type: Number,
    required: true,
  },
  property: {
    type: {
      propertyId: {
        type: Schema.Types.ObjectId,
        ref: "Properties",
      },
      bookableUnitId: {
        type: Schema.Types.ObjectId,
        ref: "BookableUnitTypes",
      },
    },
    required: false,
    default: null,
  },
  rental: {
    type: Schema.Types.ObjectId,
    ref: "Rentals",
    required: false,
    default: null,
  },
  activity: {
    type: Schema.Types.ObjectId,
    ref: "Activities",
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

reviews.virtual("reviewer", {
  ref: "Users",
  localField: "reviewerId",
  foreignField: "_id",
  justOne: true,
})

// Enable virtuals in JSON output
reviews.set("toJSON", { virtuals: true })
reviews.set("toObject", { virtuals: true })

export default mongoose.model("Reviews", reviews)

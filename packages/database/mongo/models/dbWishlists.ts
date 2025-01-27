import mongoose from "mongoose"
const { Schema } = mongoose

const category = ["Properties", "Activities", "Rentals"]

const wishList = new Schema({
  category: {
    type: String,
    required: true,
    enum: category,
  },
  listingId: {
    type: mongoose.Schema.ObjectId,
    refPath: "category",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

wishList.virtual("listing", {
  refPath: "category",
  localField: "listingId",
  foreignField: "_id",
  justOne: true,
})

// Enable virtuals in JSON output
wishList.set("toJSON", { virtuals: true })
wishList.set("toObject", { virtuals: true })

export default mongoose.model("WishList", wishList)

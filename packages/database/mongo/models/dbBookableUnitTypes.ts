import mongoose, { Schema } from "mongoose"

const bedRooms = new Schema({
  bedRoomName: String,
  bedRoomType: String,
})

const bookableUnitTypes = new Schema({
  category: String,
  title: String,
  totalSize: Number,
  isHaveSharedBathRoom: {
    type: String,
    required: false,
  },
  isSmokingAllowed: {
    type: String,
    required: false,
  },
  bed: String,
  unitPrice: {
    type: mongoose.Schema.ObjectId,
    ref: "UnitPrices",
  },
  amenities: {
    type: [mongoose.Schema.ObjectId],
    ref: "Amenities",
  },
  photos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Photos",
    },
  ],
  isPrivate: {
    type: Boolean,
    default: false,
  },
  maxGuests: Number,
  adultsIncluded: Number,
  childrenIncluded: Number,
  bedRooms: {
    type: [bedRooms],
    required: false,
  },
  isMultiRoomUnit: {
    type: Boolean,
    default: false,
  },
  numBedRooms: {
    type: String,
    required: false,
  },
  numBathRooms: {
    type: String,
    required: false,
  },
  bedConfigs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "BedConfigs",
    },
  ],
  qty: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("BookableUnitTypes", bookableUnitTypes)

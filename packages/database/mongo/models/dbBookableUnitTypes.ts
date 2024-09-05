import mongoose, { Schema } from "mongoose"

const bed = new Schema({
  name: String,
  qty: Number,
})

const bedRooms = new Schema({
  roomName: String,
  beds: [bed],
})

const livingRooms = new Schema({
  roomName: String,
  beds: [bed],
})

const bookableUnitTypes = new Schema({
  category: String,
  title: String,
  subtitle: String,
  description: String,
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
  livingRooms: {
    type: [livingRooms],
    required: false,
  },
  bedroomStudio: {
    type: [bedRooms],
    required: false,
  },
  singleLivingRoom: {
    type: bed,
    required: false,
  },
  singleBedRoom: {
    type: bed,
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
  ids: {
    type: [mongoose.Schema.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("BookableUnitTypes", bookableUnitTypes)

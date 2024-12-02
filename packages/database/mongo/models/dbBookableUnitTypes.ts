import mongoose, { Schema } from "mongoose"

const amenities = new Schema({
    index: Number,
    category: String,
    amenity: String,
    isSelected: Boolean,
})

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

const pricePerDates = new Schema({
  fromDate: Date,
  toDate: Date,
  price: {
    type: mongoose.Schema.ObjectId,
    ref: "UnitPrices",
  },
})

const bookableUnitTypes = new Schema({
  category: String,
  title: String,
  subtitle: String,
  unitNote: {
    type: String,
    default: "",
  },
  description: String,
  totalSize: Number,
  isHaveSharedBathRoom: {
    type: String,
    required: false,
  },
  isHaveSharedAmenities: {
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
  pricePerDates: {
    type: [pricePerDates],
    default: [],
  },
  amenities: {
    type: [amenities],
    default:[]
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
  qtyIds: {
    type: [
      {
        _id: {
          type: mongoose.Schema.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  daysCanCancel: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "Reviews",
    required: false,
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

import mongoose, { Schema } from "mongoose"

const statusEnum = ["Pending", "Incomplete", "Live"]

const slotCapacity = new Schema({
  minimum: Number,
  maximum: Number,
})
const segments = new Schema({
  index: Number,
  activities: {
    type: [String],
    default: [],
  },
  durationHour: Number,
  durationMinute: Number,
  location: String,
  longitude: Number,
  latitude: Number,
  optional: {
    type: Boolean,
    default: false,
    required: true,
  },
  hasAdditionalFee: {
    type: Boolean,
    default: false,
    required: true,
  },
  transfer: {
    type: String,
    default: null,
  },
})

const timeSlots = new Schema({
  startTime: String,
  endTime: String,
  ids: {
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
    required: false,
  },
})

const schedule = new Schema({
  monday: {
    type: {
      _id: {
        type: mongoose.Schema.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      slots: [timeSlots],
    },
    default: {
      slots: [],
    },
  },
  tuesday: {
    type: {
      _id: {
        type: mongoose.Schema.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      slots: [timeSlots],
    },
    default: {
      slots: [],
    },
  },
  wednesday: {
    type: {
      _id: {
        type: mongoose.Schema.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      slots: [timeSlots],
    },
    default: {
      slots: [],
    },
  },
  thursday: {
    type: {
      _id: {
        type: mongoose.Schema.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      slots: [timeSlots],
    },
    default: {
      slots: [],
    },
  },
  friday: {
    type: {
      _id: {
        type: mongoose.Schema.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      slots: [timeSlots],
    },
    default: {
      slots: [],
    },
  },
  saturday: {
    type: {
      _id: {
        type: mongoose.Schema.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      slots: [timeSlots],
    },
    default: {
      slots: [],
    },
  },
  sunday: {
    type: {
      _id: {
        type: mongoose.Schema.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      slots: [timeSlots],
    },
    default: {
      slots: [],
    },
  },
})

const pricePerDates = new Schema({
  fromDate: Date,
  toDate: Date,
  price: Number,
})

const activities = new Schema({
  host: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  title: String,
  activityType: {
    type: [String],
    default: "",
  },
  experienceType: {
    type: String,
    enum: ["private", "joiner"],
    default: "private",
  },
  description: String,
  highLights: {
    type: [String],
    default: [],
  },
  durationHour: Number,
  durationMinute: Number,
  languages: {
    type: [String],
    default: [],
  },
  isFoodIncluded: {
    type: Boolean,
    default: false,
  },
  includedFoods: {
    type: [String],
    default: [],
  },
  isNonAlcoholicDrinkIncluded: {
    type: Boolean,
    default: false,
  },
  isAlcoholicDrinkIncluded: {
    type: Boolean,
    default: false,
  },
  includedAlcoholicDrinks: {
    type: [String],
    default: [],
  },
  otherInclusion: {
    type: [String],
    default: [],
  },
  notIncluded: {
    type: [String],
    default: [],
  },
  whatToBring: {
    type: [String],
    default: [],
  },
  notAllowed: {
    type: [String],
    default: [],
  },
  policies: {
    type: [String],
    default: [],
  },

  isSegmentBuilderEnabled: {
    type: Boolean,
    default: false,
  },
  segments: {
    type: [segments],
    default: [],
  },
  meetingPoint: {
    type: mongoose.Schema.ObjectId,
    ref: "Locations",
  },
  photos: {
    type: [mongoose.Schema.ObjectId],
    ref: "Photos",
    default: [],
  },
  slotCapacity: {
    type: slotCapacity,
    required: true,
  },
  schedule: {
    type: schedule,
    default: {
      monday: {
        slots: [],
      },
      tuesday: {
        slots: [],
      },
      wednesday: {
        slots: [],
      },
      thursday: {
        slots: [],
      },
      friday: {
        slots: [],
      },
      saturday: {
        slots: [],
      },
      sunday: {
        slots: [],
      },
    },
  },
  pricePerPerson: {
    type: Number,
    default: 0,
  },
  pricePerSlot: {
    type: Number,
    default: 0,
  },
  pricePerDates: {
    type: [pricePerDates],
    default: [],
  },

  daysCanCancel: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: statusEnum,
    default: "Incomplete",
  },
  finishedSections: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  deletedAt: Date,
})

export default mongoose.model("Activities", activities)

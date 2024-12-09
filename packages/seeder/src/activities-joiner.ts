import { T_Activity } from "@repo/contract-2/activity"
import { T_Location } from "@repo/contract-2/address-location"
import { dbActivities, dbLocations, dbPhotos, dbUsers } from "@repo/database"
import { getRandomPhotoKeys } from "./common/helpers/getRandomPhotoKeys"
import { ACTIVITY_PHOTO_KEYS } from "./common/constants/photo-keys"

const seedJoinerActivities = async () => {
  try {
    const activities: T_Activity[] = [
      {
        title: "Hidden Waterfalls Trekking in Siargao",
        activityType: ["Sightseeing", "Tour"],
        experienceType: "Joiner",
        description:
          "Explore the top attractions of New York with a local guide.",
        highLights: [
          "Statue of Liberty",
          "Central Park",
          "Empire State Building",
        ],
        durationHour: 3,
        durationMinute: 30,
        languages: ["English", "Tagalog"],
        isFoodIncluded: true,
        includedFoods: ["Lunch", "Snacks"],
        isNonAlcoholicDrinkIncluded: true,
        isAlcoholicDrinkIncluded: false,
        includedAlcoholicDrinks: [],
        otherInclusion: ["Guide Book", "Free Wi-Fi"],
        notIncluded: ["Souvenirs"],
        whatToBring: ["Comfortable shoes", "Extra Water bottle"],
        notAllowed: ["Pets", "Smoking"],
        policies: ["No Pets allowed"],
        isSegmentBuilderEnabled: true,
        segments: [
          {
            index: 1,
            activities: ["Hiking", "Games"],
            durationHour: 2,
            durationMinute: 0,
            location: "Pilar",
            longitude: 125.97116237998723,
            latitude: 9.872128476236503,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
          {
            index: 1,
            activities: ["Break time"],
            durationHour: 0,
            durationMinute: 30,
            location: "Pilar",
            longitude: 125.17116237998723,
            latitude: 9.172128476236503,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
        ],
        meetingPoint: null,
        photos: [],
        slotCapacity: {
          minimum: 5,
          maximum: 20,
        },
        schedule: {
          monday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
        },
        pricePerPerson: 500,
        pricePerSlot: null,
        daysCanCancel: 5,
        status: "Live",
        finishedSections: [
          "basicInfo",
          "itinerary",
          "inclusions",
          "additionalInfo",
          "photos",
          "pricing",
        ],
        pricePerDates: [],
        activityNote: "Bring your camera for some amazing views!",
      },
      {
        title: "Sunrise Paddleboarding Adventure",
        activityType: ["Adventure", "Island Tour"],
        experienceType: "Joiner",
        description: "Discover the unique beauty of Siargao's natural wonders.",
        highLights: [
          "Sugba Lagoon",
          "Cloud 9 Surfing Spot",
          "Magpupungko Rock Pools",
        ],
        durationHour: 4,
        durationMinute: 0,
        languages: ["English", "Cebuano"],
        isFoodIncluded: true,
        includedFoods: ["Lunch", "Fresh Coconut Juice"],
        isNonAlcoholicDrinkIncluded: true,
        isAlcoholicDrinkIncluded: false,
        includedAlcoholicDrinks: [],
        otherInclusion: ["Snorkeling Gear", "Guide Book"],
        notIncluded: ["Surfboard"],
        whatToBring: ["Swimwear", "Sunscreen"],
        notAllowed: ["Smoking", "Pets"],
        policies: ["Respect the local environment"],
        isSegmentBuilderEnabled: true,
        segments: [
          {
            index: 1,
            activities: ["Boat Tour", "Swimming"],
            durationHour: 3,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.162272,
            latitude: 9.84893,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
          {
            index: 2,
            activities: ["Lunch Break"],
            durationHour: 1,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.101177,
            latitude: 9.852118,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
        ],
        meetingPoint: null,
        photos: [],
        slotCapacity: { minimum: 5, maximum: 20 },
        schedule: {
          monday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          tuesday: null,
          wednesday: null,
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
        pricePerPerson: 700,
        pricePerSlot: null,
        daysCanCancel: 10,
        status: "Live",
        finishedSections: [
          "basicInfo",
          "itinerary",
          "inclusions",
          "additionalInfo",
          "photos",
          "pricing",
        ],
        pricePerDates: [],
        activityNote: "Bring your camera to capture the amazing views!",
      },
      {
        title: "Siargao Eco-Friendly Beach Cleanup Experience",
        activityType: ["Nature", "Eco Tour"],
        experienceType: "Joiner",
        description:
          "Experience the lush greens and blue waters of Siargao Island.",
        highLights: ["Naked Island", "Daku Island", "Guyam Island"],
        durationHour: 5,
        durationMinute: 0,
        languages: ["English", "Tagalog"],
        isFoodIncluded: true,
        includedFoods: ["Lunch", "Snacks"],
        isNonAlcoholicDrinkIncluded: true,
        isAlcoholicDrinkIncluded: false,
        includedAlcoholicDrinks: [],
        otherInclusion: ["Guide Book", "Island Map"],
        notIncluded: ["Kayaking Gear"],
        whatToBring: ["Hat", "Water Bottle"],
        notAllowed: ["Glass Bottles", "Smoking"],
        policies: ["No littering"],
        isSegmentBuilderEnabled: true,
        segments: [
          {
            index: 1,
            activities: ["Island Hopping"],
            durationHour: 4,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.172273,
            latitude: 9.852128,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
          {
            index: 2,
            activities: ["Relaxation"],
            durationHour: 1,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.111178,
            latitude: 9.862119,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
        ],
        meetingPoint: null,
        photos: [],
        slotCapacity: { minimum: 6, maximum: 18 },
        schedule: {
          monday: null,
          tuesday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "1:30 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          wednesday: null,
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
        pricePerPerson: 650,
        pricePerSlot: null,
        daysCanCancel: 10,
        status: "Live",
        finishedSections: [
          "basicInfo",
          "itinerary",
          "inclusions",
          "additionalInfo",
          "photos",
          "pricing",
        ],
        pricePerDates: [],
        activityNote:
          "Pack light and bring extra clothes for water activities!",
      },
      {
        title: "Cultural Immersion: Siargao's Local Villages",
        activityType: ["Surfing", "Beach Experience"],
        experienceType: "Joiner",
        description:
          "Ride the waves at Siargao's famous surf spots with expert guidance.",
        highLights: ["Cloud 9 Surf Spot", "Secret Surf Beach", "Surf Village"],
        durationHour: 4,
        durationMinute: 0,
        languages: ["English", "Tagalog"],
        isFoodIncluded: true,
        includedFoods: ["Lunch", "Energy Snacks"],
        isNonAlcoholicDrinkIncluded: true,
        isAlcoholicDrinkIncluded: false,
        includedAlcoholicDrinks: [],
        otherInclusion: ["Surfboard", "Expert Instructor"],
        notIncluded: ["Wetsuit"],
        whatToBring: ["Sunscreen", "Swimwear"],
        notAllowed: ["Smoking", "Pets"],
        policies: ["Respect the surf culture"],
        isSegmentBuilderEnabled: true,
        segments: [
          {
            index: 1,
            activities: ["Surfing Lessons"],
            durationHour: 3,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.162272,
            latitude: 9.84893,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
          {
            index: 2,
            activities: ["Break and Snacks"],
            durationHour: 1,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.101177,
            latitude: 9.852118,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
        ],
        meetingPoint: null,
        photos: [],
        slotCapacity: { minimum: 5, maximum: 20 },
        schedule: {
          monday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
        },
        pricePerPerson: 800,
        pricePerSlot: null,
        daysCanCancel: 10,
        status: "Live",
        finishedSections: [
          "basicInfo",
          "itinerary",
          "inclusions",
          "additionalInfo",
          "photos",
          "pricing",
        ],
        pricePerDates: [],
        activityNote: "Perfect for beginners and experienced surfers alike.",
      },
      {
        title: "Siargao Night Sky Stargazing Tour",
        activityType: ["Adventure", "Boat Tour"],
        experienceType: "Joiner",
        description: "Experience the best island hopping spots in Siargao.",
        highLights: ["Naked Island", "Daku Island", "Guyam Island"],
        durationHour: 5,
        durationMinute: 30,
        languages: ["English", "Tagalog"],
        isFoodIncluded: true,
        includedFoods: ["Seafood Lunch", "Snacks"],
        isNonAlcoholicDrinkIncluded: true,
        isAlcoholicDrinkIncluded: false,
        includedAlcoholicDrinks: [],
        otherInclusion: ["Life Vest", "Snorkeling Gear"],
        notIncluded: ["Towel"],
        whatToBring: ["Waterproof bag", "Extra clothes"],
        notAllowed: ["Smoking", "Alcohol"],
        policies: ["Follow safety protocols on the boat"],
        isSegmentBuilderEnabled: true,
        segments: [
          {
            index: 1,
            activities: ["Island Hopping", "Swimming"],
            durationHour: 3,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.162272,
            latitude: 9.84893,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
          {
            index: 2,
            activities: ["Lunch Break"],
            durationHour: 1,
            durationMinute: 30,
            location: "Siargao",
            longitude: 126.101177,
            latitude: 9.852118,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
        ],
        meetingPoint: null,
        photos: [],
        slotCapacity: { minimum: 5, maximum: 20 },
        schedule: {
          monday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
        },
        pricePerPerson: 750,
        pricePerSlot: null,
        daysCanCancel: 5,
        status: "Live",
        finishedSections: [
          "basicInfo",
          "itinerary",
          "inclusions",
          "additionalInfo",
          "photos",
          "pricing",
        ],
        pricePerDates: [],
        activityNote: "Perfect for nature and beach lovers.",
      },
      {
        title: "Seaweed Farming and Coastal Life Exploration",
        activityType: ["Eco Tour", "Nature"],
        experienceType: "Joiner",
        description:
          "Explore the serene mangroves of Siargao and learn about its ecosystem.",
        highLights: [
          "Del Carmen Mangrove Forest",
          "Wildlife Spotting",
          "Kayaking Experience",
        ],
        durationHour: 4,
        durationMinute: 0,
        languages: ["English", "Tagalog"],
        isFoodIncluded: true,
        includedFoods: ["Local Snacks", "Fresh Fruit"],
        isNonAlcoholicDrinkIncluded: true,
        isAlcoholicDrinkIncluded: false,
        includedAlcoholicDrinks: [],
        otherInclusion: ["Kayak Rental", "Local Guide"],
        notIncluded: ["Sunscreen"],
        whatToBring: ["Hat", "Reusable Water Bottle"],
        notAllowed: ["Plastic Bottles", "Smoking"],
        policies: ["Protect the environment and wildlife"],
        isSegmentBuilderEnabled: true,
        segments: [
          {
            index: 1,
            activities: ["Mangrove Kayaking"],
            durationHour: 2,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.162272,
            latitude: 9.84893,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
          {
            index: 2,
            activities: ["Wildlife Spotting"],
            durationHour: 2,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.101177,
            latitude: 9.852118,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
        ],
        meetingPoint: null,
        photos: [],
        slotCapacity: { minimum: 4, maximum: 15 },
        schedule: {
          monday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
        },
        pricePerPerson: 700,
        pricePerSlot: null,
        daysCanCancel: 5,
        status: "Live",
        finishedSections: [
          "basicInfo",
          "itinerary",
          "inclusions",
          "additionalInfo",
          "photos",
          "pricing",
        ],
        pricePerDates: [],
        activityNote: "Perfect for eco-tourism enthusiasts.",
      },
      {
        title: "Island Picnic Escape with Secret Coves",
        activityType: ["Relaxation", "Cruise"],
        experienceType: "Joiner",
        description:
          "Unwind with a serene sunset cruise around the stunning waters of Siargao.",
        highLights: [
          "Beautiful Sunset Views",
          "Refreshments on Board",
          "Peaceful Atmosphere",
        ],
        durationHour: 3,
        durationMinute: 0,
        languages: ["English", "Tagalog"],
        isFoodIncluded: true,
        includedFoods: ["Snacks", "Fresh Fruit"],
        isNonAlcoholicDrinkIncluded: true,
        isAlcoholicDrinkIncluded: false,
        includedAlcoholicDrinks: [],
        otherInclusion: ["Boat Rental", "Life Vests"],
        notIncluded: ["Towel"],
        whatToBring: ["Camera", "Light Jacket"],
        notAllowed: ["Smoking", "Loud Music"],
        policies: ["Respect other passengers"],
        isSegmentBuilderEnabled: true,
        segments: [
          {
            index: 1,
            activities: ["Cruising", "Photo Opportunities"],
            durationHour: 2,
            durationMinute: 30,
            location: "Siargao",
            longitude: 126.2,
            latitude: 9.9,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
          {
            index: 2,
            activities: ["Relaxation"],
            durationHour: 0,
            durationMinute: 30,
            location: "Siargao",
            longitude: 126.21,
            latitude: 9.91,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
        ],
        meetingPoint: null,
        photos: [],
        slotCapacity: { minimum: 4, maximum: 12 },
        schedule: {
          monday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
        },
        pricePerPerson: 900,
        pricePerSlot: null,
        daysCanCancel: 5,
        status: "Live",
        finishedSections: [
          "basicInfo",
          "itinerary",
          "inclusions",
          "additionalInfo",
          "photos",
          "pricing",
        ],
        pricePerDates: [],
        activityNote: "A perfect way to end your day in Siargao.",
      },
      {
        title: "Adrenaline Rush: Cliff Diving and Rock Climbing",
        activityType: ["Adventure", "Cycling"],
        experienceType: "Joiner",
        description:
          "Cycle through the iconic coconut forests of Siargao and enjoy breathtaking landscapes.",
        highLights: [
          "Coconut Forest Trails",
          "Scenic Stops",
          "Cultural Insights",
        ],
        durationHour: 4,
        durationMinute: 0,
        languages: ["English", "Tagalog"],
        isFoodIncluded: true,
        includedFoods: ["Packed Lunch", "Snacks"],
        isNonAlcoholicDrinkIncluded: true,
        isAlcoholicDrinkIncluded: false,
        includedAlcoholicDrinks: [],
        otherInclusion: ["Bike Rental", "Helmet"],
        notIncluded: ["Cycling Gear"],
        whatToBring: ["Comfortable Clothes", "Reusable Water Bottle"],
        notAllowed: ["Pets", "Littering"],
        policies: ["Follow safety instructions"],
        isSegmentBuilderEnabled: true,
        segments: [
          {
            index: 1,
            activities: ["Cycling through Coconut Forest"],
            durationHour: 3,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.22,
            latitude: 9.87,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
          {
            index: 2,
            activities: ["Lunch Break"],
            durationHour: 1,
            durationMinute: 0,
            location: "Siargao",
            longitude: 126.23,
            latitude: 9.88,
            optional: false,
            hasAdditionalFee: false,
            transfer: null,
          },
        ],
        meetingPoint: null,
        photos: [],
        slotCapacity: { minimum: 3, maximum: 10 },
        schedule: {
          monday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
                slotIdsId: [
                  {
                    name: "Slot 1",
                  },
                  {
                    name: "Slot 2",
                  },
                  {
                    name: "Slot 3",
                  },
                ],
              },
            ],
          },
        },
        pricePerPerson: 600,
        pricePerSlot: null,
        daysCanCancel: 5,
        status: "Live",
        finishedSections: [
          "basicInfo",
          "itinerary",
          "inclusions",
          "additionalInfo",
          "photos",
          "pricing",
        ],
        pricePerDates: [],
        activityNote: "A must-try for cycling and nature enthusiasts.",
      },
    ]

    const locations: T_Location[] = [
      {
        city: "Pilar",
        streetAddress: "Lagoon View Drive",
        barangay: "Barangay 9",
        latitude: 9.896906,
        longitude: 126.061368,
        howToGetThere: "Take a boat to Socorro and explore the lagoon trail.",
        createdAt: "2024-11-27T02:34:07.098352",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "Santa Monica",
        streetAddress: "Beachside Avenue",
        barangay: "Barangay 10",
        latitude: 10.054394,
        longitude: 126.068952,
        howToGetThere:
          "Travel by tricycle and stop at Santa Monica's main beach.",
        createdAt: "2024-11-27T02:34:07.098379",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "Del Carmen",
        streetAddress: "Mangrove Trail",
        barangay: "Barangay 11",
        latitude: 9.900784,
        longitude: 125.987657,
        howToGetThere: "Explore the Del Carmen mangrove forest by boat.",
        createdAt: "2024-11-27T02:34:07.098394",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "General Luna",
        streetAddress: "Surfer's Paradise Lane",
        barangay: "Barangay 12",
        latitude: 9.795818,
        longitude: 126.108613,
        howToGetThere: "Head to General Luna for the famous Cloud 9 surf spot.",
        createdAt: "2024-11-27T02:34:07.098406",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "Burgos",
        streetAddress: "Cliffside Road",
        barangay: "Barangay 13",
        latitude: 10.015339,
        longitude: 126.070596,
        howToGetThere: "Drive along Burgos' main road to reach the cliffs.",
        createdAt: "2024-11-27T02:34:07.098418",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "Pilar",
        streetAddress: "Hidden Cove Drive",
        barangay: "Barangay 14",
        latitude: 9.898902,
        longitude: 126.086997,
        howToGetThere: "Follow the signs to Pilar's secret coves.",
        createdAt: "2024-11-27T02:34:07.098429",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "Dapa",
        streetAddress: "Fisherman's Lane",
        barangay: "Barangay 15",
        latitude: 9.824997,
        longitude: 126.043781,
        howToGetThere: "Take a boat from General Luna to Dapa port.",
        createdAt: "2024-11-27T02:34:07.098440",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "San Isidro",
        streetAddress: "Hilltop Road",
        barangay: "Barangay 16",
        latitude: 9.92111,
        longitude: 126.040768,
        howToGetThere: "Hike through San Isidro's scenic hilltop trails.",
        createdAt: "2024-11-27T02:34:07.098451",
        updatedAt: null,
        deletedAt: null,
      },
    ]

    const getUsers = await dbUsers.find({})
    const getUserIds = getUsers.flatMap((user) => user._id)
    const newUserActivities = activities.map((activity) => ({
      ...activity,
      host: getUserIds[0],
    }))

    const locationsData = await dbLocations.insertMany(locations)
    const joinerActivities = await dbActivities.insertMany(newUserActivities)
    joinerActivities.forEach(async (activity, i) => {
      await dbActivities.findByIdAndUpdate(activity._id, {
        $set: {
          meetingPoint: locationsData[i]?._id,
        },
      })
    })
    joinerActivities.forEach(async (activity) => {
      const photosKey = getRandomPhotoKeys(ACTIVITY_PHOTO_KEYS, 5)
      const photos = await dbPhotos.insertMany([
        {
          isMain: true,
          activityId: activity._id,
          bookableUnitId: null,
          propertyId: null,
          rentalId: null,
          createdAt: String(Date.now()),
          key: photosKey[0],
          thumbKey: activity.title + "-1",
          tags: "photo",
          description: activity.title + " description",
        },
        {
          isMain: false,
          activityId: activity._id,
          bookableUnitId: null,
          propertyId: null,
          rentalId: null,
          createdAt: String(Date.now()),
          key: photosKey[1],
          thumbKey: "",
          tags: "photo",
          description: activity.title + " description",
        },
        {
          isMain: false,
          activityId: activity._id,
          bookableUnitId: null,
          propertyId: null,
          rentalId: null,
          createdAt: String(Date.now()),
          key: photosKey[2],
          thumbKey: "",
          tags: "photo",
          description: activity.title + " description",
        },
        {
          isMain: false,
          activityId: activity._id,
          bookableUnitId: null,
          propertyId: null,
          rentalId: null,
          createdAt: String(Date.now()),
          key: photosKey[3],
          thumbKey: "",
          tags: "photo",
          description: activity.title + " description",
        },
        {
          isMain: false,
          activityId: activity._id,
          bookableUnitId: null,
          propertyId: null,
          rentalId: null,
          createdAt: String(Date.now()),
          key: photosKey[4],
          thumbKey: "",
          tags: "photo",
          description: activity.title + " description",
        },
      ])
      photos.forEach(async (photo) => {
        await dbActivities.updateOne(
          { _id: activity._id },
          {
            $push: { photos: photo._id },
          }
        )
      })
    })
    console.log("Activities for Joiners seeded successfully.")
  } catch (error) {
    console.error("Error seeeding Activities:", error)
  }
}

export default seedJoinerActivities

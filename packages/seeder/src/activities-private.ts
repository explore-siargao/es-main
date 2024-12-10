import { T_Activity } from "@repo/contract-2/activity"
import { T_Location } from "@repo/contract-2/address-location"
import { dbActivities, dbLocations, dbPhotos, dbUsers } from "@repo/database"
import { ACTIVITY_PHOTO_KEYS } from "./common/constants/photo-keys"
import { getRandomPhotoKeys } from "./common/helpers/getRandomPhotoKeys"

const seedActivities = async () => {
  try {
    console.log("Seeding activities for Private types...")
    const activities: T_Activity[] = [
      {
        title: "Guided City Siargao",
        activityType: ["Surfing lessons"],
        experienceType: "Private",
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
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "12:00 PM",
                endTime: "3:00 PM",
                note: "",
              },
            ],
          },
        },
        pricePerPerson: null,
        pricePerSlot: 500,
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
        title: "Explore the Wonders of Siargao",
        activityType: ["Wakeboarding", "Fishing"],
        experienceType: "Private",
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
        pricePerPerson: null,
        pricePerSlot: 700,
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
        activityNote: "Bring your camera to capture the amazing views!",
      },
      {
        title: "Siargao Island Adventure",
        activityType: ["Fishing", "ATV tour"],
        experienceType: "Private",
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
              },
            ],
          },
          wednesday: null,
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
        pricePerPerson: null,
        pricePerSlot: 650,
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
        title: "Siargao Surfing Adventure",
        activityType: ["Land tour"],
        experienceType: "Private",
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
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "9:00 AM",
                endTime: "1:00 PM",
                note: "",
              },
            ],
          },
        },
        pricePerPerson: null,
        pricePerSlot: 800,
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
        title: "Siargao Island Hopping Adventure",
        activityType: ["Freediving", "Scuva diving"],
        experienceType: "Private",
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
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "1:30 PM",
                note: "Morning tour.",
              },
            ],
          },
        },
        pricePerPerson: null,
        pricePerSlot: 750,
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
        title: "Siargao Mangrove Exploration",
        activityType: ["Island hopping"],
        experienceType: "Private",
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
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "8:30 AM",
                endTime: "12:30 PM",
                note: "Morning tour.",
              },
            ],
          },
        },
        pricePerPerson: null,
        pricePerSlot: 700,
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
        activityNote: "Perfect for eco-tourism enthusiasts.",
      },
      {
        title: "Siargao Sunset Cruise",
        activityType: ["Island hopping", "Wakeboarding"],
        experienceType: "Private",
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
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "4:00 PM",
                endTime: "7:00 PM",
                note: "Sunset cruise timing.",
              },
            ],
          },
        },
        pricePerPerson: null,
        pricePerSlot: 900,
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
        title: "Siargao Coconut Forest Bike Tour",
        activityType: ["Kite surfing", "ATV tour"],
        experienceType: "Private",
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
              },
            ],
          },
          tuesday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
              },
            ],
          },
          wednesday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
              },
            ],
          },
          thursday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
              },
            ],
          },
          friday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
              },
            ],
          },
          saturday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
              },
            ],
          },
          sunday: {
            slots: [
              {
                startTime: "8:00 AM",
                endTime: "12:00 PM",
                note: "Morning cycling tour.",
              },
            ],
          },
        },
        pricePerPerson: null,
        pricePerSlot: 600,
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
        city: "Del Carmen",
        streetAddress: "Island Trail",
        barangay: "Barangay 7",
        latitude: 9.864004,
        longitude: 126.012909,
        howToGetThere: "Hike through the forest trail near Del Carmen.",
        createdAt: "2024-11-27T02:34:07.098352",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "General Luna",
        streetAddress: "Surf Avenue",
        barangay: "Barangay 7",
        latitude: 9.83573,
        longitude: 126.124259,
        howToGetThere: "Take a tricycle from General Luna and stop at Cloud 9.",
        createdAt: "2024-11-27T02:34:07.098379",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "Pilar",
        streetAddress: "Cloud 9 Drive",
        barangay: "Barangay 4",
        latitude: 9.858044,
        longitude: 126.0382,
        howToGetThere: "Travel by boat to Sugba Lagoon and follow the trail.",
        createdAt: "2024-11-27T02:34:07.098394",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "Dapa",
        streetAddress: "Harbor Lane",
        barangay: "Barangay 3",
        latitude: 9.76751,
        longitude: 126.031541,
        howToGetThere: "Follow the signs to the local surfing area in Dapa.",
        createdAt: "2024-11-27T02:34:07.098406",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "San Isidro",
        streetAddress: "Lagoon Street",
        barangay: "Barangay 6",
        latitude: 9.93106,
        longitude: 126.069023,
        howToGetThere:
          "Drive along the General Luna Highway to reach the spot.",
        createdAt: "2024-11-27T02:34:07.098418",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "Burgos",
        streetAddress: "Seaside Road",
        barangay: "Barangay 2",
        latitude: 10.007668,
        longitude: 126.082054,
        howToGetThere:
          "Catch a jeepney to Santa Monica and walk to the location.",
        createdAt: "2024-11-27T02:34:07.098429",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "Santa Monica",
        streetAddress: "Coconut Way",
        barangay: "Barangay 5",
        latitude: 10.005687,
        longitude: 126.044831,
        howToGetThere: "Use a guided tour service from Burgos to the site.",
        createdAt: "2024-11-27T02:34:07.098440",
        updatedAt: null,
        deletedAt: null,
      },
      {
        city: "Burgos",
        streetAddress: "Harbor Lane",
        barangay: "Barangay 8",
        latitude: 10.015232,
        longitude: 126.070605,
        howToGetThere:
          "Take a boat to Burgos and rent a habal-habal to the area.",
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

    const privateActivities = await dbActivities.insertMany(newUserActivities)
    const meetingPoint = await dbLocations.insertMany(locations)
    privateActivities.forEach(async (activity) => {
      meetingPoint.forEach(async (loc) => {
        await dbActivities.findByIdAndUpdate(activity._id, {
          $set: {
            meetingPoint: loc._id,
          },
        })
      })
    })

    privateActivities.forEach(async (activity) => {
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
    console.log("Activities for Private type seeded successfully.")
  } catch (error) {
    console.error("Error seeeding Activities:", error)
  }
}

export default seedActivities

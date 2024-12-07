import { T_Location } from "@repo/contract-2/address-location"
import { dbLocations } from "@repo/database"

const locations: T_Location[] = [
  {
    city: "General Luna",
    streetAddress: "Tourism Road",
    barangay: "Catangnan",
    latitude: 9.786834,
    longitude: 126.155181,
    howToGetThere:
      "From Dapa Port, take a tricycle to General Luna, then follow Tourism Road towards Cloud 9.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "Del Carmen",
    streetAddress: "Poblacion 1",
    barangay: "Caub",
    latitude: 9.897282,
    longitude: 125.895483,
    howToGetThere:
      "From Siargao Airport, take a van to Del Carmen town center, then proceed to Barangay Caub.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "San Isidro",
    streetAddress: "Poblacion",
    barangay: "Pacifico",
    latitude: 9.936033,
    longitude: 126.088835,
    howToGetThere:
      "Take a habal-habal from General Luna and follow the northern coastal road to Pacifico Beach.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "Pilar",
    streetAddress: "Barangay Road",
    barangay: "Magpupungko",
    latitude: 9.875056,
    longitude: 126.117559,
    howToGetThere:
      "Head to Pilar from General Luna, and follow signs to the Magpupungko Rock Pools.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "Dapa",
    streetAddress: "Market Road",
    barangay: "Poblacion 2",
    latitude: 9.756562,
    longitude: 126.054008,
    howToGetThere:
      "From the Siargao Ferry Terminal, take a tricycle to Dapa Market Road.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "Burgos",
    streetAddress: "Barangay Road",
    barangay: "Poblacion",
    latitude: 10.020131,
    longitude: 126.072232,
    howToGetThere:
      "Travel north from General Luna, passing Pacifico, to reach Burgos.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "Sta. Monica",
    streetAddress: "National Highway",
    barangay: "Alegria",
    latitude: 10.018711,
    longitude: 126.036697,
    howToGetThere:
      "Follow the northern highway from Dapa or General Luna to Alegria Beach.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "Del Carmen",
    streetAddress: "Mangrove Road",
    barangay: "Poblacion 3",
    latitude: 9.869578,
    longitude: 125.972647,
    howToGetThere:
      "Visit the Del Carmen Mangrove Forest and Eco-Park from the town center.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "San Benito",
    streetAddress: "Inner Road",
    barangay: "Poblacion",
    latitude: 9.957335,
    longitude: 126.00524,
    howToGetThere:
      "From Del Carmen, take a motorcycle ride to the quiet town of San Benito.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "General Luna",
    streetAddress: "Barangay Road",
    barangay: "Malinao",
    latitude: 9.797315,
    longitude: 126.161185,
    howToGetThere:
      "Follow the coastal road south from General Luna to Malinao Beach.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "Dapa",
    streetAddress: "Sitio Road",
    barangay: "Union",
    latitude: 9.782095,
    longitude: 126.079241,
    howToGetThere:
      "Travel south from Dapa to the agricultural area of Barangay Union.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "San Isidro",
    streetAddress: "Barangay Road",
    barangay: "San Mateo",
    latitude: 9.944203,
    longitude: 126.10322,
    howToGetThere:
      "Take the inland road from Pacifico to San Mateo, a farming barangay.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "Pilar",
    streetAddress: "Pilar Market Road",
    barangay: "Poblacion",
    latitude: 9.86388,
    longitude: 126.100473,
    howToGetThere: "From General Luna, take a tricycle to Pilar town center.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "General Luna",
    streetAddress: "Beachfront Road",
    barangay: "Tuazon",
    latitude: 9.807123,
    longitude: 126.165184,
    howToGetThere:
      "Head to the famous Cloud 9 area and look for Tuazon Barangay.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "Del Carmen",
    streetAddress: "Barangay Road",
    barangay: "San Vicente",
    latitude: 9.886717,
    longitude: 126.007344,
    howToGetThere:
      "Drive through the mangroves towards San Vicente, west of Del Carmen.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
]

const locationSeeder = async () => {
  try {
    await dbLocations.insertMany(locations)
    console.log("Locations seeded successfully!")
  } catch (e: any) {
    console.error("Error seeding locations:", e)
  }
}

export default locationSeeder

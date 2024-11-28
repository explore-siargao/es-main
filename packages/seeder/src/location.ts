import { T_Location } from "@repo/contract-2/address-location"
import { dbLocations } from "@repo/database"

const sampleLocations: T_Location[] = [
  {
    city: "General Luna",
    streetAddress: "Tourism Road",
    barangay: "Catangnan",
    longitude: 126.1596,
    latitude: 9.757,
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
    longitude: 126.0656,
    latitude: 9.8698,
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
    longitude: 126.1422,
    latitude: 9.8956,
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
    longitude: 126.1785,
    latitude: 9.8282,
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
    longitude: 126.1067,
    latitude: 9.749,
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
    longitude: 126.2012,
    latitude: 9.9723,
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
    longitude: 126.219,
    latitude: 9.9785,
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
    longitude: 126.0678,
    latitude: 9.8712,
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
    longitude: 126.1154,
    latitude: 9.8943,
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
    longitude: 126.1509,
    latitude: 9.7454,
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
    longitude: 126.1087,
    latitude: 9.7525,
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
    longitude: 126.1435,
    latitude: 9.9032,
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
    longitude: 126.1802,
    latitude: 9.8213,
    howToGetThere: "From General Luna, take a tricycle to Pilar town center.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
  {
    city: "General Luna",
    streetAddress: "Beachfront Road",
    barangay: "Tuazon",
    longitude: 126.1583,
    latitude: 9.7587,
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
    longitude: 126.0643,
    latitude: 9.8734,
    howToGetThere:
      "Drive through the mangroves towards San Vicente, west of Del Carmen.",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    deletedAt: null,
  },
]

const locationSeeder = async () => {
  try {
    await dbLocations.insertMany(sampleLocations)
    console.log("Locations seeded successfully!")
  } catch (e: any) {
    console.error("Error seeding locations:", e)
  }
}

export default locationSeeder

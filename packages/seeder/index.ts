import {
  dbActivities,
  dbAddresses,
  dbBookableUnitTypes,
  dbEmergencyContacts,
  dbGuests,
  dbLocations,
  dbPhotos,
  dbProperties,
  dbRentalAddOns,
  dbRentalDetails,
  dbRentalRates,
  dbRentals,
  dbReservations,
  dbUnitPrices,
  dbUsers,
  dbReviews,
  dbWishlists,
  initMongo,
} from "@repo/database"
import seedUsers from "./src/users"
import seedProperties from "./src/properties"
import seedRentals from "./src/rentals"
import seedReservations from "./src/reservations"
import seedJoinerActivities from "./src/activities-joiner"
import seedActivities from "./src/activities-private"
import locationSeeder from "./src/location"
import seedReview from "./src/reviews"
import seedWishlist from "./src/wishlist"

initMongo()

const seedAll = async () => {
  try {
    //delete all datas from collections
    await dbUsers.deleteMany({})
    await dbActivities.deleteMany({})
    await dbAddresses.deleteMany({})
    await dbGuests.deleteMany({})
    await dbRentals.deleteMany({})
    await dbProperties.deleteMany({})
    await dbBookableUnitTypes.deleteMany({})
    await dbLocations.deleteMany({})
    await dbPhotos.deleteMany({})
    await dbRentalAddOns.deleteMany({})
    await dbRentalDetails.deleteMany({})
    await dbRentalRates.deleteMany({})
    await dbEmergencyContacts.deleteMany({})
    await dbUnitPrices.deleteMany({})
    await dbReservations.deleteMany({})
    await dbReviews.deleteMany({})
    await dbWishlists.deleteMany({})
    // Run individual seeders
    await seedUsers()
    await locationSeeder()
    await seedActivities()
    await seedJoinerActivities()
    await seedProperties()
    await seedRentals()
    await seedReservations()
    await seedReview()
    await seedWishlist()
    // Add more seeders here as needed
    console.log("All seeders executed successfully!")
  } catch (error) {
    console.error("Error running seeders:", error)
    process.exit(1)
  } finally {
    console.log("Disconnected from MongoDB")
    process.exit(0)
  }
}

seedAll()

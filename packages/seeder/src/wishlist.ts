import {
  dbActivities,
  dbProperties,
  dbRentals,
  dbUsers,
  dbWishlists,
} from "@repo/database"

const seedWishlist = async () => {
  console.log("Seeding wishlist...")
  try {
    const users = await dbUsers.find({ deletedAt: null })
    const flatUsers = users.flatMap((user) => user._id)
    const getProperties = await dbProperties.find({
      status: "Live",
      deletedAt: null,
    })
    const flatProperties = getProperties.flatMap((property) => ({
      _id: property._id,
      category: "Properties",
    }))
    const getRentals = await dbRentals.find({ status: "Live", deletedAt: null })
    const flatRentals = getRentals.flatMap((rental) => ({
      _id: rental._id,
      category: "Rentals",
    }))
    const getActivities = await dbActivities.find({
      status: "Live",
      deletedAt: null,
    })
    const flatActivities = getActivities.flatMap((activity) => ({
      _id: activity._id,
      category: "Activities",
    }))
    for (const user of flatUsers) {
      const propertyIndex = Math.floor(Math.random() * flatProperties.length)
      const rentalIndex = Math.floor(Math.random() * flatRentals.length)
      const activityIndex = Math.floor(Math.random() * flatActivities.length)
      const newPropertyWish = new dbWishlists({
        category: flatProperties[propertyIndex]?.category,
        userId: user,
        listingId: flatProperties[propertyIndex]?._id,
        createdAt: new Date(),
      })
      const newRentalWish = new dbWishlists({
        category: flatRentals[rentalIndex]?.category,
        userId: user,
        listingId: flatRentals[rentalIndex]?._id,
        createdAt: new Date(),
      })
      const newActivityWish = new dbWishlists({
        category: flatActivities[activityIndex]?.category,
        userId: user,
        listingId: flatActivities[activityIndex]?._id,
        createdAt: new Date(),
      })
      await newPropertyWish.save()
      await newRentalWish.save()
      await newActivityWish.save()
    }
    console.log("Wishlist seeded successfully")
  } catch (err: any) {
    console.error("Error seeding wishlist, ", err)
  }
}

export default seedWishlist

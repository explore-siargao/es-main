import {
  dbActivities,
  dbBookableUnitTypes,
  dbProperties,
  dbRentals,
  dbReviews,
  dbUsers,
} from "@repo/database"
import {
  activityReviewComments,
  rentalReviewComments,
  reviewPropertyComments,
} from "./common/constants/reviews"

const seedReview = async () => {
  console.log("Seeding reviews...")
  try {
    const rates = [1, 2, 3, 4, 5]
    const getProperties = await dbProperties.find({
      status: "Live",
      deletedAt: null,
    })
    const getRentals = await dbRentals.find({ status: "Live", deletedAt: null })
    const getActivities = await dbActivities.find({
      status: "Live",
      deletedAt: null,
    })
    const getUsers = await dbUsers.find({ deletedAt: null })
    const flatUserIds = getUsers.flatMap((item) => item._id)

    for (const property of getProperties) {
      for (const item of property.bookableUnits) {
        const commentIndex = Math.floor(
          Math.random() * reviewPropertyComments.length
        )
        const userIndex = Math.floor(Math.random() * flatUserIds.length)
        const accuracyRateIndex = Math.floor(Math.random() * rates.length)
        const checkInRateIndex = Math.floor(Math.random() * rates.length)
        const cleanlinessRatesIndex = Math.floor(Math.random() * rates.length)
        const communicationRatesIndex = Math.floor(Math.random() * rates.length)
        const locationRatesIndex = Math.floor(Math.random() * rates.length)
        const valueRatesIndex = Math.floor(Math.random() * rates.length)

        const accuracyRates = rates[accuracyRateIndex]
        const checkInRates = rates[checkInRateIndex]
        const cleanlinessRates = rates[cleanlinessRatesIndex]
        const communicationRates = rates[communicationRatesIndex]
        const locationRates = rates[locationRatesIndex]
        const valueRates = rates[valueRatesIndex]
        const totalRates =
          ((accuracyRates || 0) +
            (checkInRates || 0) +
            (cleanlinessRates || 0) +
            (communicationRates || 0) +
            (locationRates || 0) +
            (valueRates || 0)) /
          6

        const newPropertyReview = new dbReviews({
          reviewerId: flatUserIds[userIndex],
          accuracyRates,
          checkInRates,
          cleanlinessRates,
          communicationRates,
          locationRates,
          valueRates,
          comment: reviewPropertyComments[commentIndex],
          totalRates,
          property: {
            propertyId: property._id,
            bookableUnitId: item._id,
          },
          rental: null,
          activity: null,
          createdAt: Date.now(),
        })

        await newPropertyReview.save()

        await dbBookableUnitTypes.findByIdAndUpdate(item._id, {
          $push: {
            reviews: newPropertyReview._id,
          },
        })

        await dbProperties.findByIdAndUpdate(property._id, {
          $push: {
            reviews: newPropertyReview._id,
          },
        })
      }
    }

    for (const rental of getRentals) {
      const commentIndex = Math.floor(
        Math.random() * rentalReviewComments.length
      )
      const userIndex = Math.floor(Math.random() * flatUserIds.length)
      const accuracyRateIndex = Math.floor(Math.random() * rates.length)
      const checkInRateIndex = Math.floor(Math.random() * rates.length)
      const cleanlinessRatesIndex = Math.floor(Math.random() * rates.length)
      const communicationRatesIndex = Math.floor(Math.random() * rates.length)
      const locationRatesIndex = Math.floor(Math.random() * rates.length)
      const valueRatesIndex = Math.floor(Math.random() * rates.length)

      const accuracyRates = rates[accuracyRateIndex]
      const checkInRates = rates[checkInRateIndex]
      const cleanlinessRates = rates[cleanlinessRatesIndex]
      const communicationRates = rates[communicationRatesIndex]
      const locationRates = rates[locationRatesIndex]
      const valueRates = rates[valueRatesIndex]
      const totalRates =
        ((accuracyRates || 0) +
          (checkInRates || 0) +
          (cleanlinessRates || 0) +
          (communicationRates || 0) +
          (locationRates || 0) +
          (valueRates || 0)) /
        6
      const newRentalReview = new dbReviews({
        reviewerId: flatUserIds[userIndex],
        accuracyRates,
        checkInRates,
        cleanlinessRates,
        communicationRates,
        locationRates,
        valueRates,
        comment: rentalReviewComments[commentIndex],
        totalRates,
        rental: rental._id,
        property: null,
        activity: null,
        createdAt: Date.now(),
      })

      await newRentalReview.save()
      await dbRentals.findByIdAndUpdate(rental._id, {
        $push: {
          reviews: newRentalReview._id,
        },
      })
    }

    for (const activity of getActivities) {
      const commentIndex = Math.floor(
        Math.random() * activityReviewComments.length
      )
      const userIndex = Math.floor(Math.random() * flatUserIds.length)
      const accuracyRateIndex = Math.floor(Math.random() * rates.length)
      const checkInRateIndex = Math.floor(Math.random() * rates.length)
      const cleanlinessRatesIndex = Math.floor(Math.random() * rates.length)
      const communicationRatesIndex = Math.floor(Math.random() * rates.length)
      const locationRatesIndex = Math.floor(Math.random() * rates.length)
      const valueRatesIndex = Math.floor(Math.random() * rates.length)

      const accuracyRates = rates[accuracyRateIndex]
      const checkInRates = rates[checkInRateIndex]
      const cleanlinessRates = rates[cleanlinessRatesIndex]
      const communicationRates = rates[communicationRatesIndex]
      const locationRates = rates[locationRatesIndex]
      const valueRates = rates[valueRatesIndex]
      const totalRates =
        ((accuracyRates || 0) +
          (checkInRates || 0) +
          (cleanlinessRates || 0) +
          (communicationRates || 0) +
          (locationRates || 0) +
          (valueRates || 0)) /
        6

      const newActivityReview = new dbReviews({
        reviewerId: flatUserIds[userIndex],
        accuracyRates,
        checkInRates,
        cleanlinessRates,
        communicationRates,
        locationRates,
        valueRates,
        comment: activityReviewComments[commentIndex],
        totalRates,
        rental: null,
        property: null,
        activity: activity._id,
        createdAt: Date.now(),
      })
      await newActivityReview.save()
      await dbActivities.findByIdAndUpdate(activity._id, {
        $push: {
          reviews: newActivityReview._id,
        },
      })
    }

    console.log("Reviews seeded successfully!")
  } catch (error) {
    console.error("Error seeding reviews: ", error)
  }
}

export default seedReview

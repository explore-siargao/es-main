import { prisma } from "./"

export const listingPlaceOffer = async () => {
  const getPlaceOffers = await prisma.placeOffers.findMany({
    where: {
      deletedAt: null,
    },
  })

  const getListings = await prisma.listing.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createListingPlaceOffers = await prisma.listingPlaceOffers.createMany({
    data: [
      {
        listingId: getListings[2]?.id || 0,
        placeOfferId: getPlaceOffers[0]?.id || 0,
      },
      {
        listingId: getListings[2]?.id || 0,
        placeOfferId: getPlaceOffers[1]?.id || 0,
      },
      {
        listingId: getListings[3]?.id || 0,
        placeOfferId: getPlaceOffers[2]?.id || 0,
      },
      {
        listingId: getListings[3]?.id || 0,
        placeOfferId: getPlaceOffers[3]?.id || 0,
      },
      {
        listingId: getListings[4]?.id || 0,
        placeOfferId: getPlaceOffers[4]?.id || 0,
      },
    ],
  })

  console.log({ createListingPlaceOffers })
}

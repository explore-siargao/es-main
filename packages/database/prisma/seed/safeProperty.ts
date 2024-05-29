import { prisma } from "./"

export const safeProperty = async () => {
  const getListings = await prisma.listing.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createSafetyProperties = await prisma.safetyProperty.createMany({
    data: [
      {
        listingId: getListings[2]?.id || 0,
        title: "Safety considerations",
      },
      {
        listingId: getListings[2]?.id || 0,
        title: "Safety devices",
      },
      {
        listingId: getListings[2]?.id || 0,
        title: "Property info",
      },
      {
        listingId: getListings[3]?.id || 0,
        title: "Safety considerations",
      },
      {
        listingId: getListings[3]?.id || 0,
        title: "Safety devices",
      },
    ],
  })
  console.log({ createSafetyProperties })
}

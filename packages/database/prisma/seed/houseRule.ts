import { prisma } from "./"

export const houseRule = async () => {
  const getListings = await prisma.listing.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createHouseRules = await prisma.houseRule.createMany({
    data: [
      {
        listingId: getListings[0]?.id || 0,
        title: "Checking in and out",
      },
      {
        listingId: getListings[0]?.id || 0,
        title: "During your stay",
      },
      {
        listingId: getListings[0]?.id || 0,
        title: "Before you leave",
      },
      {
        listingId: getListings[1]?.id || 0,
        title: "Checking in and out",
      },
      {
        listingId: getListings[1]?.id || 0,
        title: "During your stay",
      },
    ],
  })
  console.log({ createHouseRules })
}

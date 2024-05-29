import { prisma } from "./"

export const wishGroup = async () => {
  const getUsers = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  })

  const getListings = await prisma.listing.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createWishGroups = await prisma.wishGroup.createMany({
    data: [
      {
        listingId: getListings[0]?.id || 0,
        userId: getUsers[3]?.id || 0,
        title: "Awsome places",
        note: "To return",
      },
      {
        listingId: getListings[2]?.id || 0,
        userId: getUsers[3]?.id || 0,
        title: "Awsome places",
        note: "To return",
      },
      {
        listingId: getListings[0]?.id || 0,
        userId: getUsers[4]?.id || 0,
        title: "Soon",
        note: "In the fitre I will go here",
      },
      {
        listingId: getListings[3]?.id || 0,
        userId: getUsers[4]?.id || 0,
        title: "Awsome places",
        note: "To return",
      },
      {
        listingId: getListings[4]?.id || 0,
        userId: getUsers[4]?.id || 0,
        title: "Awsome places",
        note: "To return",
      },
    ],
  })
  console.log({ createWishGroups })
}

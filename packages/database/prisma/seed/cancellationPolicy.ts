import { prisma } from "./"

export const cancellationPolicy = async () => {
  const getListings = await prisma.listing.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createCancellationpolicies = await prisma.cancellationPolicy.createMany(
    {
      data: [
        {
          listingId: getListings[3]?.id || 0,
          cancelationDueDate: "2000-10-31T01:30:00.000-05:00",
          title: "March 14",
        },
        {
          listingId: getListings[1]?.id || 0,
          cancelationDueDate: "2000-10-31T01:30:00.000-05:00",
          title: "March 18",
        },
        {
          listingId: getListings[2]?.id || 0,
          cancelationDueDate: "2000-10-31T01:30:00.000-05:00",
          title: "March 18",
        },
        {
          listingId: getListings[4]?.id || 0,
          cancelationDueDate: "2000-10-31T01:30:00.000-05:00",
          title: "March 18",
        },
        {
          listingId: getListings[0]?.id || 0,
          cancelationDueDate: "2000-10-31T01:30:00.000-05:00",
          title: "March 18",
        },
      ],
    }
  )
  console.log({ createCancellationpolicies })
}

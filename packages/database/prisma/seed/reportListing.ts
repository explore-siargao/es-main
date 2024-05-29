import { prisma } from "./"

export const reportListing = async () => {
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

  const reportData = ["Scam", "Not same on picture", "Host post false images"]
  const asStringData = JSON.stringify(reportData)

  const createReportListings = await prisma.reportListing.createMany({
    data: [
      {
        listingId: getListings[1]?.id || 0,
        reports: asStringData,
        reportedBy: getUsers[4]?.id || 0,
      },
      {
        listingId: getListings[1]?.id || 0,
        reports: asStringData,
        reportedBy: getUsers[3]?.id || 0,
      },
      {
        listingId: getListings[4]?.id || 0,
        reports: asStringData,
        reportedBy: getUsers[3]?.id || 0,
      },
      {
        listingId: getListings[4]?.id || 0,
        reports: asStringData,
        reportedBy: getUsers[4]?.id || 0,
      },
      {
        listingId: getListings[1]?.id || 0,
        reports: asStringData,
        reportedBy: getUsers[3]?.id || 0,
      },
    ],
  })
  console.log({ createReportListings })
}

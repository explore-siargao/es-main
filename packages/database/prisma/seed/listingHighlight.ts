import { prisma } from "./"

export const listingHighlight = async () => {
  const getHighlights = await prisma.highLights.findMany({
    where: {
      deletedAt: null,
    },
  })

  const getListings = await prisma.listing.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createListinghighlights = await prisma.listingHighLights.createMany({
    data: [
      {
        highLightsId: getHighlights[0]?.id || 0,
        listingId: getListings[0]?.id || 0,
      },
      {
        highLightsId: getHighlights[1]?.id || 0,
        listingId: getListings[0]?.id || 0,
      },
      {
        highLightsId: getHighlights[2]?.id || 0,
        listingId: getListings[0]?.id || 0,
      },
      {
        highLightsId: getHighlights[3]?.id || 0,
        listingId: getListings[1]?.id || 0,
      },
      {
        highLightsId: getHighlights[4]?.id || 0,
        listingId: getListings[1]?.id || 0,
      },
    ],
  })
  console.log({ createListinghighlights })
}

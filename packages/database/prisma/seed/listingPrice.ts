import { prisma } from "./"

export const listingPrice = async () => {
  const createListingPrices = await prisma.listingPrice.createMany({
    data: [
      {
        fee: 23400,
        cleaningFee: 0,
        serviceFee: 3303.54,
        guestLimitCount: 8,
      },
      {
        fee: 20000,
        cleaningFee: 0,
        serviceFee: 2823.54,
        guestLimitCount: 12,
      },
      {
        fee: 4900,
        cleaningFee: 0,
        serviceFee: 691.77,
        guestLimitCount: 6,
      },
      {
        fee: 7200,
        cleaningFee: 0,
        serviceFee: 1016.47,
        guestLimitCount: 10,
      },
      {
        fee: 9000,
        cleaningFee: 0,
        serviceFee: 1270.59,
        guestLimitCount: 10,
      },
    ],
  })
  console.log({ createListingPrices })
}

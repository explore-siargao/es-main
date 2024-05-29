import { prisma } from './prismaClient'
import { differenceInDays } from 'date-fns'

export type T_BookingGetPrice = {
  listingId: number
  childrenCount: number
  adultCount: number
  fromDate: string
  toDate: string
}
export const getListingPrice = async ({
  listingId,
  childrenCount,
  adultCount,
  fromDate,
  toDate,
}: T_BookingGetPrice) => {
  const listing = await prisma.listing.findFirst({
    where: {
      id: listingId,
    },
    include: {
      price: {
        select: {
          cleaningFee: true,
          serviceFee: true,
          fee: true,
        },
      },
    },
  })
  const price = listing
    ? listing.price.fee + listing.price.cleaningFee + listing.price.serviceFee
    : 0
  const guestCounts = childrenCount + adultCount
  const daysCount = differenceInDays(new Date(toDate), new Date(fromDate))
  const totalPrice = price * guestCounts * daysCount
  return Number(totalPrice)
}

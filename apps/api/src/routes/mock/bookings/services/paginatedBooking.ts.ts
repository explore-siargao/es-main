import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'

const bookings = [
  {
    id: 1,
    listingId: 1,
    Listing: {
      title: 'Amazing World',
      imageKey: '1.jpg',
      address: 'Paete, Laguna',
    },
    fromDate: '2024-02-06 02:16:50.145',
    toDate: '2024-02-10 02:16:50.145',
    guestCount: 5,
    totalFee: 22000,
    transactionId: 1,
    Transaction: {
      status: 'For Verification',
    },
    createdAt: '2024-02-06 02:16:50.145',
  },
  {
    id: 2,
    listingId: 2,
    Listing: {
      title: 'Beautiful Villa',
      imageKey: '2.jpg',
      address: 'Ubud, Bali',
    },
    fromDate: '2024-02-07 02:16:50.145',
    toDate: '2024-02-12 02:16:50.145',
    guestCount: 3,
    totalFee: 18000,
    transactionId: 2,
    Transaction: {
      status: 'Verified',
    },
    createdAt: '2024-02-07 02:16:50.145',
  },
  {
    id: 3,
    listingId: 3,
    Listing: {
      title: 'Cozy Cabin',
      imageKey: '3.jpg',
      address: 'Gatlinburg, Tennessee',
    },
    fromDate: '2024-02-08 02:16:50.145',
    toDate: '2024-02-14 02:16:50.145',
    guestCount: 4,
    totalFee: 15000,
    transactionId: 3,
    Transaction: {
      status: 'In Progress',
    },
    createdAt: '2024-02-08 02:16:50.145',
  },
  {
    id: 4,
    listingId: 4,
    Listing: {
      title: 'Seaside Retreat',
      imageKey: '4.jpg',
      address: 'Maui, Hawaii',
    },
    fromDate: '2024-02-09 02:16:50.145',
    toDate: '2024-02-15 02:16:50.145',
    guestCount: 2,
    totalFee: 28000,
    transactionId: 4,
    Transaction: {
      status: 'Verified',
    },
    createdAt: '2024-02-09 02:16:50.145',
  },
  {
    id: 5,
    listingId: 5,
    Listing: {
      title: 'Mountain Getaway',
      imageKey: '5.jpg',
      address: 'Aspen, Colorado',
    },
    fromDate: '2024-02-10 02:16:50.145',
    toDate: '2024-02-18 02:16:50.145',
    guestCount: 6,
    totalFee: 30000,
    transactionId: 5,
    Transaction: {
      status: 'For Verification',
    },
    createdAt: '2024-02-10 02:16:50.145',
  },
  {
    id: 6,
    listingId: 6,
    Listing: {
      title: 'Ski Chalet',
      imageKey: '1.jpg',
      address: 'Chamonix, France',
    },
    fromDate: '2024-02-11 02:16:50.145',
    toDate: '2024-02-20 02:16:50.145',
    guestCount: 8,
    totalFee: 35000,
    transactionId: 6,
    Transaction: {
      status: 'For Verification',
    },
    createdAt: '2024-02-11 02:16:50.145',
  },
  {
    id: 7,
    listingId: 7,
    Listing: {
      title: 'Lakeside Cottage',
      imageKey: '2.jpg',
      address: 'Lake Como, Italy',
    },
    fromDate: '2024-02-12 02:16:50.145',
    toDate: '2024-02-22 02:16:50.145',
    guestCount: 4,
    totalFee: 20000,
    transactionId: 7,
    Transaction: {
      status: 'In Progress',
    },
    createdAt: '2024-02-12 02:16:50.145',
  },
  {
    id: 8,
    listingId: 8,
    Listing: {
      title: 'Desert Oasis',
      imageKey: '3.jpg',
      address: 'Sahara, Morocco',
    },
    fromDate: '2024-02-13 02:16:50.145',
    toDate: '2024-02-24 02:16:50.145',
    guestCount: 3,
    totalFee: 25000,
    transactionId: 8,
    Transaction: {
      status: 'Verified',
    },
    createdAt: '2024-02-13 02:16:50.145',
  },
  {
    id: 9,
    listingId: 9,
    Listing: {
      title: 'Riverside Cabin',
      imageKey: '4.jpg',
      address: 'Yellowstone, Montana',
    },
    fromDate: '2024-02-14 02:16:50.145',
    toDate: '2024-02-26 02:16:50.145',
    guestCount: 5,
    totalFee: 28000,
    transactionId: 9,
    Transaction: {
      status: 'For Verification',
    },
    createdAt: '2024-02-14 02:16:50.145',
  },
  {
    id: 10,
    listingId: 10,
    Listing: {
      title: 'Treehouse Retreat',
      imageKey: '5.jpg',
      address: 'Costa Rica',
    },
    fromDate: '2024-02-15 02:16:50.145',
    toDate: '2024-02-28 02:16:50.145',
    guestCount: 2,
    totalFee: 20000,
    transactionId: 10,
    Transaction: {
      status: 'Verified',
    },
    createdAt: '2024-02-15 02:16:50.145',
  },
  {
    id: 11,
    listingId: 11,
    Listing: {
      title: 'Mountain Lodge',
      imageKey: '1.jpg',
      address: 'Whistler, Canada',
    },
    fromDate: '2024-02-16 02:16:50.145',
    toDate: '2024-03-02 02:16:50.145',
    guestCount: 7,
    totalFee: 32000,
    transactionId: 11,
    Transaction: {
      status: 'For Verification',
    },
    createdAt: '2024-02-16 02:16:50.145',
  },
  {
    id: 12,
    listingId: 12,
    Listing: {
      title: 'Beachfront Bungalow',
      imageKey: '2.jpg',
      address: 'Maldives',
    },
    fromDate: '2024-02-17 02:16:50.145',
    toDate: '2024-03-05 02:16:50.145',
    guestCount: 4,
    totalFee: 26000,
    transactionId: 12,
    Transaction: {
      status: 'In Progress',
    },
    createdAt: '2024-02-17 02:16:50.145',
  },
  {
    id: 13,
    listingId: 13,
    Listing: {
      title: 'Alpine Chalet',
      imageKey: '3.jpg',
      address: 'Zermatt, Switzerland',
    },
    fromDate: '2024-02-18 02:16:50.145',
    toDate: '2024-03-08 02:16:50.145',
    guestCount: 6,
    totalFee: 38000,
    transactionId: 13,
    Transaction: {
      status: 'For Verification',
    },
    createdAt: '2024-02-18 02:16:50.145',
  },
  {
    id: 14,
    listingId: 14,
    Listing: {
      title: 'City Apartment',
      imageKey: '4.jpg',
      address: 'New York City, USA',
    },
    fromDate: '2024-02-19 02:16:50.145',
    toDate: '2024-03-10 02:16:50.145',
    guestCount: 3,
    totalFee: 19000,
    transactionId: 14,
    Transaction: {
      status: 'In Progress',
    },
    createdAt: '2024-02-19 02:16:50.145',
  },
  {
    id: 15,
    listingId: 15,
    Listing: {
      title: 'Tropical Paradise',
      imageKey: '5.jpg',
      address: 'Bora Bora',
    },
    fromDate: '2024-02-20 02:16:50.145',
    toDate: '2024-03-12 02:16:50.145',
    guestCount: 2,
    totalFee: 21000,
    transactionId: 15,
    Transaction: {
      status: 'For Verification',
    },
    createdAt: '2024-02-20 02:16:50.145',
  },
  {
    id: 16,
    listingId: 16,
    Listing: {
      title: 'Mountain Retreat',
      imageKey: '1.jpg',
      address: 'Sapporo, Hokkaido',
    },
    fromDate: '2024-02-21 02:16:50.145',
    toDate: '2024-03-14 02:16:50.145',
    guestCount: 5,
    totalFee: 22000,
    transactionId: 16,
    Transaction: {
      status: 'Verified',
    },
    createdAt: '2024-02-21 02:16:50.145',
  },
  {
    id: 17,
    listingId: 17,
    Listing: {
      title: 'Countryside Cottage',
      imageKey: '2.jpg',
      address: 'Cotswolds, England',
    },
    fromDate: '2024-02-22 02:16:50.145',
    toDate: '2024-03-16 02:16:50.145',
    guestCount: 4,
    totalFee: 24000,
    transactionId: 17,
    Transaction: {
      status: 'For Verification',
    },
    createdAt: '2024-02-22 02:16:50.145',
  },
  {
    id: 18,
    listingId: 18,
    Listing: {
      title: 'Historic Manor',
      imageKey: '3.jpg',
      address: 'Versailles, France',
    },
    fromDate: '2024-02-23 02:16:50.145',
    toDate: '2024-03-18 02:16:50.145',
    guestCount: 3,
    totalFee: 26000,
    transactionId: 18,
    Transaction: {
      status: 'Verified',
    },
    createdAt: '2024-02-23 02:16:50.145',
  },
  {
    id: 19,
    listingId: 19,
    Listing: {
      title: 'Rustic Farmhouse',
      imageKey: '4.jpg',
      address: 'Tuscany, Italy',
    },
    fromDate: '2024-02-24 02:16:50.145',
    toDate: '2024-03-20 02:16:50.145',
    guestCount: 5,
    totalFee: 28000,
    transactionId: 19,
    Transaction: {
      status: 'For Verification',
    },
    createdAt: '2024-02-24 02:16:50.145',
  },
  {
    id: 20,
    listingId: 20,
    Listing: {
      title: 'Luxury Penthouse',
      imageKey: '5.jpg',
      address: 'Dubai, UAE',
    },
    fromDate: '2024-02-25 02:16:50.145',
    toDate: '2024-03-22 02:16:50.145',
    guestCount: 2,
    totalFee: 20000,
    transactionId: 20,
    Transaction: {
      status: 'Verified',
    },
    createdAt: '2024-02-25 02:16:50.145',
  },
]

const response = new ResponseService()
export const paginatedBooking = async (req: Request, res: Response) => {
  const page = Number(req.query.page || 1)
  const rowsPerPage = 5
  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedBookings = bookings.slice(startIndex, endIndex)
  res.json(
    response.success({
      items: paginatedBookings,
      allItemCount: paginatedBookings.length,
    })
  )
}

import express from 'express'
import { getBookingsToreviews, getToReviewById } from './services/default'
import { paginatedBooking } from './services/paginatedBooking.ts'
import { getThisMonthEarnings } from './services/thisMonth'
import { getUpcomingEarnings } from './services/upcoming'
import { getPaidEarnings } from './services/paid'
import { getMonthYearEarnings } from './services/monthYear'
import { getThisMonthBookings } from './services/thisMonthBooking'
import { getPaidBookings } from './services/paidBooking'
import { getUpcomingBookings } from './services/upcomingBooking'
import { getMonthYearBookings } from './services/monthYearBooking'
import { getPaymentHistoryGraph } from './services/paymentHistoryGraph'
import { getPaymentHistoryTable } from './services/paymentHistoryTable'
import isOriginValid from '@/common/middleware/auth/isOriginValid'

const router = express.Router()

// DEFAULT
router.get('/to-review', isOriginValid, getBookingsToreviews)
router.get('/to-review/:id', isOriginValid, getToReviewById)
router.get('/paginated', paginatedBooking)

//eranings
router.get(
  '/earnings/this-month',
  isOriginValid,
  getThisMonthEarnings
)
router.get(
  '/earnings/this-month/bookings',
  isOriginValid,
  getThisMonthBookings
)
router.get(
  '/earnings/upcoming',
  isOriginValid,
  getUpcomingEarnings
)
router.get(
  '/earnings/upcoming/bookings',
  isOriginValid,
  getUpcomingBookings
)
router.get('/earnings/paid', isOriginValid, getPaidEarnings)
router.get(
  '/earnings/paid/bookings',
  isOriginValid,
  getPaidBookings
)
router.get(
  '/earnings/:monthYear',
  isOriginValid,
  getMonthYearEarnings
)
router.get(
  '/earnings/:monthYear/bookings',
  isOriginValid,
  getMonthYearBookings
)

//payment history
router.get(
  '/payment-history/:date',
  isOriginValid,
  getPaymentHistoryGraph
)
router.get(
  '/payment-history/:date/bookings',
  isOriginValid,
  getPaymentHistoryTable
)
export default router

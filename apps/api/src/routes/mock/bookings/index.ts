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
import isUserLoggedIn2 from '@/common/middleware/auth/isUserLoggedIn2'
import isOriginValid from '@/common/middleware/auth/isOriginValid'

const router = express.Router()

// DEFAULT
router.get('/to-review', isUserLoggedIn2, isOriginValid, getBookingsToreviews)
router.get('/to-review/:id', isUserLoggedIn2, isOriginValid, getToReviewById)
router.get('/paginated', paginatedBooking)

//eranings
router.get(
  '/earnings/this-month',
  isUserLoggedIn2,
  isOriginValid,
  getThisMonthEarnings
)
router.get(
  '/earnings/this-month/bookings',
  isUserLoggedIn2,
  isOriginValid,
  getThisMonthBookings
)
router.get(
  '/earnings/upcoming',
  isUserLoggedIn2,
  isOriginValid,
  getUpcomingEarnings
)
router.get(
  '/earnings/upcoming/bookings',
  isUserLoggedIn2,
  isOriginValid,
  getUpcomingBookings
)
router.get('/earnings/paid', isUserLoggedIn2, isOriginValid, getPaidEarnings)
router.get(
  '/earnings/paid/bookings',
  isUserLoggedIn2,
  isOriginValid,
  getPaidBookings
)
router.get(
  '/earnings/:monthYear',
  isUserLoggedIn2,
  isOriginValid,
  getMonthYearEarnings
)
router.get(
  '/earnings/:monthYear/bookings',
  isUserLoggedIn2,
  isOriginValid,
  getMonthYearBookings
)

//payment history
router.get(
  '/payment-history/:date',
  isUserLoggedIn2,
  isOriginValid,
  getPaymentHistoryGraph
)
router.get(
  '/payment-history/:date/bookings',
  isUserLoggedIn2,
  isOriginValid,
  getPaymentHistoryTable
)
export default router

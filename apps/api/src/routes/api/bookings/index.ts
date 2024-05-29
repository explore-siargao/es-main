import express from 'express'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn2'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid2'
import {
  getBookings,
  addBooking,
  updateBooking,
  deleteBooking,
  getBookingByHost,
} from './services/default'

const router = express.Router()

router.get('/', isOriginValid, isUserLoggedIn, getBookings)
router.get('/:hostId', isOriginValid, isUserLoggedIn, getBookingByHost)
router.post('/', isOriginValid, isCsrfTokenValid, isUserLoggedIn, addBooking)
router.patch(
  '/:id',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  updateBooking
)
router.delete(
  '/:id',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  deleteBooking
)

export default router

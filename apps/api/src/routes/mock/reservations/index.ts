import express from 'express'
import {
  addReservation,
  deleteReservation,
  getReservationsByGuest,
  getReservationsByHost,
  getReservationsById,
  updateReservation,
} from './service/default'
import isUserLoggedIn2 from '@/common/middleware/auth/isUserLoggedIn2'
import isCsrfTokenValid2 from '@/common/middleware/auth/isCsrfTokenValid2'
import isUserReservationOwner from './middlewares/isUserReservationOwner'

const router = express.Router()

// DEFAULT
router.get(
  '/guest/:guestId',
  isUserLoggedIn2,
  isCsrfTokenValid2,
  getReservationsByGuest
)
router.get('/host', isUserLoggedIn2, isCsrfTokenValid2, getReservationsByHost)
router.get(
  '/:reservationId',
  isUserLoggedIn2,
  isCsrfTokenValid2,
  getReservationsById
)
router.post('/:userId', isUserLoggedIn2, isCsrfTokenValid2, addReservation)
router.patch(
  '/:reservationId',
  isUserLoggedIn2,
  isCsrfTokenValid2,
  isUserReservationOwner,
  updateReservation
)
router.delete(
  '/:reservationId',
  isUserLoggedIn2,
  isCsrfTokenValid2,
  isUserReservationOwner,
  deleteReservation
)

export default router

import express from 'express'
import {
  addReservation,
  deleteReservation,
  getReservationsByGuest,
  getReservationsByHost,
  getReservationsById,
  updateReservation,
} from './service/default'
import isCsrfTokenValid2 from '@/common/middleware/auth/isCsrfTokenValid2'
import isUserReservationOwner from './middlewares/isUserReservationOwner'

const router = express.Router()

// DEFAULT
router.get(
  '/guest/:guestId',
  isCsrfTokenValid2,
  getReservationsByGuest
)
router.get('/host', isCsrfTokenValid2, getReservationsByHost)
router.get(
  '/:reservationId',
  isCsrfTokenValid2,
  getReservationsById
)
router.post('/:userId', isCsrfTokenValid2, addReservation)
router.patch(
  '/:reservationId',
  isCsrfTokenValid2,
  isUserReservationOwner,
  updateReservation
)
router.delete(
  '/:reservationId',
  isCsrfTokenValid2,
  isUserReservationOwner,
  deleteReservation
)

export default router

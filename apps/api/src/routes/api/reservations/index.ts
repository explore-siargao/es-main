import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import express from 'express'
import {
  addRentalReservation,
  cancelRentalReservationByHost,
  editRentalReservation,
} from './services/rentalReservation'
import {
  addUnitReservation,
  cancelUnitReservationByHost,
  editUnitReservation,
} from './services/unitsReservation'
import {
  addJoinerActivityReservation,
  addPrivateActivityReservation,
} from './services/activityReservation'

const router = express.Router()

//add reservation
router.post(
  '/rental',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  addRentalReservation
)

router.post(
  '/unit',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  addUnitReservation
)

router.post(
  '/activity',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  addPrivateActivityReservation
)

router.post(
  '/activity/joiner',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  addJoinerActivityReservation
)

//edit reservations
router.patch(
  '/:reservationId/rental',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editRentalReservation
)

router.patch(
  '/:reservationId/unit',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editUnitReservation
)

//reservation cancellations
router.patch(
  '/rental/:reservationId/cancel-reservation',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  cancelRentalReservationByHost
)

router.patch(
  '/property/:reservationId/cancel-reservation',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  cancelUnitReservationByHost
)
export default router

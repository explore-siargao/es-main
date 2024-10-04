import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import express from 'express'
import {
  addRentalReservation,
  editRentalReservation,
} from './services/rentalReservation'
import {
  addUnitReservation,
  editUnitReservation,
} from './services/unitsReservation'
import { addActivityReservation } from './services/activityReservation'

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
  addActivityReservation
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

export default router

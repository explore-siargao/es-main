import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import express from 'express'
import {
  addRentalReservation,
  editRentalReservation,
} from './services/rentalReservation'
import { addUnitReservation } from './services/unitsReservation'

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

//edit reservations
router.patch(
  '/:reservationId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editRentalReservation
)

export default router

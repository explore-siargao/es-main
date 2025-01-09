import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn'
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
  cancelActivityReservation,
  editJoinerActivityReservation,
  editPrivateActivityReservation,
} from './services/activityReservation'
import paginate from '@/common/middleware/paginations/paginate'
import {
  getAllReservations,
  updateReservationStatusByReferenceId,
} from './services/default'
import {
  cardMultipleCheckout,
  gcashMultipleCheckout,
  manualCardMultipleCheckout,
} from './services/cart-reservations'
import {
  gcashPayment,
  linkedCardPayment,
  manualCardPayment,
} from './services/for-payment-reservation'
import { guestGroupReservations } from './services/guest-reservations'

const router = express.Router()

router.get(
  '/',
  isOriginValid,
  isUserLoggedIn,
  paginate(15),
  isCsrfTokenValid,
  getAllReservations
)

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
  '/activity/private',
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

router.patch(
  '/:reservationId/private-activity',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editPrivateActivityReservation
)

router.patch(
  '/:reservationId/joiner-activity',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editJoinerActivityReservation
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

router.patch(
  '/activity/:reservationId/cancel-reservation',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  cancelActivityReservation
)

router.patch(
  '/status/:referenceId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  updateReservationStatusByReferenceId
)

router.post(
  '/cart/checkout/gcash',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  gcashMultipleCheckout
)

router.post(
  '/cart/checkout/card',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  cardMultipleCheckout
)

router.post(
  '/cart/checkout/manual-card',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  manualCardMultipleCheckout
)

router.post(
  '/checkout/gcash',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  gcashPayment
)

router.post(
  '/checkout/manual-card',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  manualCardPayment
)

router.post(
  '/checkout/card',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  linkedCardPayment
)

router.get('/lists',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  paginate(15),
  guestGroupReservations
)

export default router

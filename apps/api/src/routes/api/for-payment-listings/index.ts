import express from 'express'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import {
  bookListing,
  getBookListing,
  updateForPayment,
} from './services/default'

const router = express.Router()

router.post('/', isOriginValid, isUserLoggedIn, isCsrfTokenValid, bookListing)
router.patch(
  '/:forPaymentId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  updateForPayment
)
router.get(
  '/:forPaymentId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getBookListing
)

export default router

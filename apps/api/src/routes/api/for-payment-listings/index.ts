import express from 'express'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import { bookListing, updateForPayment } from './services/default'

const router = express.Router()

router.post('/', isOriginValid, isUserLoggedIn, isCsrfTokenValid, bookListing)
router.patch(
  '/:forPaymentId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  updateForPayment
)

export default router

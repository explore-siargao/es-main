import express from 'express'
import { ResponseService } from '@/common/service/response'
import {
  addPaymentMethod,
  removePaymentMethod,
  getPaymentMethods,
  updatePaymentMethod,
} from './services/paymentMethods'

import { getUsedCoupons, addCoupon, updateCoupon } from './services/coupons'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'

const router = express.Router()

//payment method
router.post('/:userId/payment-method', addPaymentMethod)
router.patch('/:userId/payment-method/:paymentMethodId', updatePaymentMethod)
router.delete('/:userId/payment-method/:paymentMethodId', removePaymentMethod)

router.get(
  '/:userId/payment-method',
  isOriginValid,
  isUserLoggedIn,
  getPaymentMethods
)

//coupons
router.get('/:userId/coupon', isOriginValid, isUserLoggedIn, getUsedCoupons)

router.post(
  '/:userId/coupon',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  addCoupon
)

router.patch(
  '/:userId/coupon',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  updateCoupon
)

export default router

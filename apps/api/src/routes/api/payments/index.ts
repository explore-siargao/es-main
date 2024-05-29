import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn2'
import express from 'express'
import {
  addPaymentMethod,
  getPaymentMethods,
  removePaymentMethod,
  updatePaymentMethod,
} from './service/paymentMethod'
import { addCoupon, getUsedCoupons, updateCoupon } from './service/coupons'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid2'
import isOriginValid from '@/common/middleware/auth/isOriginValid'

const router = express.Router()
//payment method
router.post(
  '/:userId/payment-method',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  addPaymentMethod
)
router.get(
  '/:userId/payment-method',
  isOriginValid,
  isUserLoggedIn,
  getPaymentMethods
)
router.patch(
  '/:userId/payment-method/:paymentMethodId',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  updatePaymentMethod
)
router.delete(
  '/:userId/payment-method/:paymentMethodId',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  removePaymentMethod
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
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  updateCoupon
)

export default router

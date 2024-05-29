import express from 'express'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn2'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid2'
import {
  cardSingleUse,
  cardCreatePayment,
  cardInitiatePayment,
  gcashCreatePayment,
  getPaymentRequest,
  getPaymentMethod,
} from './services/default'

const router = express.Router()

router.get('/payment-request', getPaymentRequest)
router.get('/payment-method', getPaymentMethod)
router.post('/card-single-use', cardSingleUse)
router.post('/card-create-payment', cardCreatePayment)
router.post('/card-initiate-payment', cardInitiatePayment)
router.post('/gcash-create-payment', gcashCreatePayment)

export default router

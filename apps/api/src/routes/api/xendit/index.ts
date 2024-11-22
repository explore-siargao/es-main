import express from 'express'
import {
  cardSingleUse,
  cardCreatePayment,
  cardInitiatePayment,
  gcashCreatePayment,
  getPaymentRequest,
  getPaymentMethod,
  cardPayment,
} from './services/default'

const router = express.Router()

router.get('/payment-request', getPaymentRequest)
router.get('/payment-method', getPaymentMethod)
router.post('/card-single-use', cardSingleUse)
router.post('/card-create-payment', cardCreatePayment)
router.post('/card-initiate-payment', cardInitiatePayment)
router.post('/gcash-create-payment', gcashCreatePayment)
router.post('/card-payment', cardPayment)

export default router

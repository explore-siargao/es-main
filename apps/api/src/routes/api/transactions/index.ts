import express from 'express'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn2'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid2'
import { getTransaction, updateTransaction } from './services/default'

const router = express.Router()

router.get('/', isOriginValid, isUserLoggedIn, getTransaction)
router.patch(
  '/:bookingId',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  updateTransaction
)

export default router

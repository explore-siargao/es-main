import express from 'express'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import {
  addToCart,
  getAllReservationOrCarts,
  removeToCart,
} from './services/default'
import paginate from '@/common/middleware/paginations/paginate'

const router = express.Router()

router.get(
  '/',
  isOriginValid,
  isUserLoggedIn,
  paginate(15),
  isCsrfTokenValid,
  getAllReservationOrCarts
)
router.post('/', isOriginValid, isUserLoggedIn, isCsrfTokenValid, addToCart)
router.delete(
  '/:cartId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  removeToCart
)

export default router

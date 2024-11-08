import express from 'express'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import {
  addToCart,
  getAllCarts,
  removeToCart,
  updateCartInfo,
} from './services/default'
import paginate from '@/common/middleware/paginations/paginate'
import { removeMultipleItemsOnCarts } from './services/multiple-items'

const router = express.Router()

router.get(
  '/',
  isOriginValid,
  isUserLoggedIn,
  paginate(15),
  isCsrfTokenValid,
  getAllCarts
)
router.post('/', isOriginValid, isUserLoggedIn, isCsrfTokenValid, addToCart)
router.delete(
  '/remove-multiple',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  removeMultipleItemsOnCarts
)
router.delete(
  '/:cartId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  removeToCart
)

router.patch(
  '/:cartId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  updateCartInfo
)

export default router

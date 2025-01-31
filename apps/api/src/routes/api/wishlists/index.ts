import express from 'express'

import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn'
import { addToWishList, getAllWishList, getAllWishlistbyCategory } from './services/default'

const router = express.Router()

router.post(
  '/:category',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  addToWishList
)

router.get(
  '/:category',
  isOriginValid,
  isUserLoggedIn,
  getAllWishList
)

export default router

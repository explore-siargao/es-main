import express from 'express'
import {
  addCart,
  deleteCart,
  getCartsByHost,
  getCartsByListing,
  getCartsByUser,
  updateCart,
} from './default'
import isUserLoggedIn2 from '@/common/middleware/auth/isUserLoggedIn2'
import isCsrfTokenValid2 from '@/common/middleware/auth/isCsrfTokenValid2'

const router = express.Router()

// DEFAULT
router.get('/user', isUserLoggedIn2, isCsrfTokenValid2, getCartsByUser)
router.get('/host', isUserLoggedIn2, isCsrfTokenValid2, getCartsByHost)
router.get('/listing/:listingId', getCartsByListing)
router.post('/', isUserLoggedIn2, isCsrfTokenValid2, addCart)
router.patch('/:cartId', isUserLoggedIn2, isCsrfTokenValid2, updateCart)
router.delete('/', isUserLoggedIn2, isCsrfTokenValid2, deleteCart)

export default router

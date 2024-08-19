import express from 'express'
import {
  addCart,
  deleteCart,
  getCartsByHost,
  getCartsByListing,
  getCartsByUser,
  updateCart,
} from './default'
import isCsrfTokenValid2 from '@/common/middleware/auth/isCsrfTokenValid2'

const router = express.Router()

// DEFAULT
router.get('/user', isCsrfTokenValid2, getCartsByUser)
router.get('/host', isCsrfTokenValid2, getCartsByHost)
router.get('/listing/:listingId', getCartsByListing)
router.post('/', isCsrfTokenValid2, addCart)
router.patch('/:cartId', isCsrfTokenValid2, updateCart)
router.delete('/', isCsrfTokenValid2, deleteCart)

export default router

import express from 'express'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import { addToCart } from './services/default'

const router = express.Router()

router.post('/', isOriginValid, isUserLoggedIn, isCsrfTokenValid, addToCart)

export default router

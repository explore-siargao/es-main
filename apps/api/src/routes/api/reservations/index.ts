import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import express from 'express'
import { addRentalReservation } from './services/rentalReservation'

const router = express.Router()

//add reservation
router.post(
    '/rental',
    isOriginValid,
    isUserLoggedIn,
    isCsrfTokenValid,
    addRentalReservation
)


export default router

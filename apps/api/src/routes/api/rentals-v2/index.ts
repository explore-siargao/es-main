import isOriginValid from '@/common/middleware/auth/isOriginValid'
import express from 'express'
import {
  getAllRentals,
  addRental,
  getRentalDetails,
  getRental,
  deleteRental,
  getAllRentalsByHostId,
} from './services/default'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import { getRentalBasicInfo, updateRentalBasicInfo } from './services/basicInfo'
import { updateRentalDetails } from './services/details'
import isHostRentalOwner from '@/routes/mock/rentals/middleware/isHostRentalOwner'

const router = express.Router()

//Rentals
router.get('/', isOriginValid, isUserLoggedIn, getAllRentals)

router.get('/host', isOriginValid, isUserLoggedIn, getAllRentalsByHostId)

router.post('/', isUserLoggedIn, isCsrfTokenValid, addRental)

//rental details
router.get('/:rentalId', isOriginValid, isUserLoggedIn, getRental)

router.get(
  '/:rentalId/details',
  isOriginValid,
  isUserLoggedIn,
  getRentalDetails
)

router.get(
  '/:rentalId/details',
  isOriginValid,
  isUserLoggedIn,
  getRentalDetails
)

router.patch(
  '/:rentalId/details',
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateRentalDetails
)

router.patch(
  '/:rentalId/basic-info',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostRentalOwner,
  updateRentalBasicInfo
)

router.delete(
  '/:rentalId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  deleteRental
)

router.get(
  '/:rentalId/basic-info',
  isOriginValid,
  isUserLoggedIn,
  getRentalBasicInfo
)
export default router

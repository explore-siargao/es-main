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
import { getRentalRates, updateRentalRate } from './services/rates'
import { deleteRentalPhotosByPhotoId, editPhotoInfo, getRentalPhotos, updateRentalPhotos } from './services/photos'

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

router.patch(
  '/:rentalId/pricing',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  updateRentalRate
)

router.get(
  '/:rentalId/basic-info',
  isOriginValid,
  isUserLoggedIn,
  getRentalBasicInfo
)
//rates
router.get('/:rentalId/pricing', isOriginValid, isUserLoggedIn, getRentalRates)

//photos
router.get(
  '/:rentalId/photos',
  isOriginValid,
  isUserLoggedIn,
  //isHostRentalOwner,
  getRentalPhotos
)

router.patch(
  '/:rentalId/photos',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
 // isHostRentalOwner,
  updateRentalPhotos
)

router.patch(
  '/:rentalId/photos/:photoId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  //isHostRentalOwner,
  editPhotoInfo
)

router.delete(
  '/:rentalId/photos/:photoId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  // isHostRentalOwner,
  deleteRentalPhotosByPhotoId
)

export default router

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
import { getRentalRates, updateRentalRate } from './services/rates'
import {
  deleteRentalPhotosByPhotoId,
  editPhotoInfo,
  getRentalPhotos,
  updateRentalPhotos,
} from './services/photos'
import { getAddOns, updateAddOns } from './services/addOns'
import {
  getFinishedSections,
  updateFinishedSections,
} from './services/finishedSections'
import { getRentalLocation, updateRentalLocation } from './services/locations'
import { updateStatus } from './services/status'
import isHostRentalOwner from '@/routes/mock/rentals/middleware/isHostRentalOwner2'

const router = express.Router()

//Rentals
router.get('/', isOriginValid, isUserLoggedIn, getAllRentals)

router.get(
  '/host',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getAllRentalsByHostId
)

router.post('/', isUserLoggedIn, isCsrfTokenValid, isHostRentalOwner, addRental)

//rental details
router.get(
  '/:rentalId',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getRental
)

router.get(
  '/:rentalId/details',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getRentalDetails
)

router.get(
  '/:rentalId/details',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
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
  isHostRentalOwner,
  updateRentalRate
)

router.get(
  '/:rentalId/basic-info',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getRentalBasicInfo
)
//rates
router.get('/:rentalId/pricing', isOriginValid, isUserLoggedIn, getRentalRates)

//photos
router.get('/:rentalId/photos', isOriginValid, isUserLoggedIn, getRentalPhotos)

router.patch(
  '/:rentalId/photos',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateRentalPhotos
)

router.patch(
  '/:rentalId/photos/:photoId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  editPhotoInfo
)

router.delete(
  '/:rentalId/photos/:photoId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  deleteRentalPhotosByPhotoId
)

//locations
router.get(
  '/:rentalId/location',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getRentalLocation
)

router.patch(
  '/:rentalId/location',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateRentalLocation
)

//add-ons
router.get('/:rentalId/add-ons', isOriginValid, isUserLoggedIn, getAddOns)
router.patch(
  '/:rentalId/add-ons',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  // isHostRentalOwner,
  updateAddOns
)

router.get(
  '/:rentalId/add-ons',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getAddOns
)

//finishedSection
router.get(
  '/:rentalId/finished-sections',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getFinishedSections
)

router.patch(
  '/:rentalId/finished-sections',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateFinishedSections
)

//status
router.patch(
  '/:rentalId/status',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateStatus
)

export default router

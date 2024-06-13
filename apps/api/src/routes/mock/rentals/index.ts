import express from 'express'
import {
  addRental,
  deleteRentalPhotosByPhotoId,
  deleteRentals,
  editPhotoInfo,
  getAllRentalsByHostId,
  getRental,
  getAllRentals,
} from './service/default'

import { getRentalDetails, updateRentalDetails } from './service/details'
import { getRentalRates, updateRentalRate } from './service/rates'
import {
  getFinishedSections,
  updateFinishedSections,
} from './service/finishedSections'

import { getAddOns, updateAddOns } from './service/addOns'
import { getRentalLocation, updateRentalLocation } from './service/locations'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn2'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid2'
import { getRentalBasicInfo, updateRentalBasicInfo } from './service/basicInfo'
import isHostRentalOwner from './middleware/isHostRentalOwner'
import { getRentalPhotos, updateRentalPhotos } from './service/photos'
import { updateStatus } from './service/status'

const router = express.Router()
//rentals
router.get('/', isOriginValid, isUserLoggedIn, getAllRentals)
router.get(
  '/:rentalId',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getRental
)
router.delete(
  '/:rentalId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  deleteRentals
)

//rentals basic-info
router.get('/', isOriginValid, isUserLoggedIn, getAllRentalsByHostId)
router.post('/', isUserLoggedIn, isCsrfTokenValid, addRental)
router.get('/:rentalId', isOriginValid, isUserLoggedIn, getRental)
router.get(
  '/:rentalId/basic-info',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getRentalBasicInfo
)
router.patch(
  '/:rentalId/basic-info',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostRentalOwner,
  updateRentalBasicInfo
)

//rentai details
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
//rates
router.get(
  '/:rentalId/pricing',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getRentalRates
)
router.patch(
  '/:rentalId/pricing',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  updateRentalRate
)

//photos
router.get(
  '/:rentalId/photos',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getRentalPhotos
)
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
router.get(
  '/:rentalId/add-ons',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getAddOns
)
router.patch(
  '/:rentalId/add-ons',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateAddOns
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

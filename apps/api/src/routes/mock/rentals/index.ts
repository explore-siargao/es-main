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
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid2'
import { getRentalBasicInfo, updateRentalBasicInfo } from './service/basicInfo'
import isHostRentalOwner from './middleware/isHostRentalOwner'
import { getRentalPhotos, updateRentalPhotos } from './service/photos'
import { updateStatus } from './service/status'

const router = express.Router()
//rentals
router.get('/', isOriginValid, getAllRentals)
router.get('/:rentalId', isOriginValid, isHostRentalOwner, getRental)
router.delete(
  '/:rentalId',
  isOriginValid,
  isCsrfTokenValid,
  isHostRentalOwner,
  deleteRentals
)

//rentals basic-info
router.get('/', isOriginValid, getAllRentalsByHostId)
router.post('/', isCsrfTokenValid, addRental)
router.get('/:rentalId', isOriginValid, getRental)
router.get(
  '/:rentalId/basic-info',
  isOriginValid,
  isHostRentalOwner,
  getRentalBasicInfo
)
router.patch(
  '/:rentalId/basic-info',
  isOriginValid,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateRentalBasicInfo
)

//rentai details
router.get(
  '/:rentalId/details',
  isOriginValid,
  isHostRentalOwner,
  getRentalDetails
)
router.patch(
  '/:rentalId/details',
  isCsrfTokenValid,
  isHostRentalOwner,
  updateRentalDetails
)
//rates
router.get(
  '/:rentalId/pricing',
  isOriginValid,
  isHostRentalOwner,
  getRentalRates
)
router.patch(
  '/:rentalId/pricing',
  isOriginValid,
  isCsrfTokenValid,
  updateRentalRate
)

//photos
router.get(
  '/:rentalId/photos',
  isOriginValid,
  isHostRentalOwner,
  getRentalPhotos
)
router.patch(
  '/:rentalId/photos',
  isOriginValid,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateRentalPhotos
)
router.patch(
  '/:rentalId/photos/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isHostRentalOwner,
  editPhotoInfo
)
router.delete(
  '/:rentalId/photos/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isHostRentalOwner,
  deleteRentalPhotosByPhotoId
)

//locations
router.get(
  '/:rentalId/location',
  isOriginValid,
  isHostRentalOwner,
  getRentalLocation
)
router.patch(
  '/:rentalId/location',
  isOriginValid,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateRentalLocation
)

//add-ons
router.get('/:rentalId/add-ons', isOriginValid, isHostRentalOwner, getAddOns)
router.patch(
  '/:rentalId/add-ons',
  isOriginValid,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateAddOns
)

//finishedSection
router.get(
  '/:rentalId/finished-sections',
  isOriginValid,
  isHostRentalOwner,
  getFinishedSections
)
router.patch(
  '/:rentalId/finished-sections',
  isOriginValid,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateFinishedSections
)

//status
router.patch(
  '/:rentalId/status',
  isOriginValid,
  isCsrfTokenValid,
  isHostRentalOwner,
  updateStatus
)

export default router

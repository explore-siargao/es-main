import isOriginValid from '@/common/middleware/auth/isOriginValid'
import express from 'express'
import {
  getAllRentals,
  addRental,
  getRentalDetails,
  getRental,
  deleteRental,
  getAllRentalsByHostId,
  getRentalCounts,
  getRentalByIdPublic,
} from './services/default'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import { getRentalBasicInfo, updateRentalBasicInfo } from './services/basicInfo'
import { updateRentalDetails } from './services/details'
import { getRentalRates, updateRentalRate } from './services/rates'
import {
  addPhoto,
  deletePhoto,
  getPhotosByRentalId,
  updatePhoto,
} from './services/photos'
import { getAddOns, updateAddOns } from './services/addOns'
import {
  getFinishedSections,
  updateFinishedSections,
} from './services/finishedSections'
import { getRentalLocation, updateRentalLocation } from './services/locations'
import { updateStatus } from './services/status'
import isHostRentalOwner from '@/routes/mock/rentals/middleware/isHostRentalOwner2'
import {
  addRentalPricePerDates,
  editChildName,
  editRentalNote,
  getBikeCalendar,
  getCarCalendar,
  getMotorcycleCalendar,
} from './services/calendar'
import { getRentalIds, getRentalsByHostAndCategory } from './services/rentals'
import { getFilteredRentals } from './services/filtered'
import paginate from '@/common/middleware/paginations/paginate'

const router = express.Router()

//filtered data
router.get(
  '/filter',
  isOriginValid,
  isCsrfTokenValid,
  paginate(15),
  getFilteredRentals
)

//Rentals
router.patch(
  '/update-vehicle',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editChildName
)

router.get('/', isOriginValid, isUserLoggedIn, getAllRentals)

router.get(
  '/host',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getAllRentalsByHostId
)

router.post('/', isUserLoggedIn, isCsrfTokenValid, addRental)

//rental details
router.get(
  '/:rentalId',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getRental
)

router.get('/public/:rentalId', isOriginValid, getRentalByIdPublic)

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
router.get(
  '/:rentalId/photos',
  isOriginValid,
  isUserLoggedIn,
  isHostRentalOwner,
  getPhotosByRentalId
)
router.patch(
  '/:rentalId/photo/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  updatePhoto
)
router.post(
  '/:rentalId/photo',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostRentalOwner,
  addPhoto
)
router.delete(
  '/:rentalId/photo/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  deletePhoto
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
  isHostRentalOwner,
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

//calendars
router.get(
  '/calendar/bike',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getBikeCalendar
)

router.get(
  '/calendar/motor',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getMotorcycleCalendar
)

router.get(
  '/calendar/car',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getCarCalendar
)

router.patch(
  '/:rentalId/price-per-dates',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostRentalOwner,
  addRentalPricePerDates
)

//rental counts
router.get(
  '/counts/all',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getRentalCounts
)

// rentals
router.get(
  '/:category/list',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getRentalsByHostAndCategory
)

router.get(
  '/:rentalId/ids',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getRentalIds
)

router.patch(
  '/update-note',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  editRentalNote
)

export default router

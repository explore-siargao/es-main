import express from 'express'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isHostPropertyOwner from './middlewares/isHostPropertyOwner'
import {
  addPhoto,
  addUnitPhoto,
  deletePhoto,
  getPhotosByBookableUnitId,
  getPhotosByPropertyId,
  updatePhoto,
} from './services/photos'

import {
  getPropertiesByHostId,
  getPropertyById,
  addProperty,
  deleteProperty,
  getPropertyType,
  updatePropertyType,
  getPropertyInfo,
  getPropertyLocation,
  updatePropertyLocation,
  updatePropertyBasicInfo,
  updateWholePlaceType,
  getPropertyByIdPublic,
} from './services/default'
import { addPropertyType } from './services/propertyType'
import {
  getPropertyFacilities,
  updatePropertyFacilities,
} from './services/facilities'
import { updateStatus } from './services/status'
import {
  getFinishedSections,
  updateFinishedSections,
} from './services/finishedSections'
import {
  addBedUnit,
  addRoomUnit,
  addWholePlaceUnit,
  getPropertiesBookableUnits,
  getUnitById,
  getUnitIds,
  updateBedUnitBasicInfo,
  updateRoomUnitBasicInfo,
  updateWholePlaceUnitBasicInfo,
} from './services/units'
import {
  updatePolicyByProperty,
  getPoliciesByProperty,
} from './services/policies'
import {
  getAmenitiesByBookableUnitTypeId,
  updateBookableUnitTypeAmenities,
} from './services/amenities'
import { getUnitPrice, updateUnitPrice } from './services/unitPrice'
import {
  addUnitPricePerDates,
  editUnitChildName,
  editUnitNote,
  getPropertyCalendar,
} from './services/calendar'
import { getBookableUnitsByLocationAndTypes } from './services/filtered'
import paginate from '@/common/middleware/paginations/paginate'

const router = express.Router()

//property
router.post('/', isOriginValid, isCsrfTokenValid, isUserLoggedIn, addProperty)
router.get('/', isOriginValid, isUserLoggedIn, getPropertiesByHostId)
router.get('/public/:propertyId', isOriginValid, getPropertyByIdPublic)

router.get(
  '/unit/:location/:type',
  isOriginValid,
  isCsrfTokenValid,
  paginate(15),
  getBookableUnitsByLocationAndTypes
)

router.get(
  '/:propertyId',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPropertyById
)
router.delete(
  '/:propertyId',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostPropertyOwner,
  deleteProperty
)
//location
router.get(
  '/:propertyId/location',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPropertyLocation
)
router.patch(
  '/:propertyId/location',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePropertyLocation
)
//propertyType
router.post(
  '/add/property-type',
  isUserLoggedIn,
  isOriginValid,
  isCsrfTokenValid,
  addPropertyType
)

router.get(
  '/:propertyId/property-type',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPropertyType
)
router.patch(
  '/:propertyId/property-type',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePropertyType
)

router.patch(
  '/:propertyId/whole-place-type',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updateWholePlaceType
)

//basic info
router.get(
  '/:propertyId/basic-info',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPropertyInfo
)

router.patch(
  '/:propertyId/basic-info',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePropertyBasicInfo
)

//photos
router.get(
  '/:propertyId/photos',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPhotosByPropertyId
)
router.patch(
  '/:propertyId/photo/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePhoto
)
router.post(
  '/:propertyId/photo',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  addPhoto
)

router.post(
  '/:propertyId/:bookableUnitId/photo',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  addUnitPhoto
)

router.delete(
  '/:propertyId/photo/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  deletePhoto
)
router.get(
  '/:propertyId/photos/:bookableUnitId',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPhotosByBookableUnitId
)

//policies
router.patch(
  '/:propertyId/policies',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePolicyByProperty
)

//facilities
router.get(
  '/:propertyId/facilities',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPropertyFacilities
)

router.patch(
  '/:propertyId/facilities',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePropertyFacilities
)

//policies
router.get(
  '/:propertyId/policies',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPoliciesByProperty
)

//units
router.get('/unit/:unitId', isUserLoggedIn, isOriginValid, getUnitById)

router.post(
  '/:propertyId/units/whole-place',
  isUserLoggedIn,
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  addWholePlaceUnit
)

router.post(
  '/:propertyId/units/room',
  isUserLoggedIn,
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  addRoomUnit
)

router.post(
  '/:propertyId/units/bed',
  isUserLoggedIn,
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  addBedUnit
)

router.patch(
  '/:propertyId/:bookableUnitId/bed/basic-info',
  isUserLoggedIn,
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updateBedUnitBasicInfo
)

router.patch(
  '/:propertyId/:bookableUnitId/room/basic-info',
  isUserLoggedIn,
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updateRoomUnitBasicInfo
)

router.patch(
  '/:propertyId/:bookableUnitId/whole-place/basic-info',
  isUserLoggedIn,
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updateWholePlaceUnitBasicInfo
)

router.get(
  '/:propertyId/units/:category',
  isUserLoggedIn,
  isOriginValid,
  isHostPropertyOwner,
  getPropertiesBookableUnits
)

//finsish sections
router.get(
  '/:propertyId/finished-sections',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getFinishedSections
)

router.patch(
  '/:propertyId/finished-sections',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updateFinishedSections
)

//bookable amenities
router.patch(
  '/:propertyId/:bookableUnitTypeId/amenities',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  updateBookableUnitTypeAmenities
)
router.get(
  '/:propertyId/:bookableUnitTypeId/amenities',
  isUserLoggedIn,
  isOriginValid,
  isHostPropertyOwner,
  getAmenitiesByBookableUnitTypeId
)

//unitPrices
router.get(
  '/:propertyId/units/pricing/list',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getUnitPrice
)
router.patch(
  '/:propertyId/units/pricing',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updateUnitPrice
)

//status
router.patch(
  '/:propertyId/status',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updateStatus
)

//calendars
router.get(
  '/calendar/property',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getPropertyCalendar
)

router.get('/units/:unitId', isUserLoggedIn, isOriginValid, getUnitIds)

router.patch(
  '/update-units',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editUnitChildName
)

router.patch(
  '/:unitId/price-per-dates',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  addUnitPricePerDates
)

router.patch(
  '/unit/update-note',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editUnitNote
)

export default router

// <Typography variant="h4" fontWeight="semibold" className="mb-3">
// Amenities and Facilities (for the whole place itself)
// </Typography>
// <div className="grid grid-cols-2 gap-3 mb-3">
// <AmenitiesCheckboxes
//   title="Most Popular"
//   icon={<LucideSparkles className="h-4 w-4" />}
// />
// <AmenitiesCheckboxes
//   title="Bathroom"
//   icon={<LucideBath className="h-4 w-4" />}
// />
// <AmenitiesCheckboxes
//   title="Living Area"
//   icon={<LucideArmchair className="h-4 w-4" />}
// />
// <AmenitiesCheckboxes
//   title="Kitchen"
//   icon={<LucideCookingPot className="h-4 w-4" />}
// />
// <AmenitiesCheckboxes
//   title="General"
//   icon={<LucideLayoutList className="h-4 w-4" />}
// />
// <AmenitiesCheckboxes
//   title="Outdoors"
//   icon={<LucidePalmtree className="h-4 w-4" />}
// />
// </div>

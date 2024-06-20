import express from 'express'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isHostPropertyOwner from './middlewares/isHostPropertyOwner'
import {
  addPhoto,
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

const router = express.Router()

//property

router.post('/', isOriginValid, isCsrfTokenValid, isUserLoggedIn, addProperty)
router.get('/', isOriginValid, isUserLoggedIn, getPropertiesByHostId)
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
router.get(
  '/:propertyId/photos/:bookableUnitId',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPhotosByBookableUnitId
)
router.patch(
  '/photo/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
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
router.delete(
  '/photo/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  deletePhoto
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

export default router

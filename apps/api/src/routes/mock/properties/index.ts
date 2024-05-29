import express from 'express'
import {
  getPropertyById,
  addProperty,
  updatePropertyType,
  deleteProperty,
  getPropertiesByHostId,
  getPropertyInfo,
  getPropertyPhotos,
  updatePropertyBasicInfo,
  updatePropertyLocation,
  updatePropertyPhotos,
  getPropertiesBookableUnits,
  addWholePlaceUnit,
  addRoomUnit,
  addBedUnit,
  getPropertyType,
  getPropertyLocation,
} from './service/default'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn2'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid2'
import {
  addBookableUnitTypeAmenities,
  getAmenitiesByBookableUnitTypeId,
} from './service/amenities'
import {
  updatePropertyFacilities,
  getPropertyFacilities,
} from './service/facilties'
import {
  getPoliciesByProperty,
  updatePolicyByProperty,
} from './service/policies'
import { getUnitPrice, updateUnitPrice } from './service/unitPrice'
import { addPropertyType } from './service/propertyType'
import {
  getFinishedSections,
  updateFinishedSections,
} from './service/finishedSections'
import isHostPropertyOwner from './middleware/isHostPropertyOwner'
import { updateStatus } from './service/status'

const router = express.Router()
//properties
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

//propertyType
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
router.post(
  '/add/property-type',
  isOriginValid,
  isUserLoggedIn,
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  addPropertyType
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

//property facilities
router.patch(
  '/:propertyId/facilities',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePropertyFacilities
)
router.get(
  '/:propertyId/facilities',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPropertyFacilities
)

router.get('/', isOriginValid, isUserLoggedIn, getPropertiesByHostId)
router.get(
  '/:propertyId',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPropertyById
)
router.post('/', isOriginValid, isCsrfTokenValid, isUserLoggedIn, addProperty)
router.patch(
  '/:propertyId/property-type',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePropertyType
)
router.patch(
  '/:propertyId/basic-info',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePropertyBasicInfo
)
router.patch(
  '/:propertyId/location',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePropertyLocation
)
router.patch(
  '/:propertyId/facilities',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePropertyFacilities
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
router.get(
  '/:propertyId/:bookableUnitTypeId/amenities',
  isUserLoggedIn,
  isOriginValid,
  isHostPropertyOwner,
  getAmenitiesByBookableUnitTypeId
)
router.patch(
  '/:propertyId/:bookableUnitTypeId/amenities',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  addBookableUnitTypeAmenities
)
//photos
router.get(
  '/:propertyId/photos',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPropertyPhotos
)
router.patch(
  '/:propertyId/photos',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  updatePropertyPhotos
)

//pricing
router.get(
  '/:propertyId/units/:bookableUnitId/pricing',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getUnitPrice
)
router.patch(
  '/:propertyId/units/:bookableUnitId/pricing',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updateUnitPrice
)

//policies
router.get(
  '/:propertyId/policies',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPoliciesByProperty
)
router.patch(
  '/:propertyId/policies',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePolicyByProperty
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

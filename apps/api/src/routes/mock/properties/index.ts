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
router.post('/', isOriginValid, isCsrfTokenValid, addProperty)
router.get('/', isOriginValid, getPropertiesByHostId)
router.get('/:propertyId', isOriginValid, isHostPropertyOwner, getPropertyById)
router.delete(
  '/:propertyId',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  deleteProperty
)

//propertyType
router.get(
  '/:propertyId/property-type',
  isOriginValid,
  isHostPropertyOwner,
  getPropertyType
)
router.patch(
  '/:propertyId/property-type',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePropertyType
)
router.post(
  '/add/property-type',
  isOriginValid,
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  addPropertyType
)

//basic info
router.get(
  '/:propertyId/basic-info',
  isOriginValid,
  isHostPropertyOwner,
  getPropertyInfo
)
router.patch(
  '/:propertyId/basic-info',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePropertyBasicInfo
)

//location
router.get(
  '/:propertyId/location',
  isOriginValid,
  isHostPropertyOwner,
  getPropertyLocation
)
router.patch(
  '/:propertyId/location',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePropertyLocation
)

//property facilities
router.patch(
  '/:propertyId/facilities',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePropertyFacilities
)
router.get(
  '/:propertyId/facilities',
  isOriginValid,
  isHostPropertyOwner,
  getPropertyFacilities
)

router.get('/', isOriginValid, getPropertiesByHostId)
router.get('/:propertyId', isOriginValid, isHostPropertyOwner, getPropertyById)
router.post('/', isOriginValid, isCsrfTokenValid, addProperty)
router.patch(
  '/:propertyId/property-type',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePropertyType
)
router.patch(
  '/:propertyId/basic-info',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePropertyBasicInfo
)
router.patch(
  '/:propertyId/location',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePropertyLocation
)
router.patch(
  '/:propertyId/facilities',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePropertyFacilities
)

//units
router.post(
  '/:propertyId/units/whole-place',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  addWholePlaceUnit
)
router.post(
  '/:propertyId/units/room',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  addRoomUnit
)
router.post(
  '/:propertyId/units/bed',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  addBedUnit
)
router.get(
  '/:propertyId/units/:category',
  isOriginValid,
  isHostPropertyOwner,
  getPropertiesBookableUnits
)
router.get(
  '/:propertyId/:bookableUnitTypeId/amenities',
  isOriginValid,
  isHostPropertyOwner,
  getAmenitiesByBookableUnitTypeId
)
router.patch(
  '/:propertyId/:bookableUnitTypeId/amenities',
  isOriginValid,
  isCsrfTokenValid,
  addBookableUnitTypeAmenities
)
//photos
router.get(
  '/:propertyId/photos',
  isOriginValid,
  isHostPropertyOwner,
  getPropertyPhotos
)
router.patch(
  '/:propertyId/photos',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePropertyPhotos
)

//pricing
router.get(
  '/:propertyId/units/:bookableUnitId/pricing',
  isOriginValid,
  isHostPropertyOwner,
  getUnitPrice
)
router.patch(
  '/:propertyId/units/:bookableUnitId/pricing',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updateUnitPrice
)

//policies
router.get(
  '/:propertyId/policies',
  isOriginValid,
  isHostPropertyOwner,
  getPoliciesByProperty
)
router.patch(
  '/:propertyId/policies',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updatePolicyByProperty
)

//finsish sections
router.get(
  '/:propertyId/finished-sections',
  isOriginValid,
  isHostPropertyOwner,
  getFinishedSections
)
router.patch(
  '/:propertyId/finished-sections',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updateFinishedSections
)

//status
router.patch(
  '/:propertyId/status',
  isOriginValid,
  isCsrfTokenValid,
  isHostPropertyOwner,
  updateStatus
)

export default router

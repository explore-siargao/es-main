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
} from './services/default'

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

//basic info
router.get(
  '/:propertyId/basic-info',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPropertyInfo
)

//location
router.get(
  '/:propertyId/location',
  isOriginValid,
  isUserLoggedIn,
  isHostPropertyOwner,
  getPropertyLocation
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

export default router

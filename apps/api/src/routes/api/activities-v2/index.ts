import express from 'express'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import isHostActivityOwner from './middleware/isHostActivityOwner'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import {
  addActivity,
  getActivity,
  getAllActivitiesByHostId,
} from './services/default'
import { getActivities, updateActivities } from './services/basic-info'
import {
  getActivityInclusions,
  updateActivityInclusions,
} from './services/activity-inclussions'
import {
  getAdditionalInfo,
  updateAdditionalInfo,
} from './services/additionalInfo'
import { updateStatus } from './services/status'
import {
  getFinishedSections,
  updateFinishedSections,
} from './services/finishedSection'
import { addPhoto, deletePhoto, getPhotosByActivityId, updatePhoto } from './services/photos'

const router = express.Router()

//activity
router.get('/host', isOriginValid, isUserLoggedIn, getAllActivitiesByHostId)

router.post('/', isUserLoggedIn, isOriginValid, addActivity)

router.get(
  '/:activityId',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivity
)

// activity-inclusions
router.patch(
  '/:activityId/inclusions',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateActivityInclusions
)

router.get(
  '/:activityId/inclusions',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivityInclusions
)

//Additional info
router.patch(
  '/:activityId/additional-info',
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostActivityOwner,
  updateAdditionalInfo
)

router.get(
  '/:activityId/additional-info',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getAdditionalInfo
)

//Basic info
router.patch(
  '/:activityId/info',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateActivities
)

router.get(
  '/:activityId/info',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivities
)

//photos
router.get(
  '/:activityId/photos',
  isOriginValid,
  isUserLoggedIn,
  isHostActivityOwner,
  getPhotosByActivityId
)
router.patch(
  '/:activityId/photo/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  updatePhoto
)
router.post(
  '/:activityId/photo',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostActivityOwner,
  addPhoto
)
router.delete(
  '/:activityId/photo/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  deletePhoto
)

//status
router.patch(
  '/:activityId/status',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostActivityOwner,
  updateStatus
)

//finished sections
router.patch(
  '/:activityId/finished-sections',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostActivityOwner,
  updateFinishedSections
)

router.get(
  '/:activityId/finished-sections',
  isOriginValid,
  isUserLoggedIn,
  isHostActivityOwner,
  getFinishedSections
)

export default router

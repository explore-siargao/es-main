import express from 'express'
import { getActivities, updateActivities } from './service/basic-info'
import {
  getActivityInclusions,
  updateActivityInclusions,
} from './service/activity-inclusions'
import {
  addItineraries,
  deleteItinerary,
  getItineraries,
  updateItinerary,
} from './service/itineraries'

import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn2'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid2'
import isHostActivityOwner from './middleware/isHostActivityOwner'
import {
  getFinishedSections,
  updateFinishedSections,
} from './service/finishedSection'
import {
  getAdditionalInfo,
  updateAdditionalInfo,
} from './service/additionalInfo'
import { updateStatus } from './service/status'

const router = express.Router()

// activity-info
router.get(
  '/:activityId/info',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivities
)
router.patch(
  '/:activityId/info',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateActivities
)

// activity-inclusions
router.get(
  '/:activityId/inclusions',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivityInclusions
)
router.patch(
  '/:activityId/inclusions',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateActivityInclusions
)

// Itineraries
router.post(
  '/:activityId/itineraries',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  addItineraries
)

router.get(
  '/:activityId/itineraries',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getItineraries
)

router.patch(
  '/:activityId/itineraries',
  isUserLoggedIn,
  isOriginValid,
  isCsrfTokenValid,
  isHostActivityOwner,
  updateItinerary
)

router.delete(
  '/:activityId/itineraries/:itineraryId',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  deleteItinerary
)

//Additional info
router.get(
  '/:activityId/additional-info',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getAdditionalInfo
)

router.patch(
  '/:activityId/additional-info',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateAdditionalInfo
)

//finished sections
router.get(
  '/:activityId/finished-sections',
  isOriginValid,
  isUserLoggedIn,
  isHostActivityOwner,
  getFinishedSections
)
router.patch(
  '/:activityId/finished-sections',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostActivityOwner,
  updateFinishedSections
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

export default router

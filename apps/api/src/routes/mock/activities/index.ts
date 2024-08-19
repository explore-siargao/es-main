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
import { addActivity } from './service/default'

const router = express.Router()

// activity-info
router.get('/:activityId', isOriginValid, isHostActivityOwner, getActivities)
router.patch(
  '/:activityId/info',
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateActivities
)
router.post('/', isCsrfTokenValid, addActivity)

// activity-inclusions
router.get(
  '/:activityId/inclusions',
  isOriginValid,
  isHostActivityOwner,
  getActivityInclusions
)
router.patch(
  '/:activityId/inclusions',
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateActivityInclusions
)

// Itineraries
router.post(
  '/:activityId/itineraries',
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  addItineraries
)

router.get(
  '/:activityId/itineraries',

  isOriginValid,
  isHostActivityOwner,
  getItineraries
)

router.patch(
  '/:activityId/itineraries',

  isOriginValid,
  isCsrfTokenValid,
  isHostActivityOwner,
  updateItinerary
)

router.delete(
  '/:activityId/itineraries/:itineraryId',

  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  deleteItinerary
)

//Additional info
router.get(
  '/:activityId/additional-info',

  isOriginValid,
  isHostActivityOwner,
  getAdditionalInfo
)

router.patch(
  '/:activityId/additional-info',

  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateAdditionalInfo
)

//finished sections
router.get(
  '/:activityId/finished-sections',
  isOriginValid,

  isHostActivityOwner,
  getFinishedSections
)
router.patch(
  '/:activityId/finished-sections',
  isOriginValid,
  isCsrfTokenValid,

  isHostActivityOwner,
  updateFinishedSections
)

//status
router.patch(
  '/:activityId/status',
  isOriginValid,
  isCsrfTokenValid,

  isHostActivityOwner,
  updateStatus
)

export default router

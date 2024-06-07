import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import express from 'express'
import isHostActivityOwner from './middleware/isHostActivityOwner'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import { getActivities, updateActivities } from './services/basic-info'

import {
  getAdditionalInfo,
  updateAdditionalInfo,
} from './services/additionalInfo'

import {
  getActivityInclusions,
  updateActivityInclusions,
} from './services/activity-inclussions'
import { addActivity, getActivity } from './services/default'
import { updateStatus } from './services/status'
import {getFinishedSections, updateFinishedSections } from './services/finishedSections'

const router = express.Router()

// activity-inclusions
router.get(
  '/:activityId/inclusions',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivityInclusions
)

router.get(
  '/:activityId',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivity
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
  isHostActivityOwner,
  updateAdditionalInfo
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

router.patch(
  '/:activityId/inclusions',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateActivityInclusions
)

// activity-info
router.get(
  '/:activityId/info',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivities
)

//add
router.post('/', isUserLoggedIn, isOriginValid, addActivity)

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

export default router

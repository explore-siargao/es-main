import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import express from 'express'
import isHostActivityOwner from './middleware/isHostActivityOwner'
import { addActivity, getActivity } from './services/default'
import { getAdditionalInfo } from './services/addionalInfo'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import { updateActivities } from './services/basic-info'
import { getActivityInclusions } from './services/activity-inclussions'

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

//Basic info
router.patch(
  '/:activityId/info',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateActivities
)

//add
router.post('/', isUserLoggedIn, isOriginValid, addActivity)

export default router

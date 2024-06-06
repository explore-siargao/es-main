import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import express from 'express'
import isHostActivityOwner from './middleware/isHostActivityOwner'
import { addActivity, getActivity } from './services/default'
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

//add
router.post(
  '/',
  isUserLoggedIn,
  isOriginValid,
  addActivity
)

export default router

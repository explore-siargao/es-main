import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import express from 'express'
import isHostActivityOwner from './middleware/isHostActivityOwner'
import { getActivity } from './services/default'
import { getAdditionalInfo } from './services/addionalInfo'

const router = express.Router()

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

export default router

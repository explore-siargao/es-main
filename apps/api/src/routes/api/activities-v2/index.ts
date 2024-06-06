import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import express from 'express'
import isHostActivityOwner from './middleware/isHostActivityOwner'
import { getActivity } from './services/default'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import { updateAdditionalInfo } from './services/additionalInfo'

const router = express.Router()

router.get(
  '/:activityId',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivity
)

router.patch(
  '/:activityId/additional-info',
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostActivityOwner,
  updateAdditionalInfo
)

export default router

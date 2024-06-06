import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import express from 'express'
import isHostActivityOwner from './middleware/isHostActivityOwner'
import { getActivity } from './services/default'

const router = express.Router()

router.get(
  '/:activityId',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivity
)

export default router

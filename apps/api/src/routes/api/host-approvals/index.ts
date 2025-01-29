import express from 'express'
import { ResponseService } from '@/common/service/response'

import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn'
import {
  addHostApproval,
  getRequestByHost,
  updateHostApproval,
} from './services/default'

const router = express.Router()

router.post(
  '/',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  addHostApproval
)

router.get(
  '/',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getRequestByHost
)

router.patch(
  '/:id',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  updateHostApproval
)

export default router

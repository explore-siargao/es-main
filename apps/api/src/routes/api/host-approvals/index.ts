import express from 'express'
import { ResponseService } from '@/common/service/response'

import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn'
import {
  addHostApproval,
  approveRejectHostApproval,
  cancelHostApproval,
  getHostApprovalByAdmin,
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

router.get(
  '/admin',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getHostApprovalByAdmin
)

router.patch(
  '/:id',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  updateHostApproval
)

router.post(
  '/admin-approval/:id',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  approveRejectHostApproval
)

router.delete(
  '/:id',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  cancelHostApproval
)

export default router

import express from 'express'

import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import { addUpdateVat, getVat } from './services/default'

const router = express.Router()

router.post('/', isOriginValid, isCsrfTokenValid, isUserLoggedIn, addUpdateVat)

router.get('/:userId', isOriginValid, isUserLoggedIn, getVat)

export default router

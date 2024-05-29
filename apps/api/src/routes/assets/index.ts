import express from 'express'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import { getAsset } from './service/default'

const router = express.Router()

router.get('/:objKey', isOriginValid, getAsset)

export default router

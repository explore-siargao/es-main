import express from 'express'
import {
  addBookableUnit,
  getAllBookableUnitTypeByHost,
  getBookableUnitTypeByBookableUnitId,
  getPaginatedBookableUnitByPropertyId,
  updateBookableUnitByBookableUnitId,
} from './service/default'
import isUserLoggedIn2 from '@/common/middleware/auth/isUserLoggedIn2'
import isCsrfTokenValid2 from '@/common/middleware/auth/isCsrfTokenValid2'
import isOriginValid from '@/common/middleware/auth/isOriginValid'

const router = express.Router()

//Default
router.post('/:propertyId', addBookableUnit)
router.patch('/:bookableUnitId', updateBookableUnitByBookableUnitId)
router.get('/:bookableUnitId', getBookableUnitTypeByBookableUnitId)
router.get('/:propertyId/paginated', getPaginatedBookableUnitByPropertyId)
router.get(
  '/',
  isUserLoggedIn2,
  isCsrfTokenValid2,
  isOriginValid,
  getAllBookableUnitTypeByHost
)

export default router

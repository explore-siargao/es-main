import express from 'express'
import {
  addBookableUnitType,
  getBookableUnitTypeByHost,
  getBookableUnitTypeById,
  updateBookableUnitTypeById,
} from './service/default'

const router = express.Router()

// DEFAULT
router.get('/:id', getBookableUnitTypeById)
router.get('/host/:hostId', getBookableUnitTypeByHost)
router.post('/host/:hostId', addBookableUnitType)
router.patch('/host/:hostId/:id', updateBookableUnitTypeById)
export default router

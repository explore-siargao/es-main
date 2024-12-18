import express from 'express'
import { addTesting } from './default'

const router = express.Router()

router.post('/',addTesting)

export default router

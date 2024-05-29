import express from 'express'
import { getListingsByHost } from './service/listingsByHost'

const router = express.Router()

// DEFAULT
router.get('/hosted', getListingsByHost)

export default router

//listings by host

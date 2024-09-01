import express from 'express'
import {
  addReport,
  deleteReport,
  getAllReportListingByReportedBy,
  getReportsByListing,
  updateReport,
} from './services/reportListings'

import { getAllReports } from './services/reportListings'
const router = express.Router()

//reports listings
router.post('/:userId/listing', addReport)
router.get('/listing/from/:userId', getAllReportListingByReportedBy)
router.get('/listing/to/:listingId', getReportsByListing)
router.delete('/:userId/listing/:id', deleteReport)
router.patch('/:userId/listing/:id', updateReport)
router.get('/listing', getAllReports)

export default router

import express from 'express'
import {
  addReport,
  deleteReport,
  getAllReportListingByReportedBy,
  getAllReports,
  getReport,
  getReportsByListing,
  updateReport,
} from './services/reportListing'
const router = express.Router()

//reports
router.get('/listing', getAllReports)
router.get('/listing/to/:listingId', getReportsByListing)
router.get('/listing/from/:userId', getAllReportListingByReportedBy)
router.get('/listing/:id', getReport)
router.post('/:userId/listing', addReport)
router.patch('/:userId/listing/:id', updateReport)
router.delete('/:userId/listing/:id', deleteReport)

export default router

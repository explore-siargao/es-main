import express from 'express'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import isHostActivityOwner from './middleware/isHostActivityOwner'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import {
  addActivity,
  getActivity,
  getActivityCounts,
  getAllActivitiesByHostId,
  updateItinerary,
} from './services/default'
import { getActivities, updateActivities } from './services/basic-info'
import {
  getActivityInclusions,
  updateActivityInclusions,
} from './services/activity-inclussions'
import {
  getAdditionalInfo,
  updateAdditionalInfo,
} from './services/additionalInfo'
import { updateStatus } from './services/status'
import {
  getFinishedSections,
  updateFinishedSections,
} from './services/finishedSection'
import {
  addPhoto,
  deletePhoto,
  getPhotosByActivityId,
  updatePhoto,
} from './services/photos'
import { getSlotPrice, updatePriceAndSlots } from './services/price-slots'
import {
  getJoinerActivityCalendar,
  getPrivateActivityCalendar,
  addActivityPricePerDates,
  editPrivateActivitySlotNote,
  editJoinerActivitySlotName,
  getSlotsByDate,
  editActivityNote,
} from './services/calendar'
import { getFilteredActivities } from './services/filtered'
import paginate from '@/common/middleware/paginations/paginate'
import { addActivityReview } from './services/review'
import { activityHighestPrice } from './services/highest-price'

const router = express.Router()

//activity
//highest price
router.get(
  '/highest-price',
  isOriginValid,
  isCsrfTokenValid,
  activityHighestPrice
)

//filted data
router.get(
  '/filtered',
  isOriginValid,
  isCsrfTokenValid,
  paginate(15),
  getFilteredActivities
)
router.get('/host', isOriginValid, isUserLoggedIn, getAllActivitiesByHostId)

router.post('/', isUserLoggedIn, isOriginValid, addActivity)

router.get(
  '/:activityId/:slotId/:date',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  getSlotsByDate
)

router.get(
  '/:activityId',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivity
)

// activity-inclusions
router.patch(
  '/:activityId/inclusions',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateActivityInclusions
)

router.get(
  '/:activityId/inclusions',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivityInclusions
)

//itinerary
router.patch(
  '/:activityId/itinerary',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateItinerary
)

//Additional info
router.patch(
  '/:activityId/additional-info',
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostActivityOwner,
  updateAdditionalInfo
)

router.get(
  '/:activityId/additional-info',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getAdditionalInfo
)

//Basic info
router.patch(
  '/:activityId/info',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  isHostActivityOwner,
  updateActivities
)

router.get(
  '/:activityId/info',
  isUserLoggedIn,
  isOriginValid,
  isHostActivityOwner,
  getActivities
)

//photos
router.get(
  '/:activityId/photos',
  isOriginValid,
  isUserLoggedIn,
  isHostActivityOwner,
  getPhotosByActivityId
)
router.patch(
  '/:activityId/photo/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  updatePhoto
)

router.post(
  '/:activityId/photo',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostActivityOwner,
  addPhoto
)
router.delete(
  '/:activityId/photo/:photoId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  deletePhoto
)

//price and slots
router.patch(
  '/:activityId/price-slots',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostActivityOwner,
  updatePriceAndSlots
)

router.get(
  '/:activityId/price-slots',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  getSlotPrice
)

//status
router.patch(
  '/:activityId/status',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostActivityOwner,
  updateStatus
)

//finished sections
router.patch(
  '/:activityId/finished-sections',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  isHostActivityOwner,
  updateFinishedSections
)

router.get(
  '/:activityId/finished-sections',
  isOriginValid,
  isUserLoggedIn,
  isHostActivityOwner,
  getFinishedSections
)

//calendar
router.get(
  '/calendar/private',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getPrivateActivityCalendar
)

router.get(
  '/calendar/joiner',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getJoinerActivityCalendar
)

router.patch(
  '/:activityId/price-per-dates',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  isHostActivityOwner,
  addActivityPricePerDates
)

router.get(
  '/counts/all',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  getActivityCounts
)

router.patch(
  '/private/update-slot-note',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editPrivateActivitySlotNote
)

router.patch(
  '/joiner/update-slot-name',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editJoinerActivitySlotName
)

router.patch(
  '/update-note',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  editActivityNote
)

//review
router.post(
  '/:activityId/review',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  addActivityReview
)

export default router

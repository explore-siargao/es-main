import express from 'express'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid2'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn2'
import {
  addListing,
  deleteListing,
  getAllListing,
  getListing,
  updateListing,
} from './service/listing'
import {
  addEditWishListNote,
  addNewWishGroup,
  addToExistingWishGroup,
  addWishGroup,
  deleteWishGroup,
  deleteWishGroupByTitle,
  editTitle,
  getWishGroupsByUser,
  wishGroupByTitle,
  wishGroupByUserAndTitle,
} from './service/wishGroup'
import {
  addHighLight,
  deleteHighLight,
  getAllHighLights,
  getHighLight,
  updateHighLight,
} from './service/highLights'
import {
  addListingHighlight,
  deleteListingHighlight,
  getAllListingHighlights,
  getListingHighlightsByListing,
} from './service/listingHighlights'
import {
  addPlaceOffer,
  deletePlaceOffers,
  getAllPlaceOffers,
  getPlaceOffersById,
  updatePlaceOffers,
} from './service/placeOffers'
import {
  addListingPlaceOffer,
  deleteListingPlaceOffer,
  getAllListingPlaceOffers,
  getListingPlaceOffersByListing,
} from './service/listingPlaceOffers'
import {
  addReview,
  deleteReview,
  getReviewById,
  getReviewByListing,
  getReviewsByHost,
  getReviewsByUserId,
  updateReview,
} from './service/reviews'
import {
  deleteBasicAboutPlace,
  getBasicAboutPlaceById,
  updateBasicAboutPlace,
} from './service/basicAboutPlace'
import {
  addCancellationPolicy,
  addHouseRule,
  addSafetypropertyRule,
  deleteRule,
  getAllRules,
  getRulesByCancellationPolicy,
  getRulesByHouseRule,
  getRulesBySafetyProperty,
  updateRule,
} from './service/rules'
import {
  deleteHouseRule,
  getAllHouseRules,
  getAllHouseRulesByListing,
  getHouseRule,
  updateHouseRule,
} from './service/houseRules'
import {
  deleteSafetyProperty,
  getAllSafetyProperties,
  getAllSafetyPropertiesByListing,
  getSafetyProperty,
  updateSafetyProperty,
} from './service/safetyProperty'
import {
  deleteCancellationPolicy,
  getAllCancellationPolicies,
  getCancellationPoliciesByListing,
  getCancellationPolicy,
  updateCancellationPolicy,
} from './service/cancellationPolicies'

import {
  addDescription,
  deleteDescription,
  getDescription,
  getDescriptionByListing,
  updateDescription,
} from './service/listingDescription'
import { getNotificationsByHost } from './service/notification'

const router = express.Router()

// DEFAULT
router.get('/', isOriginValid, getAllListing)
router.get('/:id', isOriginValid, getListing)
router.post('/:hostId', isOriginValid, addListing)
router.patch('/:userId/listing/:id', isOriginValid, updateListing)
router.delete('/:userId/listing/:id', isOriginValid, deleteListing)

//wish group
router.get(
  '/:userId/wish-group',
  // isOriginValid,
  // isUserLoggedIn,
  getWishGroupsByUser
)
router.get(
  '/:userId/:title/wishes',
  // isOriginValid,
  // isUserLoggedIn,
  wishGroupByUserAndTitle
)

router.post(
  '/:userId/wish/',
  // isOriginValid,
  // isCsrfTokenValid,
  // isUserLoggedIn,
  addWishGroup
)

router.post(
  '/:userId/wish-group',
  // isOriginValid,
  // isCsrfTokenValid,
  // isUserLoggedIn,
  addNewWishGroup
)

router.post(
  '/:userId/add-existing-group',
  // isOriginValid,
  // isCsrfTokenValid,
  // isUserLoggedIn,
  addToExistingWishGroup
)

router.delete(
  '/wish/delete/:listingId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  deleteWishGroup
)

router.patch(
  '/:userId/note/:wishGroupId',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  addEditWishListNote
)
router.patch(
  '/:userId/wish-group/update-title',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  editTitle
)

router.delete(
  '/:userId/wish-group/delete/:title',
  isOriginValid,
  isCsrfTokenValid,
  isUserLoggedIn,
  deleteWishGroupByTitle
)

router.get('/:userId/group/wish', isOriginValid, wishGroupByTitle)

//highlights
router.get('/all/highlights', isOriginValid, getAllHighLights)
router.get('/highlights/:id', isOriginValid, getHighLight)
router.post(
  '/:userId/highlights',
  isOriginValid,
  isCsrfTokenValid,
  addHighLight
)
router.patch(
  '/:userId/highlights/:highLightId',
  isOriginValid,
  isCsrfTokenValid,
  updateHighLight
)
router.delete(
  '/:userId/highlights/:highLightId',
  isOriginValid,
  isCsrfTokenValid,
  deleteHighLight
)

//listing-highlights
router.get('/all/listing-highlights', isOriginValid, getAllListingHighlights)
router.get(
  '/listing-highlights/:listingId',
  isOriginValid,
  getListingHighlightsByListing
)
router.post(
  '/:userId/listing-highlights',
  isOriginValid,
  isCsrfTokenValid,
  addListingHighlight
)
router.delete(
  '/:userId/listing-highlights/delete/:listingHighlightId',
  isOriginValid,
  isCsrfTokenValid,
  deleteListingHighlight
)

//place to offers
router.get('/all/place-offers', isOriginValid, getAllPlaceOffers)
router.get('/place-offers/:id', isOriginValid, getPlaceOffersById)
router.post(
  '/:userId/place-offers',
  isOriginValid,
  isCsrfTokenValid,
  addPlaceOffer
)
router.patch(
  '/:userId/place-offers/:placeOfferId',
  isOriginValid,
  isCsrfTokenValid,
  updatePlaceOffers
)
router.delete(
  '/:userId/place-offers/delete/:placeOfferId',
  isOriginValid,
  isCsrfTokenValid,
  deletePlaceOffers
)

//listing place offers
router.get('/all/listing-place-offers', isOriginValid, getAllListingPlaceOffers)
router.get(
  '/listing-place-offers/:listingId',
  isOriginValid,
  getListingPlaceOffersByListing
)
router.post(
  '/:userId/listing-place-offers',
  isOriginValid,
  isCsrfTokenValid,
  addListingPlaceOffer
)
router.delete(
  '/:userId/listing-place-offers/delete/:listingPlaceOfferId',
  isOriginValid,
  isCsrfTokenValid,
  deleteListingPlaceOffer
)

//reviews
router.get(
  '/reviews/user/:userId',
  isOriginValid,
  isUserLoggedIn,
  getReviewsByUserId
)
router.get(
  '/reviews/:listingId',
  isOriginValid,
  isUserLoggedIn,
  getReviewByListing
)
router.get(
  '/reviews/view/:reviewId',
  isOriginValid,
  isUserLoggedIn,
  getReviewById
)

router.get('/reviews/host/:hostId', isOriginValid, getReviewsByHost)
router.post(
  '/:userId/reviews/post',
  // isOriginValid,
  // isCsrfTokenValid,
  // isUserLoggedIn,
  addReview
)
router.patch(
  '/:userId/reviews/update/:reviewId',
  isOriginValid,
  isCsrfTokenValid,
  updateReview
)
router.delete(
  '/:userId/reviews/delete/:reviewId',
  isOriginValid,
  isCsrfTokenValid,
  deleteReview
)

//Basic about place
router.get('/basic-about-place/:id', isOriginValid, getBasicAboutPlaceById)
router.patch(
  '/:userId/basic-about-place/:id',
  isOriginValid,
  isCsrfTokenValid,
  updateBasicAboutPlace
)
router.delete(
  '/:userId/basic-about-place/:id',
  isOriginValid,
  isCsrfTokenValid,
  deleteBasicAboutPlace
)

//rules
router.get('/all/rules', isOriginValid, getAllRules)
router.get('/rules/house-rule/:houseRuleId', isOriginValid, getRulesByHouseRule)
router.get(
  '/rules/safety-property/:safetyPropertyId',
  isOriginValid,
  getRulesBySafetyProperty
)
router.get(
  '/rules/cancellation-policy/:cancelPolicyId',
  isOriginValid,
  getRulesByCancellationPolicy
)
router.post(
  '/:userId/rules/house-rule',
  isOriginValid,
  isCsrfTokenValid,
  addHouseRule
)
router.post(
  '/:userId/rules/safety-property',
  isOriginValid,
  isCsrfTokenValid,
  addSafetypropertyRule
)
router.post(
  '/:userId/rules/cancellation-policy',
  isOriginValid,
  isCsrfTokenValid,
  addCancellationPolicy
)
router.patch(
  '/:userId/rules/:ruleId',
  isOriginValid,
  isCsrfTokenValid,
  updateRule
)
router.delete(
  '/:userId/rules/:ruleId',
  isOriginValid,
  isCsrfTokenValid,
  deleteRule
)

//house rules
router.get('/all/house-rules', isOriginValid, getAllHouseRules)
router.get('/house-rules/:listingId', isOriginValid, getAllHouseRulesByListing)
router.get('/house-rules/id/:id', isOriginValid, getHouseRule)
router.patch(
  '/:userId/house-rules/:id',
  isOriginValid,
  isCsrfTokenValid,
  updateHouseRule
)
router.delete(
  '/:userId/house-rules/:id',
  isOriginValid,
  isCsrfTokenValid,
  deleteHouseRule
)

//safety properties
router.get('/all/safety-properties', isOriginValid, getAllSafetyProperties)
router.get(
  '/safety-properties/:listingId',
  isOriginValid,
  getAllSafetyPropertiesByListing
)
router.get('/safety-properties/id/:id', isOriginValid, getSafetyProperty)
router.patch(
  '/:userId/safety-properties/:id',
  isOriginValid,
  isCsrfTokenValid,
  updateSafetyProperty
)
router.delete(
  '/:userId/safety-properties/:id',
  isOriginValid,
  isCsrfTokenValid,
  deleteSafetyProperty
)

//cancellation policies
router.get(
  '/all/cancellation-policies',
  isOriginValid,
  getAllCancellationPolicies
)
router.get(
  '/cancellation-policies/:listingId',
  isOriginValid,
  getCancellationPoliciesByListing
)
router.get(
  '/cancellation-policies/id/:id',
  isOriginValid,
  getCancellationPolicy
)
router.patch(
  '/:userId/cancellation-policies/:id',
  isOriginValid,
  isCsrfTokenValid,
  updateCancellationPolicy
)
router.delete(
  '/:userId/cancellation-policies/:id',
  isOriginValid,
  isCsrfTokenValid,
  deleteCancellationPolicy
)

//listing description
router.get('/listing-description/:id', isOriginValid, getDescription)
router.get(
  '/listing-description/listing/:listingId',
  isOriginValid,
  getDescriptionByListing
)
router.post(
  '/:userId/listing-description/:listingId',
  isOriginValid,
  isCsrfTokenValid,
  addDescription
)
router.patch(
  '/:userId/listing-description/:id',
  isOriginValid,
  isCsrfTokenValid,
  updateDescription
)
router.delete(
  '/:userId/listing-description/:id',
  isOriginValid,
  isCsrfTokenValid,
  deleteDescription
)

//notifications
router.get('/notifications/:hostId', isOriginValid, getNotificationsByHost)

export default router

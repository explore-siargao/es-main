import express from 'express'
import {
  deactivateAccount,
  getAllUsers,
  getUserProfile,
  updatePassword,
} from './service/default'
import {
  verifySignIn,
  verifySession,
  register,
  manual,
  info,
  forgot,
  forgotVerify,
  mfa,
  mfaVerify,
  updateUserEmail,
  userDetails,
  setCanReceiveEmail,
} from './service/auth'
import {
  addAddress,
  addEmergencyContact,
  addGovernmentId,
  editAddress,
  getAllGovernmentIdByPersonInfoId,
  getPersonalInfo,
  removeEmergencyContact,
  updateCurrency,
  updateLanguage,
  updatePersonalInfo,
} from './service/personalInfo'
import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn2'
import isOriginValid from '@/common/middleware/auth/isOriginValid'
import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid2'
import { getHostDetailsInListing } from './service/hostDetails'
import { beAHost } from './service/beAHost'
import { getProfile, updateProfile } from './service/userProfile'
import {
  logout2,
  manual2,
  info2,
  google,
  googleRedirect,
  register2,
  forgotVerify2,
} from './service/auth2'

const router = express.Router()

router.get('/auth/info2', isOriginValid, isUserLoggedIn, info2)
router.post('/auth/manual2', isOriginValid, manual2)
router.post(
  '/auth/logout2',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  logout2
)
router.post('/auth/google', isOriginValid, google)
router.get('/auth/google/redirect', isOriginValid, googleRedirect)
router.post('/auth/register2', isOriginValid, register2)
router.post('/auth/forgot-password/verify2', isOriginValid, forgotVerify2)

// DEFAULT
router.get('/', isOriginValid, getAllUsers)

// AUTH
router.post('/auth/info', isOriginValid, isCsrfTokenValid, info) // Use for Manual log in for Next-Auth
router.get('/auth/verify-session', isOriginValid, isUserLoggedIn, verifySession)
router.get('/auth/verify-sign-in', isOriginValid, verifySignIn)
router.post('/auth/register', isOriginValid, isCsrfTokenValid, register)
router.post('/auth/manual', isOriginValid, isCsrfTokenValid, manual)
router.post('/auth/forgot-password', isOriginValid, isCsrfTokenValid, forgot)
router.post(
  '/auth/forgot-password/verify',
  isOriginValid,
  isCsrfTokenValid,
  forgotVerify
)
router.post('/auth/mfa', isOriginValid, isCsrfTokenValid, mfa)
router.post('/auth/mfa/verify', isOriginValid, isCsrfTokenValid, mfaVerify)
router.patch('/auth/:userId', isCsrfTokenValid, isOriginValid, updateUserEmail)
router.get('/auth/user-details', isOriginValid, isUserLoggedIn, userDetails)
router.patch(
  '/deactivate/:userId',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  deactivateAccount
)
router.patch(
  '/change-password/:userId',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  updatePassword
)
router.get(
  '/personal-info/:userId',
  isOriginValid,
  isUserLoggedIn,
  getPersonalInfo
)
router.post(
  '/:personalInfoId/emergency-contact/add/',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  addEmergencyContact
)
router.post('/:personalInfoId/address/add/', addAddress)
router.patch(
  '/address/:userId',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  editAddress
)
router.patch(
  '/personal-info/:userId',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  updatePersonalInfo
)
router.patch(
  '/:userId/received-email',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  setCanReceiveEmail
)
router.delete(
  '/:peronalInfoId/emergency-contact/:emergencyContactId',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  removeEmergencyContact
)

router.patch(
  '/personal-info/language/:personalInfoId',
  isOriginValid,
  isCsrfTokenValid,
  updateLanguage
)
router.patch(
  '/personal-info/currency/:personalInfoId',
  isOriginValid,
  isCsrfTokenValid,
  updateCurrency
)

//Government Id
router.get(
  '/:peronalInfoId/government-id',
  isOriginValid,
  getAllGovernmentIdByPersonInfoId
)
router.post(
  '/:peronalInfoId/government-id',
  isOriginValid,
  isCsrfTokenValid,
  addGovernmentId
)

//Host Details
router.get(
  '/:hostId/host-details-listing/:listingId',
  isOriginValid,
  getHostDetailsInListing
)
router.patch(
  '/be-host',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  beAHost
)

//user profile
router.get(
  '/profile/:id',
  // isUserLoggedIn,
  // isCsrfTokenValid,
  // isOriginValid,
  getUserProfile
)
router.get('/profile', isUserLoggedIn, isOriginValid, getProfile)
router.patch(
  '/profile',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  updateProfile
)
export default router

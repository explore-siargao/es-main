import express from 'express'
import {
  forgot,
  forgotVerify,
  google,
  googleRedirect,
  info,
  logout,
  manual,
  mfa,
  mfaVerify,
  register,
  setCanReceiveEmail,
  updateUserEmail,
  userDetails,
  verifySession,
  verifySignIn,
} from './services/auth'

import isCsrfTokenValid from '@/common/middleware/auth/isCsrfTokenValid3'
import isOriginValid from '@/common/middleware/auth/isOriginValid'

import isUserLoggedIn from '@/common/middleware/auth/isUserLoggedIn3'
import { updatePassword, deactivateAccount } from './services/default'
import {
  addAddress,
  addEmergencyContact,
  editAddress,
  getPersonalInfo,
  updateCurrency,
  removeEmergencyContact,
  updateLanguage,
  updatePersonalInfo,
  getAllGovernmentIdByPersonInfoId,
  addGovernmentId,
} from './services/personalInfo'
import { beAHost } from './services/beHost'
import { getProfile, updateProfile } from './services/userProfile'

const router = express.Router()

//AUTH
router.post('/auth/manual', isOriginValid, manual)
router.get('/auth/info', isOriginValid, isUserLoggedIn, info)
router.post('/auth/register', isOriginValid, register)
router.get('/auth/verify-session', isOriginValid, isUserLoggedIn, verifySession)
router.get('/auth/verify-sign-in', isOriginValid, verifySignIn)
router.post(
  '/auth/logout',
  isOriginValid,
  isUserLoggedIn,
  isCsrfTokenValid,
  logout
)
router.post(
  '/auth/forgot-password/verify',
  isOriginValid,
  isCsrfTokenValid,
  forgotVerify
)
router.get('/auth/user-details', isOriginValid, isUserLoggedIn, userDetails)
router.post('/auth/forgot-password', isOriginValid, isCsrfTokenValid, forgot)
router.patch('/auth/:userId', isCsrfTokenValid, isOriginValid, updateUserEmail)
router.post('/auth/mfa', isOriginValid, isCsrfTokenValid, mfa)
router.post('/auth/mfa/verify', isOriginValid, isCsrfTokenValid, mfaVerify)
router.patch(
  '/deactivate/:userId',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  deactivateAccount
)
router.get(
  '/personal-info/:userId',
  isOriginValid,
  isUserLoggedIn,
  getPersonalInfo
)
router.patch(
  '/:userId/received-email',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  setCanReceiveEmail
)

router.patch(
  '/personal-info/currency/:guestId',
  isUserLoggedIn,
  isOriginValid,
  isCsrfTokenValid,
  updateCurrency
)

// PERSONAL INFO
router.post(
  '/:guestId/emergency-contact/add/',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  addEmergencyContact
)

router.patch(
  '/personal-info/:userId',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  updatePersonalInfo
)

router.delete(
  '/:guestId/emergency-contact/:emergencyContactId',
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

router.get('/profile', isUserLoggedIn, isOriginValid, getProfile)
router.patch(
  '/profile',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  updateProfile
)

router.post(
  '/:guestId/government-id',
  isOriginValid,
  isCsrfTokenValid,
  addGovernmentId
)

// GOOGLE AUTH
router.post('/auth/google', isOriginValid, google)
router.get('/auth/google/redirect', isOriginValid, googleRedirect)

//Change Password
router.patch(
  '/change-password/:userId',
  isCsrfTokenValid,
  isOriginValid,
  isUserLoggedIn,
  updatePassword
)

//Address
router.post('/:personalInfoId/address/add', addAddress)
router.patch(
  '/address/:userId',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  editAddress
)

//Government Id
router.get(
  '/:guestId/government-id',
  isOriginValid,
  getAllGovernmentIdByPersonInfoId
)

//HOST
router.patch(
  '/be-host',
  isUserLoggedIn,
  isCsrfTokenValid,
  isOriginValid,
  beAHost
)

export default router

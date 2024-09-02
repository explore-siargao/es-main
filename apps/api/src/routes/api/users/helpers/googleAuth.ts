import { OAuth2Client } from 'google-auth-library'
import {
  GOOGLE_APIS_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID,
  WEB_URL,
} from '@/common/constants/ev'

export const googleAuthRedirectURL = `${WEB_URL}/session/google`
export const googleAuthScope = [
  `${GOOGLE_APIS_URL}/auth/userinfo.email`,
  `${GOOGLE_APIS_URL}/auth/userinfo.profile`,
]
export const googleAuthPrompt = 'consent'

export const googleOAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID,
  googleAuthRedirectURL
)

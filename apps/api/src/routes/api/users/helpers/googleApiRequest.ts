import { ApiService } from '@/common/service/api'
const apiGoogleApis = new ApiService('googleapis')

export interface GoogleProfile extends Record<string, any> {
  aud: string
  azp: string
  email: string
  email_verified: boolean
  exp: number
  family_name: string
  given_name: string
  hd: string
  iat: number
  iss: string
  jti: string
  name: string
  nbf: number
  picture: string
  sub: string
}

export async function getGoogleUserData(access_token: string) {
  try {
    const googleUserData = await apiGoogleApis.get<GoogleProfile>(
      `/oauth2/v3/userinfo?access_token=${access_token}`
    )
    return {
      error: false,
      item: googleUserData,
    }
  } catch (error: any) {
    return {
      error: true,
      message: error,
    }
  }
}

import { RECAPTCHA_KEY_SECRET } from '../constants/ev'

const verifyCaptcha = async (token: string) => {
  const baseUrlPath = 'https://www.google.com/recaptcha/api/siteverify'
  const verify = await fetch(
    `${baseUrlPath}?secret=${RECAPTCHA_KEY_SECRET}&response=${token}`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    }
  )
  const result = await verify.json()
  return result.success
}

export default verifyCaptcha

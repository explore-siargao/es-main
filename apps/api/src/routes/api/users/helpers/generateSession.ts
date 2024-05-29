import { Response, Request } from 'express'
import randomChar from '@/common/helpers/randomChar'
import { T_User } from '@repo/contract'
import { EncryptionService } from '@repo/services'
import { CSRF, SESSION } from '@repo/constants'
import redisClient from '@/common/utils/redisClient'

const csrfEncryption = new EncryptionService('csrf')

async function generateSession(req: Request, res: Response, user: T_User) {
  const sessionKey = randomChar()
  const ip =
    req.headers['x-real-ip'] ||
    req.socket.remoteAddress ||
    req.connection.remoteAddress
  const csrf = csrfEncryption.encrypt({
    // this object needs to be the same as db session excluding id
    // implement ipgeolocation.io
    userId: user.id,
    sessionKey: sessionKey,
    ipAddress: ip,
    // location: "",
    // device: "",
  })
  await redisClient.hSet(`${sessionKey}:${csrf}`, {
    userId: user.id,
    ipAddress: String(ip),
    status: 'Active',
    // location: "",
    // device: "",
  })
  const cookieOption = { httpOnly: true, secure: false, encode: String }
  res.cookie(SESSION, sessionKey, cookieOption)
  res.cookie(CSRF, csrf, cookieOption)
}

export default generateSession

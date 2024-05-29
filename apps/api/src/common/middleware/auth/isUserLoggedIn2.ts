import { NextFunction, Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { E_RegistrationType, E_UserRole, T_Session } from '@repo/contract'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { prisma } from '@/common/helpers/prismaClient'
import { SESSION, CSRF } from '@repo/constants'
import redisClient from '@/common/utils/redisClient'

const response = new ResponseService()

const isUserLoggedIn2 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionCookie = req.cookies[SESSION]
  const csrfCookie = req.cookies[CSRF]
  if (sessionCookie) {
    try {
      const session = await redisClient.hGetAll(
        `${sessionCookie}:${csrfCookie}`
      )
      const user = await prisma.user.findFirst({
        where: {
          id: Number(session?.userId),
          deletedAt: null,
          deactivated: false,
        },
        include: {
          guest: true,
        },
      })
      const authUser: T_Session = {
        isHost: user?.isHost as boolean,
        id: user?.id as number,
        registrationType: user?.registrationType as E_RegistrationType,
        email: user?.email as string,
        profilePicture: user?.profilePicture as string,
        role: user?.role as E_UserRole,
        deactivated: user?.deactivated as boolean,
        canReceiveEmail: user?.canReceiveEmail as boolean,
        changePasswordAt: String(user?.changePasswordAt),
        // TODO: FIX THE ANY FOR THIS VALUE
        personalInfo: {
          ...user?.guest,
          governmentId: user?.guest?.governmentId
            ? JSON.parse(user?.guest?.governmentId)
            : null,
        } as any,
      }
      res.locals.user = authUser
      next()
    } catch (err: any) {
      const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
      response.error({
        message: message,
      })
    }
  } else {
    res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
}

export default isUserLoggedIn2

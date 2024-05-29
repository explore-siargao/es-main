// NOTE: This needs to be place after isUserLoggedIn middleware

import { NextFunction, Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { USER_NOT_AUTHORIZED } from '@/common/constants'
import { properties } from '../service/jsons/property'

const response = new ResponseService()

const isHostPropertyOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = res.locals.user
  const propertyId = Number(req.params.propertyId)

  if (loggedInUser.role === 'Admin') {
    next()
  }
  const property = properties.find(
    (item) => item.hostId === loggedInUser.id && item.id === propertyId
  )
  if (property && loggedInUser.isHost) {
    next()
  } else {
    res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
}

export default isHostPropertyOwner

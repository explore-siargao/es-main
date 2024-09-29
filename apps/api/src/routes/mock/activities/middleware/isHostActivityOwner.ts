// NOTE: This needs to be place after isUserLoggedIn middleware

import { NextFunction, Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { USER_NOT_AUTHORIZED } from '@/common/constants'
import { activities } from '../service/jsons/activities'

const response = new ResponseService()

const isHostActivityOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = res.locals.user
  const activityId = Number(req.params.activityId)
  if (loggedInUser.role === 'Admin') {
    return next()
  }
  const activity = activities.find(
    (item) => item.hostId === loggedInUser.id && item.id === activityId
  )
  if (activity && loggedInUser.isHost) {
    return next()
  } else {
    res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
}

export default isHostActivityOwner

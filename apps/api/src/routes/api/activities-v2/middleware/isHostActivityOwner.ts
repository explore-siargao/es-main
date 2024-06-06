// NOTE: This needs to be place after isUserLoggedIn middleware

import { NextFunction, Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { USER_NOT_AUTHORIZED } from '@/common/constants'
import { dbActivities } from '@repo/database'

const response = new ResponseService()

const isHostActivityOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = res.locals.user
  const activityId = req.params.activityId

  if (loggedInUser.role === 'Admin') {
    return next()
  }

  let activity
  try {
    activity = await dbActivities.findOne({
      host: loggedInUser.id,
      _id: activityId,
    })
  } catch (err) {
    return res.status(400).json(
      response.error({
        message: 'Invalid activity ID format.',
      })
    )
  }

  if (activity && loggedInUser.isHost) {
    return next()
  } else {
    return res.status(403).json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
}

export default isHostActivityOwner

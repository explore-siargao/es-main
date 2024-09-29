// NOTE: This needs to be place after isUserLoggedIn middleware

import { NextFunction, Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { USER_NOT_AUTHORIZED } from '@/common/constants'
import { rentals } from '../service/jsons/rentals'

const response = new ResponseService()

const isHostRentalOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = res.locals.user
  const rentalId = Number(req.params.rentalId)
  if (loggedInUser.role === 'Admin') {
    return next()
  }
  const rental = rentals.find(
    (item) => item.hostId === loggedInUser.id && item.id === rentalId
  )
  if (rental && loggedInUser.isHost) {
    return next()
  } else {
    res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
}

export default isHostRentalOwner

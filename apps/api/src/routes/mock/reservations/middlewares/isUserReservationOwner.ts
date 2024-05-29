// NOTE: This needs to be place after isUserLoggedIn middleware

import { NextFunction, Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { USER_NOT_AUTHORIZED } from '@/common/constants'
import { reservations } from '../service/jsons/reservations'

const response = new ResponseService()

const isUserReservationOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = res.locals.user
  const reservationId = req.params.reservationId
  if (loggedInUser.role === 'Admin') {
    return next()
  }
  const reservation = reservations.find(
    (item) =>
      (item.host._id === loggedInUser.id ||
        item.guest._id === loggedInUser.id) &&
      item._id === reservationId
  )
  if (reservation) {
    return next()
  } else {
    return res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
}

export default isUserReservationOwner

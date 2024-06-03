import { USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbRentals } from '@repo/database'
import { NextFunction, Request, Response } from 'express'

const response = new ResponseService()

const isHostRentalOwner2 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = res.locals.user
  const rentalId = req.params.rentalId
  if (loggedInUser.role === 'Admin') {
    return next()
  }
  const rental = await dbRentals.findById(rentalId)
  if (rental && loggedInUser.isHost) {
    return next()
  } else {
    return res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
}

export default isHostRentalOwner2

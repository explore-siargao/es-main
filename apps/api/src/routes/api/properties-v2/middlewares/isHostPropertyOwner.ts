import { NextFunction, Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { USER_NOT_AUTHORIZED } from '@/common/constants'
import { E_UserRole } from '@repo/contract'
import { dbProperties } from '@repo/database'

const response = new ResponseService()

const isHostPropertyOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = res.locals.user
  const propertyId = req.params.propertyId

  if (loggedInUser.role === E_UserRole.Admin) {
    return next()
  }

  let listing
  try {
    listing = await dbProperties.findOne({
      offerBy: loggedInUser.id,
      _id: propertyId,
    })
  } catch (err: any) {
    return res.json(
      response.error({
        message: 'Invalid property ID format',
      })
    )
  }

  if (listing && loggedInUser.isHost) {
    return next()
  } else {
    return res.json(
      response.error({
        message: USER_NOT_AUTHORIZED,
      })
    )
  }
}

export default isHostPropertyOwner

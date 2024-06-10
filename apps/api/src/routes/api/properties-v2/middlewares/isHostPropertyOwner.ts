import { NextFunction, Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { REQUIRED_VALUE_EMPTY, USER_NOT_AUTHORIZED } from '@/common/constants'
// import { dbProperties } from '@repo/database'
import { E_UserRole } from '@repo/contract'

const response = new ResponseService()

const isHostPropertyOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = res.locals.user
  // const propertyId = req.params.propertyId

  if (loggedInUser.role === E_UserRole.Admin) {
    return next()
  }

  let listing = true
  // let listing
  // try {
  //   listing = await dbProperties.findOne({
  //     host: loggedInUser.id,
  //     _id: propertyId,
  //   })
  // } catch (err) {
  //   return res.json(
  //     response.error({
  //       message: USER_NOT_AUTHORIZED,
  //     })
  //   )
  // }

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

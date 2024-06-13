import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { Request, Response } from 'express'
import { HostEmail } from './hostEmail'
import { ResponseService } from '@/common/service/response'
import { dbUsers } from '@repo/database'

const hostEmail = new HostEmail()
const response = new ResponseService()
export const beAHost = async (req: Request, res: Response) => {
  const sendEmailParams = { to: res.locals.user.email }
  try {
    const checkUserIsHost = await dbUsers.findOne({
      _id: res.locals.user.id,
      isHost: true,
      deletedAt: null,
    })
    if (checkUserIsHost) {
      return res.json(response.error({ message: "You're already a host" }))
    }
    const addAsHost = await dbUsers.findByIdAndUpdate(
      res.locals.user.id,
      {
        $set: {
          isHost: true,
        },
      },
      { new: true }
    )

    if (addAsHost) {
      hostEmail.sendHostConfirmation(sendEmailParams)
    }
    res.json(
      response.success({
        item: { isHost: addAsHost?.isHost },
        allItemCount: 1,
        message: 'User sucessfully added as a host',
      })
    )
  } catch (err: any) {
    const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
    res.json(
      response.error({
        message: message,
      })
    )
  }
}

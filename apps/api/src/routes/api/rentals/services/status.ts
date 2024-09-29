import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_Rental_Status } from '@repo/contract'
import { dbRentals } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updateStatus = async (req: Request, res: Response) => {
  const rentalId = req.params.rentalId
  const hostId = res.locals.user?.id
  const { status } = req.body
  const isValidInput = Z_Rental_Status.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const getRental = await dbRentals.findOne({
        _id: rentalId,
        host: hostId,
      })
      if (!getRental) {
        res.json(response.error({ message: 'Rental not found.' }))
      } else {
        getRental.status = status || getRental?.status
        getRental.updatedAt = new Date()
        await getRental?.save()
        res.json(
          response.success({
            item: { status: status },
            message: 'Rental is now ' + status,
          })
        )
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }
}

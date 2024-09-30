import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { rentals } from './jsons/rentals'
import { Z_Rental_Status } from '@repo/contract'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

const response = new ResponseService()
export const updateStatus = async (req: Request, res: Response) => {
  const rentalId = Number(req.params.rentalId)
  const hostId = res.locals.user?.id
  const { status } = req.body
  const isValidInput = Z_Rental_Status.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const getRental = rentals.find(
        (item) => item.id === rentalId && item.hostId === hostId
      )
      if (!getRental) {
        res.json(response.error({ message: 'Rental not found.' }))
      } else {
        getRental.status = status || getRental?.status
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

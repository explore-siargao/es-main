import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbRentals } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const getFinishedSections = async (req: Request, res: Response) => {
  const rentalId = req.params.rentalId
  const hostId = res.locals.user?.id
  try {
    const getRental = await dbRentals.findOne({ _id: rentalId, host: hostId })
    const finishedSections = getRental?.finishedSections
    res.json(response.success({ item: { finishedSections } }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

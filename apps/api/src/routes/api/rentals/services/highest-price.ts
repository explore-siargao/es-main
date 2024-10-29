import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities, dbRentalRates } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()
export const rentalHighestPrice = async (req: Request, res: Response) => {
  try {
    const getHighestPrice = await dbRentalRates.aggregate([
      {
        $project: {
          dayRate: 1,
        },
      },
      {
        $sort: {
          dayRate: -1,
        },
      },
      {
        $limit: 1,
      },
    ])
    res.json(response.success({ item: getHighestPrice[0] }))
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

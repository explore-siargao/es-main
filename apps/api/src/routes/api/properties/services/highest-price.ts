import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities, dbRentalRates, dbUnitPrices } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()
export const unitHighestPrice = async (req: Request, res: Response) => {
  try {
    const getHighestPrice = await dbUnitPrices.aggregate([
      {
        $project: {
          baseRate: 1,
        },
      },
      {
        $sort: {
          baseRate: -1,
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

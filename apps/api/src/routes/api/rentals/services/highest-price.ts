import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_Category_Highest_Price } from '@repo/contract-2/search-filters'
import { dbActivities, dbRentalRates } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()
export const rentalHighestPrice = async (req: Request, res: Response) => {
  try {
    const getHighestPrice = await dbRentalRates.aggregate([
      {
        $project: {
          _id: 0,
          amount: "$dayRate",
        },
      },
      {
        $sort: {
          amount: -1,
        },
      },
      {
        $limit: 1,
      },
    ])
    const valid = Z_Category_Highest_Price.safeParse(getHighestPrice[0]);
    if(valid.success) {
      res.json(response.success({ item: getHighestPrice[0] }))
    } else {
      res.json(response.error({ message: "Invalid request", item: null }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

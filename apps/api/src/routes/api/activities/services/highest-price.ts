import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { Z_Category_Highest_Price } from '@repo/contract-2/search-filters'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()
export const activityHighestPrice = async (req: Request, res: Response) => {
  try {
    const getHighestPrice = await dbActivities.aggregate([
      {
        $project: {
          _id: 0,
          amount: '$pricePerPerson', // Only include pricePerPerson
        },
      },
      {
        $sort: { amount: -1 }, // Sort by amount in descending order
      },
      {
        $limit: 1, // Limit to the highest price
      },
    ])

    const valid = Z_Category_Highest_Price.safeParse(getHighestPrice[0])
    if (valid.success) {
      res.json(response.success({ item: getHighestPrice[0] }))
    } else {
      res.json(response.error({ message: 'Invalid request', item: null }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

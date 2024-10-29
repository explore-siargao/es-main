import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'
const response = new ResponseService()
export const activityHighestPrice = async (req: Request, res: Response) => {
  try {
    const getHighestPrice = await dbActivities.aggregate([
      {
        $project: {
          _id: 1,
          name: 1, // Include any other fields as needed
          highestPrice: { $max: ['$pricePerPerson', '$pricePerSlots'] },
        },
      },
      {
        $sort: { highestPrice: -1 },
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

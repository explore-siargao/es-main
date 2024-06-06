import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const getActivity = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  try {
    const getActivity = await dbActivities
      .findOne({ _id: activityId, deletedAt: null })
      .populate('host')
      .populate('address')
      .populate('itineraries')
      .populate('activityPhotos')
    res.json(response.success({ item: getActivity }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { Z_Activity_Status } from '@repo/contract'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { dbActivities } from '@repo/database'

const response = new ResponseService()
export const updateStatus = async (req: Request, res: Response) => {
  const activityId = req.params.activityId
  const { status } = req.body
  const isValidInput = Z_Activity_Status.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const getActivity = await dbActivities.findOne({
        _id: activityId,
        deletedAt: null,
      })
      if (!getActivity) {
        res.json(response.error({ message: 'Activity not found' }))
      } else {
        const updateStatus = await dbActivities.findByIdAndUpdate(
          getActivity?._id,
          {
            $set: {
              status: status,
              updatedAt: Date.now(),
            },
          }
        )
        res.json(
          response.success({
            item: { status: updateStatus },
            message: 'Activity is now ' + status,
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

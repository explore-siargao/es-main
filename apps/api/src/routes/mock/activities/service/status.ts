import { Request, Response } from 'express'
import { activities } from './jsons/activities'
import { ResponseService } from '@/common/service/response'
import { Z_Activity_Status } from '@repo/contract'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

const response = new ResponseService()
export const updateStatus = async (req: Request, res: Response) => {
  const activityId = Number(req.params.activityId)
  const hostId = res.locals.user?.id
  const { status } = req.body
  const isValidInput = Z_Activity_Status.safeParse(req.body)
  if (isValidInput.success) {
    try {
      const getActivity = activities.find(
        (item) => item.id === activityId && item.hostId === hostId
      )
      if (!getActivity) {
        res.json(response.error({ message: 'Activity not found' }))
      } else {
      getActivity.status = status || getActivity.status
      res.json(
        response.success({
          item: { status: status },
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

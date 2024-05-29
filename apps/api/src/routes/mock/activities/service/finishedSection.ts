import { Request, Response } from 'express'
import { activities } from './jsons/activities'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

const response = new ResponseService()
export const getFinishedSections = async (req: Request, res: Response) => {
  const activityId = Number(req.params.activityId)
  const hostId = res.locals.user?.id
  try {
    const getActivity = activities.find(
      (item) => item.id === activityId && item.hostId === hostId
    )
    const finishedSections = getActivity?.finishedSections
      ? JSON.parse(getActivity?.finishedSections as string)
      : []
    res.json(response.success({ item: { finishedSections } }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateFinishedSections = async (req: Request, res: Response) => {
  const activityId = Number(req.params.activityId)
  const hostId = res.locals.user?.id
  const finishedSections = req.body.finishedSections
  try {
    const getActivity = activities.find(
      (item) => item.id === activityId && hostId === item.hostId
    )
    const sections = JSON.parse(getActivity?.finishedSections as string)
    sections.push(finishedSections)
    //@ts-ignore
    getActivity.finishedSections = JSON.stringify(sections)
    res.json(
      response.success({ item: sections, message: 'Finished sections saved' })
    )
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

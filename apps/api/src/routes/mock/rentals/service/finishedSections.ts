import { Request, Response } from 'express'
import { rentals } from './jsons/rentals'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

const response = new ResponseService()

export const getFinishedSections = async (req: Request, res: Response) => {
  const rentalId = Number(req.params.rentalId)
  const hostId = res.locals.user?.id
  try {
    const getRental = rentals.find(
      (item) => item.id === rentalId && item.hostId === hostId
    )
    const finishedSections = getRental?.finishedSections
      ? JSON.parse(getRental?.finishedSections as string)
      : []
    res.json(response.success({ item: { finishedSections } }))
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateFinishedSections = async (req: Request, res: Response) => {
  const rentalId = Number(req.params.rentalId)
  const hostId = res.locals.user?.id
  const finishedSections = req.body.finishedSections
  try {
    const getRental = rentals.find((item) => item.id === rentalId && hostId)
    const sections = JSON.parse(getRental?.finishedSections as string)
    sections.push(finishedSections)
    if(getRental) {
      getRental.finishedSections = JSON.stringify(sections)
    }
    res.json(
      response.success({ item: sections, message: 'Finished sections saved' })
    )
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

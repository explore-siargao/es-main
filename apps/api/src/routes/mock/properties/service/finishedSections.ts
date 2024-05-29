import { Request, Response } from 'express'
import { properties } from './jsons/property'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

const response = new ResponseService()

export const getFinishedSections = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const propertyId = Number(req.params.propertyId)
  try {
    const getProperty = properties.find(
      (item) => item.id === propertyId && item.hostId === hostId
    )
    const finishedSections = getProperty?.finishedSections
      ? JSON.parse(getProperty?.finishedSections as string)
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
  const hostId = res.locals.user?.id
  const propertyId = Number(req.params.propertyId)
  const finishedSections = req.body.finishedSections
  try {
    const getProperty = properties.find(
      (item) => item.id === propertyId && item.hostId === hostId
    )
    const sections = JSON.parse(getProperty?.finishedSections as string)
    sections.push(finishedSections)
    //@ts-ignore
    getProperty.finishedSections = JSON.stringify(sections)
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

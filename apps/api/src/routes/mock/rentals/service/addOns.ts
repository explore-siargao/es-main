import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { rentals } from './jsons/rentals'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { T_Rental_AddOns, Z_Rental_AddOns } from '@repo/contract'

const response = new ResponseService()
export const getAddOns = async (req: Request, res: Response) => {
  const id = Number(req.params.rentalId)
  const hostId = res.locals.user?.id
  let addOns = null
  try {
    const getRental = rentals.find(
      (item) => item.id === id && hostId === item.hostId
    )
    if (!getRental) {
      res.json(
        response.error({
          message: 'Rental not found',
        })
      )
    } else {
      if (getRental.category === 'Car') {
        addOns = {
          roofRack: getRental?.AddOns.roofRack,
          dashCam: getRental?.AddOns.dashCam,
          others: getRental?.AddOns.others,
        }
      } else if (
        getRental?.category === 'Motorbike' ||
        getRental?.category === 'Bicycle'
      ) {
        addOns = {
          boardRack: getRental?.AddOns.boardRack,
          babySeat: getRental?.AddOns.babySeat,
          includesHelmet: getRental?.AddOns.includesHelmet,
          others: getRental?.AddOns.others,
        }
      } else {
        res.json(response.error({ message: 'Invalid rental category' }))
      }

      res.json(response.success({ item: addOns }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateAddOns = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const id = Number(req.params.rentalId)
  const {
    roofRack,
    boardRack,
    babySeat,
    dashCam,
    includesHelmet,
    others,
  }: T_Rental_AddOns = req.body
  const isValidInput = Z_Rental_AddOns.safeParse(req.body as T_Rental_AddOns)
  if (isValidInput.success) {
    try {
      const getRental = rentals.find(
        (item) => item.id === id && userId === item.hostId
      )
      if (!getRental) {
        res.json(response.error({ message: 'Rental not found' }))
      }
      if (getRental?.hostId !== userId) {
        res.json(response.error({ message: USER_NOT_AUTHORIZED }))
      }
      const addOns = getRental?.AddOns
      if (addOns && getRental?.category === 'Car') {
        addOns.roofRack = roofRack || (addOns.roofRack as boolean)
        addOns.boardRack = false || (addOns.roofRack as boolean)
        addOns.babySeat = false || (addOns.babySeat as boolean)
        addOns.includesHelmet = false || (addOns.babySeat as boolean)
        addOns.dashCam = dashCam || (addOns.dashCam as boolean)
        //@ts-ignore
        addOns.others = others || addOns.others
      } else if (
        addOns &&
        (getRental?.category === 'Motorbike' ||
          getRental?.category === 'Bicycle')
      ) {
        addOns.roofRack = false || (addOns.roofRack as boolean)
        addOns.boardRack = boardRack || (addOns.roofRack as boolean)
        addOns.babySeat = babySeat || (addOns.babySeat as boolean)
        addOns.includesHelmet = includesHelmet || (addOns.babySeat as boolean)
        addOns.dashCam = false || (addOns.dashCam as boolean)
        //@ts-ignore
        addOns.others = others || addOns.others
      }
      if (getRental) {
        getRental.finishedSections = '["basicInfo", "details", "addOns"]'
      }
      res.json(
        response.success({
          item: addOns,
          message: 'Rental Add-ons successfully added',
        })
      )
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

import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { dbRentals } from '@repo/database'
import { T_Rental_AddOns } from '@repo/contract'

const response = new ResponseService()

export const getAddOns = async (req: Request, res: Response) => {
  const id = req.params.rentalId
  const hostId = res.locals.user?.id
  let addOns: T_Rental_AddOns | null = null
  try {
    const getRental = await dbRentals
      .findOne({
        _id: id,
        host: hostId,
      })
      .populate('addOns')
    if (!getRental) {
      return res.json(
        response.error({
          message: 'Rental not found',
        })
      )
    }

    addOns = getRental.addOns as unknown as T_Rental_AddOns

    if (getRental.category === 'Car') {
      addOns = {
        roofRack: addOns.roofRack,
        dashCam: addOns.dashCam,
        others: addOns.others,
      }
    } else if (
      getRental.category === 'Motorbike' ||
      getRental.category === 'Bicycle'
    ) {
      addOns = {
        boardRack: addOns.boardRack,
        babySeat: addOns.babySeat,
        includesHelmet: addOns.includesHelmet,
        others: addOns.others,
      }
    } else {
      return res.json(response.error({ message: 'Invalid rental category' }))
    }

    res.json(response.success({ item: addOns }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { dbRentalAddOns, dbRentals } from '@repo/database'
import { T_Rental_AddOns, Z_Rental_AddOns } from '@repo/contract'

const response = new ResponseService()

export const getAddOns = async (req: Request, res: Response) => {
  const id = req.params.rentalId
  const hostId = res.locals.user?.id
  let addOns: any
  try {
    const getRental = await dbRentals
      .findOne({
        _id: id,
        host: hostId,
      })
      .populate('addOns')
    if (!getRental) {
      res.json(
        response.error({
          message: 'Rental not found',
        })
      )
    } else {
      addOns = getRental?.addOns as unknown as T_Rental_AddOns

      if (getRental?.category === 'Car') {
        addOns = {
          category: getRental?.category,
          roofRack: addOns.roofRack,
          dashCam: addOns.dashCam,
          others: addOns.others,
        }
      } else if (
        getRental?.category === 'Motorbike' ||
        getRental?.category === 'Bicycle'
      ) {
        addOns = {
          category: getRental?.category,
          boardRack: addOns.boardRack,
          babySeat: addOns.babySeat,
          includesHelmet: addOns.includesHelmet,
          others: addOns.others,
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
  const rentalId = req.params.rentalId
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
      const getRental = await dbRentals.findOne({
        _id: rentalId,
        host: userId,
      })

      if (!getRental) {
        res.json(response.error({ message: 'Rental not found' }))
      } else {
        if (getRental?.host?.toString() !== userId) {
          res.json(response.error({ message: USER_NOT_AUTHORIZED }))
        } else {
          const addOns: T_Rental_AddOns =
            getRental?.addOns as unknown as T_Rental_AddOns

          if (getRental?.category === 'Car') {
            addOns.roofRack = roofRack ?? addOns.roofRack
            addOns.boardRack = addOns.boardRack
            addOns.babySeat = addOns.babySeat
            addOns.includesHelmet = addOns.includesHelmet
            addOns.dashCam = dashCam ?? addOns.dashCam
            addOns.others = others ?? (addOns.others || [])
          } else if (
            getRental?.category === 'Motorbike' ||
            getRental?.category === 'Bicycle'
          ) {
            addOns.roofRack = addOns.roofRack
            addOns.boardRack = boardRack ?? addOns.boardRack
            addOns.babySeat = babySeat ?? addOns.babySeat
            addOns.includesHelmet = includesHelmet ?? addOns.includesHelmet
            addOns.dashCam = addOns.dashCam
            addOns.others = others ?? (addOns.others || [])
          }

          await dbRentalAddOns.findByIdAndUpdate(
            getRental?.addOns,
            {
              $set: {
                roofRack: roofRack,
                boardRack: boardRack,
                babySeat: babySeat,
                dashCam: dashCam,
                includesHelmet: includesHelmet,
                others: others || [],
              },
            },
            {
              new: true,
            }
          )

          await dbRentals.updateOne(
            { _id: rentalId },
            {
              $set: {
                AddOns: addOns,
              },
              $addToSet:{
                finishedSections:'addOns'
              }
            }
          )

          res.json(
            response.success({
              item: addOns,
              message: 'Rental Add-ons successfully updated',
            })
          )
        }
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : 'Unknown error occurred',
        })
      )
    }
  } else {
    res.json(
      response.error({ message: JSON.parse(isValidInput.error.message) })
    )
  }
}

import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import {
  E_Rental_Category,
  T_Rental_Basic_Info,
  Z_Rental_Basic_Info,
} from '@repo/contract'
import { dbRentals } from '@repo/database'

const response = new ResponseService()

export const getRentalBasicInfo = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const rentalId = req.params.rentalId
  let basicInfo = null
  try {
    const getRental = await dbRentals
      .findOne({ _id: rentalId, host: hostId })
      .populate('details')
      .exec()

    if (!getRental) {
      return res.json(response.error({ message: 'No rental details found' }))
    }

    const category = getRental.category as unknown as string

    if (
      category === E_Rental_Category.Car ||
      category === E_Rental_Category.Motorbike
    ) {
      basicInfo = {
        category: getRental?.category,
        make: getRental?.make,
        modelBadge: getRental?.modelBadge,
        bodyType: getRental?.bodyType,
        fuel: getRental?.fuel,
        transmission: getRental?.transmission,
        year: getRental?.year,
      }
    } else if (category === E_Rental_Category.Bicycle) {
      basicInfo = {
        category: getRental.category,
        make: getRental.make,
      }
    }
    res.json(response.success({ item: basicInfo }))
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateRentalBasicInfo = async (req: Request, res: Response) => {
  const isHost = res.locals.user?.isHost
  const rentalId = req.params.rentalId
  const {
    category,
    make,
    modelBadge,
    bodyType,
    fuel,
    transmission,
    year,
  }: T_Rental_Basic_Info = req.body
  const isValidInput = Z_Rental_Basic_Info.safeParse(
    req.body as T_Rental_Basic_Info
  )
  if (isValidInput.success) {
    try {
      const rental = await dbRentals.findOne({ _id: rentalId })
      if (!rental || !isHost) {
        return res.json(
          response.error({
            message: USER_NOT_AUTHORIZED,
          })
        )
      }

      if (category === 'Car' || category === 'Motorbike') {
        rental.category =
          rental.category === '' || rental.category === null
            ? category
            : rental.category
        rental.make = make || rental.make
        rental.modelBadge = modelBadge || rental.modelBadge
        rental.bodyType = bodyType || rental.bodyType
        rental.fuel = fuel || rental.fuel
        rental.transmission = transmission || rental.transmission
        rental.year = year || rental.year
      } else if (category === 'Bicycle') {
        rental.category =
          rental.category === '' || rental.category === null
            ? category
            : rental.category
        rental.make = make || rental.make
        rental.modelBadge = null
        rental.bodyType = null
        rental.fuel = null
        rental.transmission = null
        rental.year = null
      }

      rental.finishedSections = ['basicInfo']
      rental.updatedAt = new Date()
      await rental.save()

      const basicInfo = {
        category: rental.category,
        make: rental.make,
        modelBadge: rental.modelBadge,
        bodyType: rental.bodyType,
        fuel: rental.fuel,
        transmission: rental.transmission,
        year: rental.year,
      }

      res.json(
        response.success({
          item: basicInfo,
          message: 'Rental basic info successfully updated!',
        })
      )
    } catch (err: any) {
      return res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    return res.json(
      response.error({
        message: JSON.parse(isValidInput.error.message),
      })
    )
  }
}

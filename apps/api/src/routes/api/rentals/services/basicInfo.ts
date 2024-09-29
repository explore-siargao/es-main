import { Request, Response } from 'express'
import mongoose from 'mongoose'
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
      res.json(response.error({ message: 'No rental details found' }))
    }

    const category = getRental?.category as unknown as string

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
        daysCanCancel: getRental?.daysCanCancel,
      }
    } else if (category === E_Rental_Category.Bicycle) {
      basicInfo = {
        category: getRental?.category,
        make: getRental?.make,
        daysCanCancel: getRental?.daysCanCancel,
      }
    }
    res.json(response.success({ item: basicInfo }))
  } catch (err: any) {
    res.json(
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
    qty,
    daysCanCancel,
  }: T_Rental_Basic_Info = req.body
  const isValidInput = Z_Rental_Basic_Info.safeParse(
    req.body as T_Rental_Basic_Info
  )
  if (isValidInput.success) {
    try {
      const rental = await dbRentals.findOne({ _id: rentalId })
      if (!rental || !isHost) {
        res.json(
          response.error({
            message: USER_NOT_AUTHORIZED,
          })
        )
      }

      if (rental && category === 'Car') {
        rental.category =
          rental?.category === '' || rental?.category === null
            ? category
            : rental?.category
        rental.make = make || rental?.make
        rental.modelBadge = modelBadge || rental?.modelBadge
        rental.bodyType = bodyType || rental?.bodyType
        rental.fuel = fuel || rental?.fuel
        rental.transmission = transmission || rental?.transmission
        ;(rental.year = year || rental?.year), (rental.qty = qty || rental?.qty)
        rental.ids = rental?.ids
        rental.daysCanCancel = rental?.daysCanCancel
        // Generate the name based on year, make, modelBadge, and transmission
        const transShort = transmission === 'Manual' ? 'MT' : 'AT'
        const nameBase = `${year} ${make} ${modelBadge} ${transShort}`
        if (rental.qty) {
          for (let i = 0; i < rental?.qty; i++) {
            if (!rental.ids[i]) {
              rental?.ids.push({
                _id: new mongoose.Types.ObjectId(),
                name: `${nameBase} ${i + 1}`,
              })
            }
          }
        }
      } else if (
        rental &&
        (category === 'Motorbike' || category === 'Bicycle')
      ) {
        rental.category =
          rental?.category === '' || rental?.category === null
            ? category
            : rental?.category
        rental.make = make || rental?.make
        rental.modelBadge =
          category === 'Motorbike' ? modelBadge || rental?.modelBadge : null
        rental.bodyType =
          category === 'Motorbike' ? bodyType || rental?.bodyType : null
        rental.fuel = category === 'Motorbike' ? fuel || rental?.fuel : null
        rental.transmission =
          category === 'Motorbike' ? transmission || rental?.transmission : null
        rental.year = category === 'Motorbike' ? year || rental?.year : null
        rental.qty = qty || rental?.qty
        rental.ids = rental?.ids
        rental.daysCanCancel = rental?.daysCanCancel
        // Generate the name based on year, make, modelBadge, and transmission
        const transShort = transmission === 'Manual' ? 'MT' : 'AT'
        const nameBase =
          rental?.category === 'Motorbike'
            ? `${year} ${make} ${modelBadge} ${transShort}`
            : rental?.make

        if (rental.qty) {
          for (let i = 0; i < rental?.qty; i++) {
            if (!rental.ids[i]) {
              rental?.ids.push({
                _id: new mongoose.Types.ObjectId(),
                name: `${nameBase} ${i + 1}`,
              })
            }
          }
        }
      }

      if (rental) {
        rental.finishedSections = ['basicInfo']
        rental.updatedAt = new Date()
      }

      await rental?.save()

      const basicInfo = {
        category: rental?.category,
        make: rental?.make,
        modelBadge: rental?.modelBadge,
        bodyType: rental?.bodyType,
        fuel: rental?.fuel,
        transmission: rental?.transmission,
        year: rental?.year,
        qty: rental?.qty,
        daysCanCancel: daysCanCancel,
      }

      res.json(
        response.success({
          item: basicInfo,
          message: 'Rental basic info successfully updated!',
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
      response.error({
        message: JSON.parse(isValidInput.error.message),
      })
    )
  }
}

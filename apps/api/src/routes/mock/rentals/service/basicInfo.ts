import { Request, Response } from 'express'
import { rentals } from './jsons/rentals'
import { ResponseService } from '@/common/service/response'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { T_Rental_Basic_Info, Z_Rental_Basic_Info } from '@repo/contract'

const response = new ResponseService()
export const getRentalBasicInfo = async (req: Request, res: Response) => {
  const hostId = res.locals.user?.id
  const rentalId = Number(req.params.rentalId)
  let basicInfo = null
  try {
    const getRental = rentals.find(
      (item) => item.id === rentalId && item.hostId === hostId
    )
    if (getRental?.category === 'Car' || getRental?.category === 'Motorbike') {
      basicInfo = {
        category: getRental?.category,
        make: getRental?.make,
        modelBadge: getRental?.modelBadge,
        bodyType: getRental?.bodyType,
        fuel: getRental?.fuel,
        transmission: getRental?.transmission,
        year: getRental?.year,
      }
    } else if (getRental?.category === 'Bicycle') {
      basicInfo = {
        category: getRental?.category,
        make: getRental?.make,
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
  const hostId = res.locals.user?.id
  const rentalId = Number(req.params.rentalId)
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
      const getRental = rentals.find(
        (item) => item.id === rentalId && item.hostId === hostId
      )
      if (getRental && (category === 'Car' || category === 'Motorbike')) {
        getRental.category =
          getRental?.category === '' || getRental?.category === null
            ? category
            : getRental?.category
        getRental.make = make || getRental?.make
        getRental.modelBadge = modelBadge || getRental?.modelBadge
        getRental.bodyType = bodyType || getRental?.bodyType
        getRental.fuel = fuel || getRental?.fuel
        getRental.transmission = transmission || getRental?.transmission
        getRental.year = year || getRental?.year
      } else if (getRental && category === 'Bicycle') {
        getRental.category =
          getRental?.category === '' || getRental?.category === null
            ? category
            : getRental?.category
        getRental.make = make || getRental?.make
        getRental.modelBadge = getRental?.modelBadge ?? null
        getRental.bodyType = getRental?.bodyType ?? null
        getRental.fuel = getRental?.fuel ?? null
        getRental.transmission = getRental?.transmission ?? null
        getRental.year = getRental?.year ?? null
      }
      if (getRental) {
        getRental.finishedSections = '["basicInfo"]'
      }
      const basicInfo = {
        category: getRental?.category,
        make: getRental?.make,
        modelBadge: getRental?.modelBadge,
        bodyType: getRental?.bodyType,
        fuel: getRental?.fuel,
        transmission: getRental?.transmission,
        year: getRental?.year,
      }
      res.json(
        response.success({
          item: basicInfo,
          message: 'Rental basic information successfully updated',
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

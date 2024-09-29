import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
import { rentals } from './jsons/rentals'
import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { T_Rental_Details, Z_Rental_Details } from '@repo/contract'

const response = new ResponseService()

export const getRentalDetails = async (req: Request, res: Response) => {
  const id = Number(req.params.rentalId)
  const hostId = res.locals.user?.id
  let rentalDetail = null
  try {
    const getRental = rentals.find(
      (item) => item.id === id && hostId === item.hostId
    )
    if (!getRental) {
      res.json(response.error({ message: 'No rental details found' }))
    } else {

      if (getRental.category === 'Car') {
        rentalDetail = getRental?.Details
      } else if (getRental.category === 'Motorbike') {
        rentalDetail = {
          id: getRental?.Details.id,
          engineCapacityLiter: getRental?.Details.engineCapacityLiter,
          engineCapacityCc: getRental?.Details.engineCapacityCc,
          condition: getRental?.Details.condition,
          exteriorColor: getRental?.Details.exteriorColor,
          seatingCapacity: getRental?.Details.seatingCapacity,
          weightCapacity: getRental?.Details.weightCapacity,
          haveDriverLicense: getRental?.Details.haveDriverLicense,
          isRegistered: getRental?.Details.isRegistered,
        }
      } else if (getRental.category === 'Bicycle') {
        rentalDetail = {
          id: getRental?.Details.id,
          condition: getRental?.Details.condition,
          exteriorColor: getRental?.Details.exteriorColor,
          weightCapacity: getRental?.Details.weightCapacity,
          haveDriverLicense: getRental?.Details.haveDriverLicense,
        }
      } else {
        res.json(response.error({ message: 'Invalid rental category' }))
      }
      res.json(response.success({ item: rentalDetail }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateRentalDetails = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const id = Number(req.params.rentalId)
  const {
    condition,
    engineCapacityLiter,
    engineCapacityCc,
    exteriorColor,
    interiorColor,
    seatingCapacity,
    weightCapacity,
    haveDriverLicense,
    isRegistered,
  }: T_Rental_Details = req.body
  const isValidInput = Z_Rental_Details.safeParse(req.body as T_Rental_Details)
  if (isValidInput.success) {
    try {
      const getRental = rentals.find(
        (item) => item.id === id && userId === item.hostId
      )
      if (getRental?.hostId !== userId || !isHost) {
        res.json(response.error({ message: USER_NOT_AUTHORIZED }))
      }
      const getDetail = getRental?.Details
      if (getDetail && getRental?.category === 'Car') {
        //@ts-ignore
        // if (engineCapacityLiter < 1) {
        //   res.json(
        //     response.error({
        //       message: 'Minimum engine capacity is 1000 in (cc) 1 in (liter)',
        //     })
        //   )
        // }
        //@ts-ignore
        // else if (engineCapacityLiter > 8) {
        //   res.json(
        //     response.error({
        //       message: 'Maximum engine capacity is 8000 in (cc) 8 in (liter)',
        //     })
        //   )
        // }
        //@ts-ignore
        // if (engineCapacityCc !== engineCapacityLiter * 1000) {
        //   res.json(
        //     response.error({
        //       message:
        //         'Engine capacity in (cc) does not matched with the given engine capacity in (liter)',
        //     })
        //   )
        // }
        getDetail.condition = condition || getDetail.condition
        getDetail.engineCapacityLiter =
          engineCapacityLiter || getDetail.engineCapacityLiter
        getDetail.engineCapacityCc =
          engineCapacityCc || getDetail.engineCapacityCc
        getDetail.exteriorColor = exteriorColor || getDetail.exteriorColor
        getDetail.interiorColor = interiorColor || getDetail.interiorColor
        getDetail.haveDriverLicense =
          haveDriverLicense || getDetail.haveDriverLicense
        getDetail.isRegistered = isRegistered || getDetail.isRegistered
        getDetail.seatingCapacity = seatingCapacity || getDetail.seatingCapacity
        getDetail.weightCapacity = weightCapacity || getDetail.weightCapacity
      } else if (getDetail && getRental?.category === 'Motorbike') {
        //@ts-ignore
        // if (engineCapacityLiter < 0.11) {
        //   res.json(
        //     response.error({
        //       message: 'Minimum engine capacity is 110 in (cc) 0.11 in (liter)',
        //     })
        //   )
        // }
        //@ts-ignore
        // else if (engineCapacityLiter > 6.5) {
        //   res.json(
        //     response.error({
        //       message:
        //         'Maximum engine capacity is 65000 in (cc) 6.5 in (liter)',
        //     })
        //   )
        // }
        //@ts-ignore
        // if (engineCapacityCc !== engineCapacityLiter * 1000) {
        //   res.json(
        //     response.error({
        //       message:
        //         'Engine capacity in (cc) does not matched with the given engine capacity in (liter)',
        //     })
        //   )
        // }
        getDetail.condition = condition || getDetail.condition
        getDetail.engineCapacityLiter =
          engineCapacityLiter || getDetail.engineCapacityLiter
        getDetail.engineCapacityCc =
          engineCapacityCc || getDetail.engineCapacityCc
        getDetail.exteriorColor = exteriorColor || getDetail.exteriorColor
        getDetail.interiorColor = getDetail.interiorColor ?? null
        getDetail.haveDriverLicense =
          haveDriverLicense || getDetail.haveDriverLicense
        getDetail.isRegistered = isRegistered || getDetail.isRegistered
        getDetail.seatingCapacity = seatingCapacity || getDetail.seatingCapacity
        getDetail.weightCapacity = weightCapacity || getDetail.weightCapacity
      } else if (getDetail && getRental?.category === 'Bicycle') {
        getDetail.condition = condition || getDetail.condition
        getDetail.engineCapacityLiter = getDetail.engineCapacityLiter ?? null
        getDetail.engineCapacityCc = getDetail.engineCapacityCc ?? null
        getDetail.exteriorColor = exteriorColor || getDetail.exteriorColor
        getDetail.interiorColor = getDetail.interiorColor ?? null
        getDetail.haveDriverLicense =
          haveDriverLicense || getDetail.haveDriverLicense
        getDetail.isRegistered = getDetail.isRegistered ?? null
        getDetail.seatingCapacity = getDetail.seatingCapacity ?? null
        getDetail.weightCapacity = weightCapacity || getDetail.weightCapacity
      }
      if(getRental) {
        getRental.finishedSections = '["basicInfo", "details"]'
      }
      res.json(
        response.success({
          item: getDetail,
          message: 'Rental details successfully updated',
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

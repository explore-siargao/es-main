import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { T_Rental_Details, Z_Rental_Details } from '@repo/contract'
import { dbRentalDetails, dbRentals } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const updateRentalDetails = async (req: Request, res: Response) => {
  const userId = res.locals.user?.id
  const isHost = res.locals.user?.isHost
  const rentalId = req.params.rentalId
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
      const rental = await dbRentals.findOne({ _id: rentalId, host: userId })

      if (!rental || !isHost) {
        res.json(response.error({ message: USER_NOT_AUTHORIZED }))
      } else {
        const details = await dbRentalDetails.findById(rental?.details)

        if (!details) {
          res.json(
            response.error({
              message: 'Rental details not found!',
            })
          )
        } else {
          if (details && rental?.category === 'Car') {
            details.condition = condition || details.condition
            details.engineCapacityLiter =
              engineCapacityLiter || details.engineCapacityLiter
            details.engineCapacityCc =
              engineCapacityCc || details.engineCapacityCc
            details.exteriorColor = exteriorColor || details.exteriorColor
            details.interiorColor = interiorColor || details.interiorColor
            details.seatingCapacity = seatingCapacity || details.seatingCapacity
            details.weightCapacityKg =
              weightCapacity || details.weightCapacityKg
            details.haveDriverLicense =
              haveDriverLicense || details.haveDriverLicense
            details.isRegistered = isRegistered || details.isRegistered
          } else if (details && rental?.category === 'Motorbike') {
            details.condition = condition || details.condition
            details.engineCapacityLiter =
              engineCapacityLiter || details.engineCapacityLiter
            details.engineCapacityCc =
              engineCapacityCc || details.engineCapacityCc
            details.exteriorColor = exteriorColor || details.exteriorColor
            details.interiorColor = interiorColor || details.interiorColor
            details.seatingCapacity = seatingCapacity || details.seatingCapacity
            details.weightCapacityKg =
              weightCapacity || details.weightCapacityKg
            details.haveDriverLicense =
              haveDriverLicense || details.haveDriverLicense
            details.isRegistered = isRegistered || details.isRegistered
          } else if (details && rental?.category === 'Bicycle') {
            details.condition = condition || details.condition
            details.engineCapacityLiter = details.engineCapacityLiter ?? null
            details.engineCapacityCc = details.engineCapacityCc ?? null
            details.exteriorColor = exteriorColor || details.exteriorColor
            details.interiorColor = details.interiorColor ?? null
            details.seatingCapacity = details.seatingCapacity ?? null
            details.weightCapacityKg =
              weightCapacity || details.weightCapacityKg
            details.haveDriverLicense =
              haveDriverLicense || details.haveDriverLicense
            details.isRegistered = details.isRegistered ?? null
          }
          if (details) {
            details.updatedAt = new Date()
            await details.save()
          }

          if (rental) {
            rental.finishedSections = ['basicInfo', 'details']
            rental.updatedAt = new Date()
          }
          await rental?.save()

          res.json(
            response.success({
              item: details,
              message: 'Rental details successfully updated',
            })
          )
        }
      }
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

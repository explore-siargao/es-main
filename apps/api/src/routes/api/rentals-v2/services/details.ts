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
    minAgeReq,
    isRegistered,
  }: T_Rental_Details = req.body
  const isValidInput = Z_Rental_Details.safeParse(req.body as T_Rental_Details)
  if (isValidInput.success) {
    try {
      const rental = await dbRentals.findOne({ _id: rentalId, host: userId })

      if (!rental || !isHost) {
        return res.json(response.error({ message: USER_NOT_AUTHORIZED }))
      }

      const details = await dbRentalDetails.findById(rental.details)

      if (!details) {
        return res.json(
          response.error({
            message: 'Rental details not found!',
          })
        )
      }

      if (rental.category === 'Car') {
        if ((engineCapacityLiter ?? 0) < 1) {
          return res.json(
            response.error({
              message: 'Minimum engine capacity is 1000 in (cc) 1 in (liter)',
            })
          )
        } else if ((engineCapacityLiter ?? 0) > 8) {
          return res.json(
            response.error({
              message: 'Maximum engine capacity is 8000 in (cc) 8 in (liter)',
            })
          )
        }
        if (engineCapacityCc !== (engineCapacityLiter ?? 0) * 1000) {
          return res.json(
            response.error({
              message:
                'Engine capacity in (cc) does not matched with the given engine capacity in (liter)',
            })
          )
        }
        details.condition = condition || details.condition
        details.engineCapacityLiter =
          engineCapacityLiter || details.engineCapacityLiter
        details.engineCapacityCc = engineCapacityCc || details.engineCapacityCc
        details.exteriorColor = exteriorColor || details.exteriorColor
        details.interiorColor = interiorColor || details.interiorColor
        details.seatingCapacity = seatingCapacity || details.seatingCapacity
        details.weightCapacityKg = weightCapacity || details.weightCapacityKg
        details.minAgeReq = minAgeReq || details.minAgeReq
        details.isRegistered = isRegistered || details.isRegistered
      } else if (rental.category === 'Motorbike') {
        if ((engineCapacityLiter ?? 0) < 0.11) {
          return res.json(
            response.error({
              message: 'Minimum engine capacity is 110 in (cc) 0.11 in (liter)',
            })
          )
        } else if ((engineCapacityLiter ?? 0) > 6.5) {
          return res.json(
            response.error({
              message:
                'Maximum engine capacity is 65000 in (cc) 6.5 in (liter)',
            })
          )
        }
        if (engineCapacityCc !== (engineCapacityLiter ?? 0) * 1000) {
          return res.json(
            response.error({
              message:
                'Engine capacity in (cc) does not matched with the given engine capacity in (liter)',
            })
          )
        }
        details.condition = condition || details.condition
        details.engineCapacityLiter =
          engineCapacityLiter || details.engineCapacityLiter
        details.engineCapacityCc = engineCapacityCc || details.engineCapacityCc
        details.exteriorColor = exteriorColor || details.exteriorColor
        details.interiorColor = interiorColor || details.interiorColor
        details.seatingCapacity = seatingCapacity || details.seatingCapacity
        details.weightCapacityKg = weightCapacity || details.weightCapacityKg
        details.minAgeReq = minAgeReq || details.minAgeReq
        details.isRegistered = isRegistered || details.isRegistered
      } else if (rental.category === 'Bicycle') {
        details.condition = condition || details.condition
        details.engineCapacityLiter = null || details.engineCapacityLiter
        details.engineCapacityCc = null || details.engineCapacityCc
        details.exteriorColor = exteriorColor || details.exteriorColor
        details.interiorColor = null || details.interiorColor
        details.seatingCapacity = null || details.seatingCapacity
        details.weightCapacityKg = weightCapacity || details.weightCapacityKg
        details.minAgeReq = minAgeReq || details.minAgeReq
        details.isRegistered = null || details.isRegistered
      }
      details.updatedAt = new Date()
      await details.save()

      rental.finishedSections = '["basicInfo", "details"]'
      rental.updatedAt = new Date()
      await rental.save()

      res.json(
        response.success({
          item: details,
          message: 'Rental details successfully updated',
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

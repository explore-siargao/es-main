import { Request, Response } from 'express'
import { ResponseService } from '@/common/service/response'
import { dbRentals } from '@repo/database'
import { UNKNOWN_ERROR_OCCURRED } from '@/common/constants'

const response = new ResponseService()

export const getRentalsByHostAndCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { category } = req.params
    const hostId = res.locals.user.id

    // Validate category
    if (!['Car', 'Motorbike', 'Bicycle'].includes(category as string)) {
      res.json(
        response.error({
          message: 'Invalid category. Must be Car, Motorbike, or Bicycle.',
        })
      )
    }

    const rentals = await dbRentals.find({ host: hostId, category })
    let results: any = null
    if (category === 'Car' || category === 'Motorbike') {
      results = rentals.map((rental) => ({
        id: rental?._id,
        name: `${rental.year} ${rental.make} ${rental.modelBadge} ${rental.transmission === 'Automatic' ? 'AT' : 'MT'}`,
      }))
    } else {
      results = rentals.map((rental) => ({
        id: rental?._id,
        name: `${rental.make}`,
      }))
    }

    res.json(response.success({ items: results, allItemCount: rentals.length }))
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const getRentalIds = async (req: Request, res: Response) => {
  try {
    const { rentalId } = req.params

    if (!rentalId) {
      res.json(
        response.error({
          message: 'Rental ID is required.',
        })
      )
    }

    const rental = await dbRentals.findById(rentalId)

    if (!rental) {
      res.json(
        response.error({
          message: 'Rental not found.',
        })
      )
    }

    const ids = rental?.ids

    res.json(response.success({ items: ids, allItemCount: ids?.length }))
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

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
      return res.json(
        response.error({
          message: 'Invalid category. Must be Car, Motorbike, or Bicycle.',
        })
      )
    }

    const rentals = await dbRentals.find({ host: hostId, category })
    let results: any = null
    if (category === 'Car' || category === 'Motorbike') {
      results = rentals.map((rental) => ({
        name: `${rental.year} ${rental.make} ${rental.modelBadge} ${rental.transmission === 'Automatic' ? 'AT' : 'MT'}`,
      }))
    } else {
      results = rentals.map((rental) => ({
        name: `${rental.make}`,
      }))
    }

    return res.json(
      response.success({ items: results, allItemCount: rentals.length })
    )
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

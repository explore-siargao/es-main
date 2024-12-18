import { UNKNOWN_ERROR_OCCURRED, USER_NOT_AUTHORIZED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbRentals } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()

export const getFinishedSections = async (req: Request, res: Response) => {
  const rentalId = req.params.rentalId
  const hostId = res.locals.user?.id
  try {
    const getRental = await dbRentals.findOne({ _id: rentalId, host: hostId })
    const finishedSections = getRental?.finishedSections
    res.json(response.success({ item: { finishedSections } }))
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const updateFinishedSections = async (req: Request, res: Response) => {
  const rentalId = req.params.rentalId
  const hostId = res.locals.user?.id
  const newFinishedSection = req.body.newFinishedSection
  try {
    const rental = await dbRentals.findById({ _id: rentalId })
    if (!rental) {
      res.json(
        response.error({
          message: 'Rental not found!',
        })
      )
    } else {
      if (rental?.host?.toString() !== hostId) {
        res.json(
          response.error({
            message: USER_NOT_AUTHORIZED,
          })
        )
      } else {
        const updatedRental = await dbRentals.findByIdAndUpdate(
          rental?._id,
          {
            $addToSet: {
              finishedSections: newFinishedSection,
            },
            $set: {
              updatedAt: Date.now(),
            },
          },
          { new: true }
        )

        res.json(
          response.success({
            item: updatedRental?.finishedSections,
            message: 'Finished sections saved',
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
}

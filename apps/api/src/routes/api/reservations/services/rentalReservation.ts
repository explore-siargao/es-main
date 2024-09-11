import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbReservations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const addRentalReservation = async (req: Request, res: Response) => {
  const { start_date, end_date, status, unit, name, notes } = req.body
  try {
    const validStatuses = [
      'Confirmed',
      'Checked-In',
      'Checked-Out',
      'Blocked-Dates',
      'Out-of-Service-Dates',
    ]

    if (!validStatuses.includes(status)) {
      return res.json(response.error({ message: 'Invalid status' }))
    }

    // Check if required fields are provided
    if (!start_date || !end_date || !status || !unit) {
      return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
    }

    // Check for overlapping reservations on the same rentalId
    const overlappingReservation = await dbReservations.findOne({
      rentalId: unit,
      $or: [
        {
          startDate: { $lt: end_date },
          endDate: { $gt: start_date },
        },
        {
          startDate: { $lte: end_date, $gte: start_date },
        },
      ],
    })

    if (overlappingReservation) {
      return res.json(
        response.error({
          message: 'Reservation dates overlap with an existing reservation.',
        })
      )
    }

    // Create a new reservation
    const newRentalReservation = new dbReservations({
      startDate: start_date,
      endDate: end_date,
      status: status,
      rentalId: unit,
      guestName: name || null,
      notes: notes || null,
      createdAt: Date.now(),
    })

    await newRentalReservation.save()
    return res.json(
      response.success({
        item: newRentalReservation,
        message: 'Rental reservation added successfully',
      })
    )
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const editRentalReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.reservationId
  const { startDate, endDate, notes } = req.body

  try {
    if (!startDate || !endDate || !notes) {
        return res.json(
          response.error({
            message: REQUIRED_VALUE_EMPTY,
          })
        );
      }

    const reservation = await dbReservations.findOne({
      _id: reservationId,
      deletedAt: null,
    })

    const overlappingReservation = await dbReservations.findOne({
      rentalId: reservation?.rentalId,
      _id: { $ne: reservation?._id },
      $or: [
        {
          startDate: { $lt: endDate },
          endDate: { $gt: startDate },
        },
        {
          startDate: { $lte: endDate, $gte: startDate },
        },
    
      ],
    })

    if (overlappingReservation) {
      return res.json(
        response.error({
          message: 'Reservation dates overlap with an existing reservation.',
        })
      )
    }
    if (reservation) {
      const updateReservation = await dbReservations.findByIdAndUpdate(
        reservationId,
        {
          $set: {
            startDate: startDate,
            endDate: endDate,
            notes: notes,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      )
      return res.json(
        response.success({
          item: updateReservation,
          message: 'Reservation successfully updated',
        })
      )
    } else {
      return res.json(response.error({ message: 'Reservation not found' }))
    }
  } catch (err: any) {
    return res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}
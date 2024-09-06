import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbReservations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const addRentalReservation = async (req: Request, res: Response) => {
  const { start_date, end_date, status, unit, name, guest_count } = req.body
  try {
    const validStatuses = [
      'Confirmed',
      'Checked-In',
      'Checked-Out',
      'Blocked-Dates',
      'Out-of-Service',
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
      guestCount: guest_count || null,
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

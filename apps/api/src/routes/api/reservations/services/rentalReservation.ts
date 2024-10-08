import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbRentals, dbReservations } from '@repo/database'
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
      res.json(response.error({ message: 'Invalid status' }))
    } else {
      // Check if required fields are provided
      if (!start_date || !end_date || !status || !unit) {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      } else {
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
          res.json(
            response.error({
              message:
                'Reservation dates overlap with an existing reservation.',
            })
          )
        } else {
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
          res.json(
            response.success({
              item: newRentalReservation,
              message: 'Rental reservation added successfully',
            })
          )
        }
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

export const editRentalReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.reservationId
  const { startDate, endDate, notes } = req.body

  try {
    if (!startDate || !endDate) {
      res.json(
        response.error({
          message: REQUIRED_VALUE_EMPTY,
        })
      )
    } else {
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
        ],
      })

      if (overlappingReservation) {
        res.json(
          response.error({
            message: 'Reservation dates overlap with an existing reservation.',
          })
        )
      } else {
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
          res.json(
            response.success({
              item: updateReservation,
              message: 'Reservation successfully updated',
            })
          )
        } else {
          res.json(response.error({ message: 'Reservation not found' }))
        }
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

export const cancelRentalReservationByHost = async (
  req: Request,
  res: Response
) => {
  const reservationId = req.params.reservationId
  try {
    const reservation = await dbReservations.findOne({
      _id: reservationId,
      deletedAt: null,
      status: { $ne: 'Cancelled' },
    })

    if (reservation) {
      const rental = await dbRentals.findOne({
        'ids._id': reservation.rentalId,
      })
      if (rental) {
        const allowedDaysToCancel = rental?.daysCanCancel
        const currentDate = new Date()
        const reservationDate = reservation.startDate
        reservationDate?.setDate(
          reservationDate.getDate() - allowedDaysToCancel
        )
        const allowedDate = reservationDate
        if (allowedDate != null && currentDate <= allowedDate) {
          const cancelReservation = await dbReservations.findByIdAndUpdate(
            reservation._id,
            {
              status: 'Cancelled',
              cancelledBy: 'host',
              cancellationDate: Date.now(),
              hostHavePenalty: false,
              updatedAt: Date.now(),
            }
          )
          res.json(
            response.success({
              item: cancelReservation,
              message:
                'Rental reservation successfully cancelled without penalty',
            })
          )
        } else {
          const cancelReservation = await dbReservations.findByIdAndUpdate(
            reservation._id,
            {
              status: 'Cancelled',
              cancelledBy: 'host',
              cancellationDate: Date.now(),
              hostHavePenalty: true,
              updatedAt: Date.now(),
            }
          )
          res.json(
            response.success({
              item: cancelReservation,
              message: 'Rental reservation successfully cancelled with penalty',
            })
          )
        }
      } else {
        res.json(response.error({ message: 'Rental not exists' }))
      }
    } else {
      res.json(
        response.error({
          message: 'Reservation not exist or already cancelled',
        })
      )
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

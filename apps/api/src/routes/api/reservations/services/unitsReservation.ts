import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbBookableUnitTypes, dbReservations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const addUnitReservation = async (req: Request, res: Response) => {
  const { propertyId, unitId, name, startDate, endDate, notes, status } =
    req.body
  if (!propertyId || !unitId || !startDate || !endDate) {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  } else {
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
        // Check for overlapping reservations on the same rentalId
        const overlappingReservation = await dbReservations.findOne({
          'propertyIds.unitId': unitId,
          status: { $ne: 'Cancelled' },
          $or: [
            {
              startDate: { $lte: endDate },
              endDate: { $gte: startDate },
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
          const newUnitReservation = new dbReservations({
            startDate: startDate,
            endDate: endDate,
            status: status,
            propertyIds: {
              propertyId: propertyId,
              unitId: unitId,
            },
            guestName: name || null,
            notes: notes || null,
            createdAt: Date.now(),
          })
          await newUnitReservation.save()
          res.json(
            response.success({
              item: newUnitReservation,
              message: 'Unit reservation added successfully',
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
}

export const editUnitReservation = async (req: Request, res: Response) => {
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
        'propertyIds.unitId': reservation?.propertyIds?.unitId,
        _id: { $ne: reservation?._id },
        status: { $ne: 'Cancelled' },
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

export const cancelUnitReservationByHost = async (
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
      const unit = await dbBookableUnitTypes.findOne({
        'qtyIds._id': reservation.propertyIds?.unitId,
      })
      if (unit) {
        const allowedDaysToCancel = unit?.daysCanCancel
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
                'Unit reservation successfully cancelled without penalty',
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
              message: 'Unit reservation successfully cancelled with penalty',
            })
          )
        }
      } else {
        res.json(response.error({ message: 'Unit not exists' }))
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

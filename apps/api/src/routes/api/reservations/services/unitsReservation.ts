import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbReservations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const addUnitReservation = async (req: Request, res: Response) => {
  const { unitId, name, startDate, endDate, notes, status } = req.body
  if (!unitId || !startDate || !endDate) {
    return res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }

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

    // Check for overlapping reservations on the same rentalId
    const overlappingReservation = await dbReservations.findOne({
      unitId: unitId,
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
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
    const newUnitReservation = new dbReservations({
      startDate: startDate,
      endDate: endDate,
      status: status,
      unitId: unitId,
      guestName: name || null,
      notes: notes || null,
      createdAt: Date.now(),
    })
    await newUnitReservation.save()
    return res.json(
      response.success({
        item: newUnitReservation,
        message: 'Unit reservation added successfully',
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

export const editUnitReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.reservationId
  const { startDate, endDate, notes } = req.body

  try {
    if (!startDate || !endDate) {
      return res.json(
        response.error({
          message: REQUIRED_VALUE_EMPTY,
        })
      )
    }

    const reservation = await dbReservations.findOne({
      _id: reservationId,
      deletedAt: null,
    })

    const overlappingReservation = await dbReservations.findOne({
      unitId: reservation?.unitId,
      _id: { $ne: reservation?._id },
      $or: [
        {
          startDate: { $lt: endDate },
          endDate: { $gt: startDate },
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

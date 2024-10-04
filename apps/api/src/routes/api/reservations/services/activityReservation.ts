import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbReservations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const addActivityReservation = async (req: Request, res: Response) => {
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
      if (!start_date || !end_date || !status || !unit) {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      } else {
        const overlappingReservation = await dbReservations.findOne({
          activityId: unit,
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
          const newActivityReservation = new dbReservations({
            startDate: start_date,
            endDate: end_date,
            status: status,
            activityId: unit,
            guestName: name || null,
            notes: notes || null,
            createdAt: Date.now(),
          })

          await newActivityReservation.save()
          res.json(
            response.success({
              item: newActivityReservation,
              message: 'Activity reservation added successfully',
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



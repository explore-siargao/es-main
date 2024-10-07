import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbReservations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const addPrivateActivityReservation = async (
  req: Request,
  res: Response
) => {
  const { date, status, name, slotId, activityId, dayId, notes, guestNumber } =
    req.body
  console.log(req.body)
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
      if (!date || !status || !slotId) {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      } else {
        const overlappingReservation = await dbReservations.findOne({
          'activityIds.timeSlotId': slotId,
          $or: [
            {
              startDate: { $lt: date },
              endDate: { $gt: date },
            },
            {
              startDate: { $lte: date, $gte: date },
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
          const newActivityReservation = new dbReservations({
            startDate: date,
            endDate: date,
            status: status,
            activityIds: {
              activityId: activityId,
              dayId: dayId,
              timeSlotId: slotId,
            },
            guestCount: guestNumber,
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

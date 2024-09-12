import { REQUIRED_VALUE_EMPTY, UNKNOWN_ERROR_OCCURRED } from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbReservations } from '@repo/database'
import { Request, Response } from 'express'

const response = new ResponseService()
export const addUnitReservation = async (req: Request, res: Response) => {
  const { unitId, name, startDate, endDate, notes, status} = req.body
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
      if(overlappingReservation){
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
  } catch (err:any) {
    return res.json(response.error({message: err.message? err.message : UNKNOWN_ERROR_OCCURRED}))
  }
}

import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
} from '@/common/constants'
import { ResponseService } from '@/common/service/response'
import { dbActivities, dbReservations } from '@repo/database'
import { Request, Response } from 'express'
import mongoose from 'mongoose'

interface Session {
  _id: string // Assuming _id can be either type
  startTime: string
  endTime: string
  ids?: { _id?: string; name: string }[]
}

interface DaySchedule {
  slots?: Session[]
  _id: mongoose.Types.ObjectId
}

interface Schedule {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

const response = new ResponseService()

export const addPrivateActivityReservation = async (
  req: Request,
  res: Response
) => {
  const { date, status, name, slotId, activityId, dayId, notes, guestNumber } =
    req.body
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
          'activityIds.slotIdsId': { $exists: false },
          startDate: { $eq: date },
          status: { $ne: 'Cancelled' },
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

export const addJoinerActivityReservation = async (
  req: Request,
  res: Response
) => {
  const { date, status, name, activityId, dayId, slotId, notes, guestNumber } =
    req.body
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
        let nextGuestNumber = guestNumber
        const startDateTime = new Date(date)
        startDateTime.setHours(0, 0, 0, 0)
        const endDateTime = new Date(date)
        endDateTime.setHours(23, 59, 59, 999)
        for (let i = 0; i < guestNumber; i++) {
          const getJoinerActivityReservation = await dbReservations.find({
            startDate: {
              $gte: startDateTime.toISOString(),
              $lte: endDateTime.toISOString(),
            },
            'activityIds.slotIdsId': { $exists: true },
            deletedAt: null,
            status: { $ne: 'Cancelled' },
          })
          const takenSlotsIds = getJoinerActivityReservation.map((item) =>
            String(item.activityIds?.slotIdsId)
          )

          const dayOfWeek = startDateTime
            .toLocaleString('en-US', { weekday: 'long' })
            .toLowerCase()

          const getActivity = await dbActivities.findOne({
            _id: activityId,
            deletedAt: null,
          })

          const getSlotsOnDay =
            getActivity?.schedule?.[dayOfWeek as keyof Schedule]?.slots

          // Find the specific slot object
          const getSlotsOnTimeSlot = getSlotsOnDay?.find(
            (item) => String(item._id) === String(slotId)
          )?.slotIdsId // Ensure you're accessing the correct property

          const slotIds = getSlotsOnTimeSlot?.map((item) => String(item._id))

          const updatedSlotIds = slotIds?.filter(
            (item) => !takenSlotsIds.includes(item)
          )
          if ((updatedSlotIds?.length ?? 0) < nextGuestNumber) {
            res.json(
              response.error({
                message:
                  'There are either no available slots for this schedule or not enough.',
              })
            )
            return
          } else {
            const newActivityReservation = new dbReservations({
              startDate: date,
              endDate: date,
              status: status,
              activityIds: {
                activityId: activityId,
                dayId: dayId,
                timeSlotId: slotId,
                //@ts-ignore
                slotIdsId: updatedSlotIds[0],
              },
              guestCount: guestNumber,
              guestName: name || null,
              notes: notes || null,
              createdAt: Date.now(),
            })
            await newActivityReservation.save()
            nextGuestNumber--
          }
        }
        res.json(
          response.success({
            item: req.body,
            message: 'Activity reservation added successfully',
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

export const editPrivateActivityReservation = async (
  req: Request,
  res: Response
) => {
  const reservationId = req.params.reservationId
  const { notes } = req.body

  try {
    const reservation = await dbReservations.findOne({
      _id: reservationId,
      deletedAt: null,
    })

    const overlappingReservation = await dbReservations.findOne({
      'activityIds.timeSlotId': reservation?.activityIds?.timeSlotId,
      'activityIds.slotIdsId': null,
      _id: { $ne: reservation?._id },
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
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const editJoinerActivityReservation = async (
  req: Request,
  res: Response
) => {
  const reservationId = req.params.reservationId
  const { notes } = req.body

  try {
    const reservation = await dbReservations.findOne({
      _id: reservationId,
      deletedAt: null,
    })

    const overlappingReservation = await dbReservations.findOne({
      'activityIds.timeSlotId': reservation?.activityIds?.timeSlotId,
      'activityIds.slotIdsId': { $ne: null },
      _id: { $ne: reservation?._id },
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
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const cancelActivityReservation = async (
  req: Request,
  res: Response
) => {
  const reservationId = req.params.reservationId
  try {
    const daysOfWeek = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ]
    const reservation = await dbReservations.findOne({
      _id: reservationId,
      deletedAt: null,
      status: { $ne: 'Cancelled' },
    })
    if (reservation) {
      const joinerActivity = await dbActivities.findOne({
        $or: daysOfWeek.map((day) => ({
          [`schedule.${day}.slots.slotIdsId._id`]:
            reservation.activityIds?.slotIdsId,
        })),
      })
      if (joinerActivity) {
        const allowedDaysToCancel = joinerActivity.daysCanCancel
        const currentDate = new Date()
        const reservationDate = reservation.startDate
        reservationDate?.setDate(
          reservationDate.getDate() - allowedDaysToCancel
        )
        const allowedDate = reservationDate
        if (allowedDate != null && currentDate <= allowedDate) {
          const cancelReservation = await dbReservations.findByIdAndUpdate(
            reservationId,
            {
              status: 'Cancelled',
              cancellationDate: Date.now(),
              cancelledBy: 'host',
              hostHavePenalty: false,
            }
          )
          res.json(
            response.success({
              item: cancelReservation,
              message:
                'Activity reservation successfully cancelled without penalty',
            })
          )
        } else {
          const cancelReservation = await dbReservations.findByIdAndUpdate(
            reservationId,
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
        const privateActivity = await dbActivities.findOne({
          $or: daysOfWeek.map((day) => ({
            [`schedule.${day}.slots._id`]: reservation.activityIds?.timeSlotId,
          })),
        })
        if (privateActivity) {
          const allowedDaysToCancel = privateActivity.daysCanCancel
          const currentDate = new Date()
          const reservationDate = reservation.startDate
          reservationDate?.setDate(
            reservationDate.getDate() - allowedDaysToCancel
          )
          const allowedDate = reservationDate
          if (allowedDate != null && currentDate <= allowedDate) {
            const cancelReservation = await dbReservations.findByIdAndUpdate(
              reservationId,
              {
                status: 'Cancelled',
                cancellationDate: Date.now(),
                cancelledBy: 'host',
                hostHavePenalty: false,
              }
            )
            res.json(
              response.success({
                item: cancelReservation,
                message:
                  'Activity reservation successfully cancelled without penalty',
              })
            )
          } else {
            const cancelReservation = await dbReservations.findByIdAndUpdate(
              reservationId,
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
                message:
                  'Activity reservation successfully cancelled with penalty',
              })
            )
          }
        } else {
          res.json(response.error({ message: 'Activity not found' }))
        }
      }
    } else {
      res.json(
        response.error({
          message: 'Reservation not found or already cancelled',
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
